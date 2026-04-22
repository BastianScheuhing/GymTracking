// ---------------------------------------------------------
// VERSION
// ---------------------------------------------------------
const APP_VERSION = "1.2.1";

// ---------------------------------------------------------
// DATA (with ID support)
// ---------------------------------------------------------
let categories = JSON.parse(localStorage.getItem("categories")) || ["Brust", "Rücken", "Beine"];
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
let plans = JSON.parse(localStorage.getItem("plans")) || [];
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// ---------------------------------------------------------
// ID GENERATOR
// ---------------------------------------------------------
function generateId(prefix = "ex") {
    return prefix + "_" + Math.random().toString(36).substring(2, 10);
}

// ---------------------------------------------------------
// MIGRATION: ADD IDs TO EXERCISES + FIX WORKOUTS + PLANS
// ---------------------------------------------------------
function migrateToIds() {

    let changed = false;

    // 1) Add IDs to exercises
    exercises = exercises.map(ex => {
        if (!ex.id) {
            ex.id = generateId();
            changed = true;
        }
        return ex;
    });

    // 2) Convert plan exercises (names → IDs)
    plans = plans.map(plan => {
        plan.exercises = plan.exercises.map(nameOrId => {
            const found = exercises.find(e => e.id === nameOrId || e.name === nameOrId);
            return found ? found.id : nameOrId;
        });
        return plan;
    });

    // 3) Convert workouts (names → IDs)
    workouts = workouts.map(w => {
        w.exercises = w.exercises.map(ex => {
            const found = exercises.find(e => e.id === ex.id || e.name === ex.name);
            return {
                id: found ? found.id : ex.id,
                sets: ex.sets
            };
        });
        return w;
    });

    if (changed) save();
}

function repairMissingExercises() {
    let changed = false;

    workouts.forEach(w => {
        w.exercises.forEach(ex => {

            const found = exercises.find(e => e.id === ex.id);

            if (!found) {
                exercises.push({
                    id: ex.id,
                    name: ex.name ? ex.name : "Unbekannte Übung",
                    category: "Unbekannt"
                });

                changed = true;
            }
        });
    });

    if (changed) save();
}


migrateToIds();
repairMissingExercises();


// ---------------------------------------------------------
// SAVE
// BUG FIX #1: removed duplicate saveAll() — everything now calls save()
// ---------------------------------------------------------
function save() {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("exercises", JSON.stringify(exercises));
    localStorage.setItem("plans", JSON.stringify(plans));
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

// ---------------------------------------------------------
// POPUP SYSTEM
// ---------------------------------------------------------
function openPopup(html) {
    const overlay = document.getElementById("popupOverlay");
    overlay.innerHTML = `<div class="popup-box">${html}</div>`;
    overlay.style.display = "flex";
}

function closePopup() {
    const overlay = document.getElementById("popupOverlay");
    overlay.style.display = "none";
    overlay.innerHTML = "";
}

// ---------------------------------------------------------
// COLLAPSIBLE
// ---------------------------------------------------------
function toggleCollapse(id) {
    const box = document.getElementById(id);
    const arrow = document.getElementById("arrow-" + id);
    if (!box) return;

    if (box.style.display === "none") {
        box.style.display = "block";
        if (arrow) arrow.innerText = "▾";
    } else {
        box.style.display = "none";
        if (arrow) arrow.innerText = "▸";
    }
}

// ---------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + page).classList.add("active");

    document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
    document.getElementById("tab-" + page).classList.add("active");

    if (page === "dashboard") renderDashboard();
    else renderAll();
}

function renderDashboard() {
    renderInsights();
    renderHistoryGrouped();
}

function renderWeeklyHistory() {
    if (typeof renderHistory === "function") {
        renderHistory();
    }
}


// ---------------------------------------------------------
// HISTORIE
// ---------------------------------------------------------
function renderHistory() {
    const list = document.getElementById("overviewList");
    const details = document.getElementById("overviewDetails");

    list.innerHTML = "";
    details.innerHTML = "";

    if (workouts.length === 0) return;

    // BUG FIX #2: show newest workouts first
    const reversed = [...workouts].reverse();

    reversed.forEach((w, index) => {
        const originalIndex = workouts.length - 1 - index;

        list.innerHTML += `
            <li>
                <div onclick="showWorkoutDetails(${originalIndex})" style="flex:1; cursor:pointer;">
                    <strong>${w.plan}</strong><br>
                    ${w.date}
                </div>

                <button class="delete-btn" onclick="openWorkoutEditor(${originalIndex})">✏️</button>
                <button class="delete-btn" onclick="deleteWorkout(${originalIndex})">🗑️</button>
            </li>
        `;
    });
}

function showWorkoutDetails(index) {
    const w = workouts[index];
    const details = document.getElementById("overviewDetails");

    document.querySelectorAll("#overviewList li").forEach(li => li.classList.remove("overview-highlight"));

    const reversedIndex = workouts.length - 1 - index;
    const listItem = document.querySelector(`#overviewList li:nth-child(${reversedIndex + 1})`);
    if (listItem) listItem.classList.add("overview-highlight");

    let html = `<h3>${w.plan} – ${w.date}</h3>`;

    if (w.note) {
        html += `<div class="note-box"><strong>Notiz:</strong><br>${w.note}</div>`;
    }

    w.exercises.forEach(ex => {
        const exInfo = exercises.find(e => e.id === ex.id);
        html += `<strong>${exInfo ? exInfo.name : "Unbekannte Übung"}</strong><ul>`;
        ex.sets.forEach(s => {
            html += `<li>${s.weight}kg × ${s.reps}</li>`;
        });
        html += `</ul>`;
    });

    details.innerHTML = html;
}

function deleteWorkout(i) {
    if (!confirm("Workout wirklich löschen?")) return;
    workouts.splice(i, 1);
    save();
    renderHistory();
    document.getElementById("overviewDetails").innerHTML = "";
}

// ---------------------------------------------------------
// ÜBUNGEN (with rename support)
// ---------------------------------------------------------
function renderCategories() {
    const list = document.getElementById("categoryList");
    const select = document.getElementById("exerciseCategory");

    list.innerHTML = "";
    select.innerHTML = "";

    categories.forEach((c, i) => {
        list.innerHTML += `
            <li>
                ${c}
                <button class="delete-btn" onclick="deleteCategory(${i})">×</button>
            </li>
        `;
        select.innerHTML += `<option>${c}</option>`;
    });
}

function addCategory() {
    const name = document.getElementById("newCategory").value.trim();
    if (!name) return;
    categories.push(name);
    document.getElementById("newCategory").value = "";
    save();
    renderCategories();
}

function deleteCategory(i) {
    categories.splice(i, 1);
    save();
    renderCategories();
}

function addExercise() {
    const name = document.getElementById("exerciseName").value.trim();
    const category = document.getElementById("exerciseCategory").value;
    if (!name) return;

    exercises.push({
        id: generateId(),
        name,
        category
    });

    document.getElementById("exerciseName").value = "";
    save();
    renderExercises();
    renderPlans();
}

function renameExercisePopup(id) {
    const ex = exercises.find(e => e.id === id);

    openPopup(`
        <h3>Übung umbenennen</h3>
        <input id="renameInput" value="${ex.name}">
        <button onclick="renameExercise('${id}')">Speichern</button>
        <button onclick="closePopup()">Abbrechen</button>
    `);
}

function renameExercise(id) {
    const newName = document.getElementById("renameInput").value.trim();
    if (!newName) return;

    const ex = exercises.find(e => e.id === id);
    ex.name = newName;

    save();
    closePopup();
    renderExercises();
    renderPlans();
    renderHistory();
}

function deleteExercise(i) {
    const exId = exercises[i].id;

    plans = plans.map(p => ({
        ...p,
        exercises: p.exercises.filter(eId => eId !== exId)
    }));

    exercises.splice(i, 1);

    save();
    renderExercises();
    renderPlans();
}

function renderExercises() {
    const list = document.getElementById("exerciseList");
    list.innerHTML = "";

    exercises.forEach((ex, i) => {
        list.innerHTML += `
            <li>
                ${ex.name} (${ex.category})
                <button onclick="renameExercisePopup('${ex.id}')">✏️</button>
                <button class="delete-btn" onclick="deleteExercise(${i})">×</button>
            </li>
        `;
    });
}

// ---------------------------------------------------------
// PLÄNE (now using IDs)
// ---------------------------------------------------------
function createPlan() {
    const name = document.getElementById("planName").value.trim();
    if (!name) return;

    plans.push({ name, exercises: [] });
    document.getElementById("planName").value = "";
    save();
    renderPlans();
}

function deletePlan(i) {
    if (!confirm("Plan wirklich löschen?")) return;
    plans.splice(i, 1);
    save();
    renderPlans();
}

function addExerciseToPlan(planIndex) {
    const select = document.getElementById("planAdd_" + planIndex);
    const exerciseId = select.value;
    if (!exerciseId) return;

    if (!plans[planIndex].exercises.includes(exerciseId)) {
        plans[planIndex].exercises.push(exerciseId);
        save();
        renderPlans();
    }
}

function removeExerciseFromPlan(planIndex, exerciseId) {
    plans[planIndex].exercises = plans[planIndex].exercises.filter(id => id !== exerciseId);
    save();
    renderPlans();
}

function renderPlans() {
    const list = document.getElementById("planList");
    const select = document.getElementById("trackingPlanSelect");

    list.innerHTML = "";
    select.innerHTML = "";

    plans.forEach((p, i) => {
        const exerciseOptions = exercises
            .map(ex => `<option value="${ex.id}">${ex.name}</option>`)
            .join("");

        const assignedExercises = p.exercises
            .map(exId => {
                const ex = exercises.find(e => e.id === exId);
                return `
                    <li>
                        ${ex ? ex.name : "Unbekannt"}
                        <button class="delete-btn" onclick="removeExerciseFromPlan(${i}, '${exId}')">×</button>
                    </li>
                `;
            })
            .join("");

        list.innerHTML += `
            <div class="plan-box" id="planBox_${i}">

                <div class="plan-header" onclick="toggleCollapse('plan_${i}'); highlightPlan(${i});">
                    <span class="plan-title">${p.name}</span>
                    <button class="delete-btn" onclick="deletePlan(${i}); event.stopPropagation();">🗑️</button>
                </div>

                <div id="plan_${i}" class="collapse-content">
                    <div style="margin-top:10px;">
                        <select id="planAdd_${i}">
                            ${exerciseOptions}
                        </select>
                        <button onclick="addExerciseToPlan(${i})">Hinzufügen</button>
                    </div>

                    <ul style="margin-top:10px;">
                        ${assignedExercises}
                    </ul>
                </div>

            </div>
        `;

        select.innerHTML += `<option value="${i}">${p.name}</option>`;
    });
}

function highlightPlan(index) {
    const allBoxes = document.querySelectorAll(".plan-box");

    allBoxes.forEach((box, i) => {
        const content = document.getElementById("plan_" + i);

        if (i !== index) {
            box.classList.remove("active");
            if (content) content.style.display = "none";
        }
    });

    const activeBox = allBoxes[index];
    activeBox.classList.add("active");
}

// ---------------------------------------------------------
// TRACKING (with free training + drag & drop)
// ---------------------------------------------------------
let currentTracking = null;
let currentExerciseIndex = 0;

let timerInterval = null;
let timerSeconds = 0;
let timerStart = null;

// ---------------------------------------------------------
// TIME FORMAT
// ---------------------------------------------------------
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStart = null;
        timerSeconds = 0;
        renderTracking();
        return;
    }

    timerStart = Date.now() - timerSeconds * 1000;

    timerInterval = setInterval(() => {
        timerSeconds = Math.floor((Date.now() - timerStart) / 1000);
        const el = document.getElementById("timerDisplay");
        if (el) el.innerText = formatTime(timerSeconds);
    }, 250);
}

// ---------------------------------------------------------
// MOVE EXERCISES
// BUG FIX #3: deduplicated — was defined 3 times, now defined once
// ---------------------------------------------------------
function moveExerciseUp(index) {
    if (index > 0) {
        [currentTracking.exercises[index], currentTracking.exercises[index - 1]] =
            [currentTracking.exercises[index - 1], currentTracking.exercises[index]];
        renderTracking();
    }
}

function moveExerciseDown(index) {
    if (index < currentTracking.exercises.length - 1) {
        [currentTracking.exercises[index], currentTracking.exercises[index + 1]] =
            [currentTracking.exercises[index + 1], currentTracking.exercises[index]];
        renderTracking();
    }
}

// ---------------------------------------------------------
// START: PLAN OR FREE TRAINING
// ---------------------------------------------------------
function startFreeTraining() {
    currentTracking = {
        plan: "Freies Training",
        date: new Date().toISOString().split("T")[0],
        note: "",
        startTime: new Date(),
        exercises: []
    };

    currentExerciseIndex = 0;
    timerSeconds = 0;
    timerStart = null;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    renderTracking();
}

function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    if (planIndex === "") return;

    const plan = plans[planIndex];

    // BUG FIX #4: guard against empty plans instead of silently starting a broken session
    if (!plan.exercises || plan.exercises.length === 0) {
        alert(`Der Plan "${plan.name}" hat noch keine Übungen. Bitte zuerst Übungen im Plan hinzufügen.`);
        return;
    }

    currentTracking = {
        plan: plan.name,
        date: new Date().toISOString().split("T")[0],
        note: "",
        startTime: new Date(),
        exercises: plan.exercises.map(id => ({
            id,
            sets: []
        }))
    };

    currentExerciseIndex = 0;
    timerSeconds = 0;
    timerStart = null;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    renderTracking();
}

// ---------------------------------------------------------
// ADD EXERCISE TO CURRENT WORKOUT
// ---------------------------------------------------------
function addExerciseToCurrentWorkout() {
    const id = document.getElementById("addExerciseToWorkoutSelect").value;
    if (!id) return;

    currentTracking.exercises.push({
        id,
        sets: []
    });

    renderTracking();
}

// ---------------------------------------------------------
// DRAG & DROP SORTING
// ---------------------------------------------------------
let dragIndex = null;

function dragStart(e, index) {
    dragIndex = index;
}

function dragOver(e) {
    e.preventDefault();
}

function dropExercise(e, index) {
    const item = currentTracking.exercises.splice(dragIndex, 1)[0];
    currentTracking.exercises.splice(index, 0, item);
    renderTracking();
}

// ---------------------------------------------------------
// TRACKING POPUP EDITOR
// ---------------------------------------------------------
function editTrackingExercise(exIndex) {
    const ex = currentTracking.exercises[exIndex];
    const exInfo = exercises.find(e => e.id === ex.id);

    let html = `<h3>${exInfo ? exInfo.name : "Unbekannt"} bearbeiten</h3>`;

    ex.sets.forEach((s, i) => {
        html += `
            <div class="edit-box">
                <label>Satz ${i + 1}</label><br>
                <input id="editWeight_${i}" type="number" value="${s.weight}" /> kg
                <input id="editReps_${i}" type="number" value="${s.reps}" /> Wdh
                <button class="delete-btn" onclick="deleteTrackingSet(${exIndex}, ${i})">🗑️</button>
            </div>
        `;
    });

    html += `
        <button onclick="addTrackingSet(${exIndex})" style="margin-top:10px;">+ Satz hinzufügen</button>

        <div style="margin-top:20px; display:flex; justify-content:space-between;">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="saveTrackingExercise(${exIndex})">Speichern</button>
        </div>
    `;

    openPopup(html);
}

function deleteTrackingSet(exIndex, setIndex) {
    currentTracking.exercises[exIndex].sets.splice(setIndex, 1);
    editTrackingExercise(exIndex);
}

function addTrackingSet(exIndex) {
    currentTracking.exercises[exIndex].sets.push({ weight: 0, reps: 0 });
    editTrackingExercise(exIndex);
}

function saveTrackingExercise(exIndex) {
    const ex = currentTracking.exercises[exIndex];

    ex.sets = ex.sets.map((s, i) => ({
        weight: Number(document.getElementById(`editWeight_${i}`).value),
        reps: Number(document.getElementById(`editReps_${i}`).value)
    }));

    closePopup();
    renderTracking();
}

// ---------------------------------------------------------
// TRACKING RENDER
// ---------------------------------------------------------
function renderTracking() {
    const area = document.getElementById("trackingArea");

    if (!currentTracking) {
        area.innerHTML = "";
        const startEl = document.getElementById("trackingStartTime");
        if (startEl) startEl.innerText = "";
        return;
    }

    const total = currentTracking.exercises.length;
    const done = currentExerciseIndex;

    if (timerStart) {
        timerSeconds = Math.floor((Date.now() - timerStart) / 1000);
    }

    const exerciseOptions = exercises
        .map(ex => `<option value="${ex.id}">${ex.name}</option>`)
        .join("");

    const startEl = document.getElementById("trackingStartTime");
    if (startEl) {
        startEl.innerText =
            "Gestartet um " +
            currentTracking.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // -----------------------------------------------------
    // FINISHED ALL EXERCISES
    // -----------------------------------------------------
    if (currentExerciseIndex >= total) {
        area.innerHTML = `
            <h3>Letzte Übung abgeschlossen</h3>

            <button onclick="finishWorkoutPrompt()">Workout beenden</button>

            <div class="optional-box">
                <h4>Übung zum Workout hinzufügen</h4>
                <select id="addExerciseToWorkoutSelect">
                    ${exerciseOptions}
                </select>
                <button onclick="addExerciseToCurrentWorkout()">Hinzufügen</button>
            </div>

            ${currentExerciseIndex > 0 ? `
                <h4>Vorherige Übungen:</h4>
                <ul>
                    ${currentTracking.exercises.map((ex, idx) => {
                        const info = exercises.find(e => e.id === ex.id);
                        return `
                            <li>
                                ${info ? info.name : "Unbekannt"}
                                <ul>${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}</ul>
                            </li>
                        `;
                    }).join("")}
                </ul>
            ` : ""}
        `;
        return;
    }

    // -----------------------------------------------------
    // CURRENT EXERCISE
    // -----------------------------------------------------
    const ex = currentTracking.exercises[currentExerciseIndex];
    const exInfo = exercises.find(e => e.id === ex.id);

    area.innerHTML = `
        <h3>${exInfo ? exInfo.name : "Unbekannt"}</h3>
        <p>${done} von ${total} Übungen erledigt</p>

        <label>Gewicht (kg)</label>
        <input id="trackWeight" type="number" value="${ex.sets.at(-1)?.weight ?? ''}" />

        <label>Wiederholungen</label>
        <input id="trackReps" type="number" value="${ex.sets.at(-1)?.reps ?? ''}" />

        <button onclick="saveSet()">Satz speichern</button>

        <button onclick="nextExercise()" style="margin-top:20px;">Nächste Übung</button>

        <div class="timer-box" onclick="toggleTimer()" style="margin-top:25px;">
            <span class="timer-icon">⏱️</span>
            <span id="timerDisplay">${formatTime(timerSeconds)}</span>
        </div>

        ${ex.sets.length > 0 ? `
            <h4>Bisherige Sätze:</h4>
            <ul>
                ${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}
            </ul>
        ` : ""}

        <div class="optional-box">
            <h4>Übung zum Workout hinzufügen</h4>
            <select id="addExerciseToWorkoutSelect">
                ${exerciseOptions}
            </select>
            <button onclick="addExerciseToCurrentWorkout()">Hinzufügen</button>
        </div>

        <h4>Übungen sortieren</h4>
        <ul>
            ${currentTracking.exercises.map((ex, idx) => {
                const info = exercises.find(e => e.id === ex.id);
                return `
                    <li class="track-exercise" style="display:flex; justify-content:space-between; align-items:center;">
                        <span>${info ? info.name : "Unbekannt"}</span>
                        <div style="display:flex; align-items:center;">
                            <button onclick="moveExerciseUp(${idx})" style="font-size:16px; margin:0 2px;">↑</button>
                            <button onclick="moveExerciseDown(${idx})" style="font-size:16px; margin:0 2px;">↓</button>
                        </div>
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

// ---------------------------------------------------------
// SAVE SET
// ---------------------------------------------------------
function saveSet() {
    const weight = Number(document.getElementById("trackWeight").value);
    const reps = Number(document.getElementById("trackReps").value);

    if (!weight || !reps) return;

    currentTracking.exercises[currentExerciseIndex].sets.push({ weight, reps });
    renderTracking();
}

// ---------------------------------------------------------
// NEXT EXERCISE
// ---------------------------------------------------------
function nextExercise() {
    currentExerciseIndex++;
    renderTracking();
}

// ---------------------------------------------------------
// FINISH WORKOUT
// BUG FIX #5: replaced native browser prompt() with in-app popup
// ---------------------------------------------------------
function finishWorkoutPrompt() {
    openPopup(`
        <h3>Workout beenden</h3>
        <label>Notiz (optional)</label>
        <textarea id="workoutNoteInput" style="height:100px; resize:vertical;" placeholder="z.B. Heute gut gefühlt..."></textarea>
        <div style="margin-top:16px; display:flex; justify-content:space-between;">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="finishWorkout()">Speichern</button>
        </div>
    `);
}

function finishWorkout() {
    const noteEl = document.getElementById("workoutNoteInput");
    if (noteEl && noteEl.value.trim()) {
        currentTracking.note = noteEl.value.trim();
    }

    workouts.push(currentTracking);
    save();
    currentTracking = null;
    currentExerciseIndex = 0;

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    timerStart = null;

    const startEl = document.getElementById("trackingStartTime");
    if (startEl) startEl.innerText = "";

    closePopup();
    renderTracking();
    showPage("history");
}



let workoutEditIndex = null;

/* ---------------------------------------------------------
   WORKOUT EDITOR POPUP
--------------------------------------------------------- */

function openWorkoutEditor(index) {
    workoutEditIndex = index;
    const w = workouts[index];

    let html = `<h3>Workout bearbeiten</h3>`;

    w.exercises.forEach((ex, exIndex) => {
        const exInfo = exercises.find(e => e.id === ex.id);
        const name = exInfo ? exInfo.name : "Unbekannte Übung";

        html += `
            <div class="editor-exercise-block" 
                 style="border:1px solid #ddd; padding:10px; margin-bottom:12px; border-radius:10px;">
                
                <h4 style="display:flex; justify-content:space-between; align-items:center;">
                    ${name}
                    <button onclick="deleteEditorExercise(${exIndex})" class="delete-btn">❌</button>
                </h4>
        `;

        ex.sets.forEach((set, setIndex) => {
            html += `
                <div class="set-edit-row" 
                     style="display:flex; gap:10px; margin-bottom:8px; align-items:center;">
                    
                    <label>Gewicht:</label>
                    <input type="number" id="edit_weight_${exIndex}_${setIndex}" 
                           value="${set.weight}" style="width:70px;">
                    
                    <label>Wdh:</label>
                    <input type="number" id="edit_reps_${exIndex}_${setIndex}" 
                           value="${set.reps}" style="width:70px;">
                    
                    <button onclick="deleteEditorSet(${exIndex}, ${setIndex})" 
                            class="delete-btn">🗑️</button>
                </div>
            `;
        });

        html += `
                <button onclick="addEditorSet(${exIndex})" 
                        class="popup-save-btn">➕ Satz hinzufügen</button>
            </div>
        `;
    });

    html += `
        <button onclick="saveWorkoutEditor()" class="popup-save-btn">Speichern</button>
        <button onclick="closePopup()" class="popup-cancel-btn">Abbrechen</button>
    `;

    openPopup(html);
}

/* ---------------------------------------------------------
   SET LÖSCHEN
--------------------------------------------------------- */

function deleteEditorSet(exIndex, setIndex) {
    const w = workouts[workoutEditIndex];
    w.exercises[exIndex].sets.splice(setIndex, 1);
    openWorkoutEditor(workoutEditIndex);
}

/* ---------------------------------------------------------
   SET HINZUFÜGEN
--------------------------------------------------------- */

function addEditorSet(exIndex) {
    const w = workouts[workoutEditIndex];
    w.exercises[exIndex].sets.push({ weight: 0, reps: 0 });
    openWorkoutEditor(workoutEditIndex);
}

/* ---------------------------------------------------------
   ÜBUNG LÖSCHEN
--------------------------------------------------------- */

function deleteEditorExercise(exIndex) {
    const w = workouts[workoutEditIndex];
    w.exercises.splice(exIndex, 1);
    openWorkoutEditor(workoutEditIndex);
}

/* ---------------------------------------------------------
   SPEICHERN
   BUG FIX #1 continued: saveAll() replaced with save()
--------------------------------------------------------- */

function saveWorkoutEditor() {
    if (workoutEditIndex === null) return;

    const w = workouts[workoutEditIndex];

    w.exercises.forEach((ex, exIndex) => {
        ex.sets.forEach((set, setIndex) => {
            const weight = parseFloat(document.getElementById(`edit_weight_${exIndex}_${setIndex}`).value);
            const reps = parseInt(document.getElementById(`edit_reps_${exIndex}_${setIndex}`).value);

            set.weight = weight;
            set.reps = reps;
        });
    });

    save();
    renderAll();
    closePopup();
}


// ---------------------------------------------------------
// DASHBOARD – WEEK CALCULATION
// ---------------------------------------------------------
function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getFullYear(), week: weekNo };
}

function groupWorkoutsByWeek() {
    const groups = {};

    workouts.forEach(w => {
        const { year, week } = getISOWeek(w.date);
        const key = `${year}-KW${week}`;

        if (!groups[key]) groups[key] = [];
        groups[key].push(w);
    });

    return groups;
}

// ---------------------------------------------------------
// DASHBOARD – PROGRESSION
// ---------------------------------------------------------
function getExerciseProgression() {
    const map = {};

    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            const exInfo = exercises.find(e => e.id === ex.id);
            if (!exInfo) return;

            if (!map[ex.id]) map[ex.id] = { name: exInfo.name, values: [] };

            if (ex.sets.length > 0) {
                const avg = ex.sets.reduce((sum, s) => sum + s.weight, 0) / ex.sets.length;
                map[ex.id].values.push(avg);
            }
        });
    });

    const result = [];

    Object.keys(map).forEach(id => {
        const entry = map[id];
        const arr = entry.values;

        if (arr.length < 2) return;

        const last = arr[arr.length - 1];
        const prev = arr[arr.length - 2];

        let avgDiff = 0;
        if (arr.length > 1) {
            let sum = 0;
            for (let i = 1; i < arr.length; i++) {
                sum += arr[i] - arr[i - 1];
            }
            avgDiff = sum / (arr.length - 1);
        }

        result.push({
            id,
            name: entry.name,
            lastIncrease: last - prev,
            avgIncrease: avgDiff,
            lastAvg: last,
            prevAvg: prev,
            count: arr.length,
            values: arr
        });
    });

    return result;
}

// ---------------------------------------------------------
// MINI-CHART RENDERER
// ---------------------------------------------------------
function drawMiniChart(canvasId, values) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (values.length < 2) {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, h / 2, w, 2);
        return;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    ctx.strokeStyle = "#007aff";
    ctx.lineWidth = 2;
    ctx.beginPath();

    values.forEach((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

// ---------------------------------------------------------
// DASHBOARD – INSIGHTS (with collapsible progression)
// ---------------------------------------------------------
let progressionCollapsed = {};

function toggleProgression(id) {
    progressionCollapsed[id] = !progressionCollapsed[id];
    renderInsights();
}

function renderInsights() {
    const box = document.getElementById("insightsBox");

    if (workouts.length === 0) {
        box.innerHTML = `<p>Noch keine Insights verfügbar.</p>`;
        return;
    }

    const thisWeek = getWorkoutsThisWeek().length;
    const comparison = getWeeklyComparison();
    const progression = getExerciseProgression();

    box.innerHTML = `
        <div class="insight-card">
            <h3>Trainings diese Woche</h3>
            <p>${thisWeek}</p>
        </div>

        <div class="insight-card">
            <h3>Vergleich zu letzter Woche</h3>
            <p>${comparison}</p>
        </div>

        <div class="insight-card">
            <h3>Progression</h3>
            ${
                progression.length === 0
                ? "<p>Noch keine Progression messbar</p>"
                : progression.map((p, idx) => {

                    if (progressionCollapsed[p.id] === undefined) {
                        progressionCollapsed[p.id] = false;
                    }

                    const collapsed = progressionCollapsed[p.id];

                    return `
                        <div class="progression-item" style="margin-bottom:15px;">

                            <h4 onclick="toggleProgression('${p.id}')"
                                style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
                                <span>${p.name}</span>
                                <span>${collapsed ? "▸" : "▾"}</span>
                            </h4>

                            <div id="prog_${p.id}" style="display:${collapsed ? "none" : "block"};">
                                Letzte Steigerung: ${p.lastIncrease > 0 ? "+" : ""}${p.lastIncrease.toFixed(1)} kg<br>
                                Durchschnittliche Steigerung: ${p.avgIncrease > 0 ? "+" : ""}${p.avgIncrease.toFixed(1)} kg<br>
                                (${p.count} Workouts)

                                <canvas id="chart_${idx}" width="200" height="40" style="margin-top:6px;"></canvas>
                            </div>

                        </div>
                    `;
                }).join("")
            }
        </div>
    `;

    progression.forEach((p, idx) => {
        if (!progressionCollapsed[p.id]) {
            drawMiniChart(`chart_${idx}`, p.values);
        }
    });
}

// ---------------------------------------------------------
// DASHBOARD – WEEKLY HISTORY
// ---------------------------------------------------------
function renderHistoryGrouped() {
    const box = document.getElementById("historyBox");

    if (workouts.length === 0) {
        box.innerHTML = `<p>Noch keine Workouts gespeichert.</p>`;
        return;
    }

    const groups = groupWorkoutsByWeek();
    const keys = Object.keys(groups).sort().reverse();

    box.innerHTML = keys.map(key => {
        const list = groups[key];

        return `
            <div class="week-box">
                <h3 onclick="toggleCollapse('${key}')">
                    ${key} <span id="arrow-${key}">▾</span>
                </h3>

                <div id="${key}">
                    ${list.map(w => `
                        <div class="history-entry">
                            <strong>${w.plan}</strong> – ${w.date}
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }).join("");
}

// ---------------------------------------------------------
// WEEKLY INSIGHT HELPERS
// BUG FIX #6: getWorkoutsLastWeek now handles year boundaries correctly
//             by subtracting 7 days instead of decrementing the week number
// ---------------------------------------------------------
function getWorkoutsThisWeek() {
    const now = new Date();
    const { year, week } = getISOWeek(now);

    return workouts.filter(w => {
        const wInfo = getISOWeek(w.date);
        return wInfo.year === year && wInfo.week === week;
    });
}

function getWorkoutsLastWeek() {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const { year, week } = getISOWeek(lastWeekDate);

    return workouts.filter(w => {
        const wInfo = getISOWeek(w.date);
        return wInfo.year === year && wInfo.week === week;
    });
}

function getWeeklyComparison() {
    const thisWeek = getWorkoutsThisWeek().length;
    const lastWeek = getWorkoutsLastWeek().length;

    if (thisWeek === 0 && lastWeek === 0)
        return "Noch keine Daten vorhanden";

    if (thisWeek > lastWeek)
        return `+${thisWeek - lastWeek} Trainings mehr als letzte Woche`;

    if (thisWeek < lastWeek)
        return `${lastWeek - thisWeek} Trainings weniger als letzte Woche`;

    return "Gleich viele Trainings wie letzte Woche";
}

// ---------------------------------------------------------
// BACKUP CENTER
// ---------------------------------------------------------
function openSettingsMenu() {
    const html = `
        <h2>Backup & Import – v${APP_VERSION}</h2>

        <h3>📦 Gesamte Datenbank</h3>
        <button onclick="exportAll()">📤 Alles exportieren (JSON)</button>
        <input type="file" accept="application/json" onchange="handleImportFile(event)">


        <hr>

        <h3>📤 Einzel-Export</h3>
        <strong>Trainingspläne:</strong><br>
        ${plans.map((p, i) => `
            <button onclick="exportSinglePlan(${i})">${p.name}</button>
        `).join("")}

        <br><br>
        <strong>Übungen:</strong><br>
        ${exercises.map((ex, i) => `
            <button onclick="exportSingleExercise(${i})">${ex.name}</button>
        `).join("")}

        <br><br>
        <strong>Workouts:</strong><br>
        ${workouts.map((w, i) => `
            <button onclick="exportSingleWorkout(${i})">${w.plan} – ${w.date}</button>
        `).join("")}

        <hr>

        <h3>📥 Einzel-Import</h3>
        <input type="file" accept="application/json" onchange="importSingle(event)" />

        <hr>

        <h3>📊 CSV-Export</h3>
        <button onclick="exportCSVWorkouts()">Workouts.csv</button>
        <button onclick="exportCSVExercises()">Exercises.csv</button>
        <button onclick="exportCSVPlans()">Plans.csv</button>

        <hr>

        <h3>⚙️ System</h3>
        <p>App-Version: ${APP_VERSION}</p>

        <button onclick="closePopup()" style="margin-top:20px;">Schließen</button>
    `;

    openPopup(html);
}


// ---------------------------------------------------------
// EXPORT / IMPORT
// ---------------------------------------------------------
function exportAll() {
    const data = {
        version: APP_VERSION,
        categories,
        exercises,
        plans,
        workouts
    };

    downloadJSON(data, "backup-all-v" + APP_VERSION + ".json");
}

function downloadJSON(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

function importAll(json) {
    try {
        const data = JSON.parse(json);

        if (!data.version) {
            alert("Ungültiges Backup: Version fehlt.");
            return;
        }

        categories = [];
        exercises = [];
        plans = [];
        workouts = [];

        if (Array.isArray(data.categories)) categories = data.categories;
        if (Array.isArray(data.exercises)) exercises = data.exercises;
        if (Array.isArray(data.plans)) plans = data.plans;
        if (Array.isArray(data.workouts)) workouts = data.workouts;

        save();
        renderAll();

        alert("Backup erfolgreich importiert!");

    } catch (e) {
        console.error("IMPORT FEHLER:", e);
        alert("Fehler beim Import. Datei ungültig.");
    }
}


function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
        const text = e.target.result;
        importAll(text);
    };

    reader.readAsText(file);
}



// ---------------------------------------------------------
// MERGE HELPERS
// ---------------------------------------------------------
function mergeCategories(importedCategories) {
    if (!Array.isArray(importedCategories)) return;

    importedCategories.forEach(cat => {
        if (!cat || typeof cat !== "string") return;

        const exists = categories.some(c => c.toLowerCase() === cat.toLowerCase());
        if (!exists) categories.push(cat);
    });
}

function mergeExercises(importedExercises) {
    if (!Array.isArray(importedExercises)) return;

    importedExercises.forEach(ex => {
        if (!ex || !ex.name) return;

        const name = ex.name.trim();
        const category = ex.category?.trim() || "Unbekannt";

        const catExists = categories.some(c => c.toLowerCase() === category.toLowerCase());
        if (!catExists) categories.push(category);

        let existing = exercises.find(e => e.name.toLowerCase() === name.toLowerCase());

        if (!existing) {
            existing = {
                id: "ex_" + Math.random().toString(36).substr(2, 9),
                name,
                category
            };
            exercises.push(existing);
        }

        ex._importedId = existing.id;
    });
}



function mergePlans(imported) {
    imported.forEach(p => {
        const existing = plans.find(pl => pl.name === p.name);

        if (!existing) {
            plans.push(p);
        } else {
            p.exercises.forEach(id => {
                if (!existing.exercises.includes(id)) {
                    existing.exercises.push(id);
                }
            });
        }
    });
}

function normalizeDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split("T")[0];

    if (dateStr.includes(".")) {
        const [d, m, y] = dateStr.split(".");
        return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
    }

    if (dateStr.includes("/")) {
        return dateStr.replace(/\//g, "-");
    }

    return dateStr;
}

function mergeWorkouts(importedWorkouts, importedExercises = []) {
    if (!Array.isArray(importedWorkouts)) return;

    importedWorkouts.forEach(w => {
        if (!w || !w.date || !w.exercises) return;

        const planCategory = w.plan || "Unbekannt";

        if (!categories.some(c => c.toLowerCase() === planCategory.toLowerCase())) {
            categories.push(planCategory);
        }

        w.exercises.forEach(ex => {

            let name = ex.name;

            if (!name && ex.id) {
                const foundLocal = exercises.find(e => e.id === ex.id);
                if (foundLocal) name = foundLocal.name;
            }

            if (!name && ex.id) {
                const foundImported = importedExercises.find(e => e.id === ex.id);
                if (foundImported) name = foundImported.name;
            }

            if (!name) {
                console.warn("Workout-Exercise ohne Name:", ex);
                return;
            }

            name = name.trim();

            let existing = exercises.find(e => e.name.toLowerCase() === name.toLowerCase());

            if (!existing) {
                existing = {
                    id: "ex_" + Math.random().toString(36).substr(2, 9),
                    name,
                    category: planCategory
                };
                exercises.push(existing);
            }

            ex.id = existing.id;
            delete ex.name;
        });

        workouts.push(w);
    });
}


// ---------------------------------------------------------
// SINGLE EXPORT
// ---------------------------------------------------------
function exportSinglePlan(i) {
    downloadJSON({ type: "plan", value: plans[i] }, `plan-${plans[i].name}.json`);
}

function exportSingleExercise(i) {
    downloadJSON({ type: "exercise", value: exercises[i] }, `exercise-${exercises[i].name}.json`);
}

function exportSingleWorkout(i) {
    downloadJSON({ type: "workout", value: workouts[i] }, `workout-${workouts[i].date}.json`);
}

// ---------------------------------------------------------
// SINGLE IMPORT
// ---------------------------------------------------------
function importSingle(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
        try {
            let text = e.target.result;

            text = text.replace(/^\uFEFF/, "");
            text = text.replace(/[\u200B-\u200D\uFEFF]/g, "");

            const data = JSON.parse(text);

            console.log("Einzel-Import JSON:", data);

            if (data.type === "category") {
                mergeCategories([data.value]);
            }

            else if (data.type === "exercise") {
                mergeExercises([data.value]);
            }

            else if (data.type === "plan") {
                mergePlans([data.value]);
            }

            else if (data.type === "workout") {
                mergeWorkouts([data.value]);
            }

            else {
                alert("Unbekannter Einzel-Import-Typ: " + data.type);
                return;
            }

            save();
            renderAll();

            alert("Einzel-Import erfolgreich!");
        } catch (err) {
            console.error("IMPORT FEHLER (Single):", err);
            alert("Ungültige Datei!");
        }
    };

    reader.readAsText(file);
}

function deleteAllAppData() {
    const ok = confirm("Willst du wirklich ALLE Daten löschen? Übungen, Kategorien, Pläne, Workouts und Tracking werden unwiderruflich entfernt.");
    if (!ok) return;

    exercises = [];
    categories = [];
    plans = [];
    workouts = [];

    localStorage.clear();

    renderAll();
    alert("Alle App-Daten wurden gelöscht.");
}


// ---------------------------------------------------------
// CSV EXPORT
// ---------------------------------------------------------
function exportCSVWorkouts() {
    let csv = "Datum;Plan;Übung;Satz;Gewicht;Wdh\n";

    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            const exInfo = exercises.find(e => e.id === ex.id);
            ex.sets.forEach((s, i) => {
                csv += `${w.date};${w.plan};${exInfo ? exInfo.name : "Unbekannt"};${i + 1};${s.weight};${s.reps}\n`;
            });
        });
    });

    downloadCSV(csv, "workouts.csv");
}

function exportCSVExercises() {
    let csv = "ID;Name;Kategorie\n";
    exercises.forEach(ex => {
        csv += `${ex.id};${ex.name};${ex.category}\n`;
    });
    downloadCSV(csv, "exercises.csv");
}

function exportCSVPlans() {
    let csv = "Plan;ÜbungID\n";
    plans.forEach(p => {
        p.exercises.forEach(id => {
            csv += `${p.name};${id}\n`;
        });
    });
    downloadCSV(csv, "plans.csv");
}

function downloadCSV(text, filename) {
    const blob = new Blob([text], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

// ---------------------------------------------------------
// RENDER ALL
// ---------------------------------------------------------
function renderAll() {
    renderHistory();
    renderCategories();
    renderExercises();
    renderPlans();
    renderTracking();
}

// ---------------------------------------------------------
// INITIALIZE
// ---------------------------------------------------------
renderAll();
showPage("dashboard");