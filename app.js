// -----------------------------
// DATA
// -----------------------------
let categories = JSON.parse(localStorage.getItem("categories")) || ["Brust", "Rücken", "Beine"];
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
let plans = JSON.parse(localStorage.getItem("plans")) || [];
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function save() {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("exercises", JSON.stringify(exercises));
    localStorage.setItem("plans", JSON.stringify(plans));
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

// -----------------------------
// POPUP SYSTEM
// -----------------------------
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

// -----------------------------
// COLLAPSIBLE
// -----------------------------
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

// -----------------------------
// NAVIGATION
// -----------------------------
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + page).classList.add("active");

    document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
    document.getElementById("tab-" + page).classList.add("active");

    renderAll();
}

// -----------------------------
// ÜBERSICHT
// -----------------------------
function renderOverview() {
    const list = document.getElementById("overviewList");
    const details = document.getElementById("overviewDetails");

    list.innerHTML = "";
    details.innerHTML = "";

    if (workouts.length === 0) return;

    workouts.forEach((w, index) => {
        list.innerHTML += `
            <li>
                <div onclick="showWorkoutDetails(${index})" style="flex:1; cursor:pointer;">
                    <strong>${w.plan}</strong><br>
                    ${w.date}
                </div>

                <button class="delete-btn" onclick="openWorkoutEditor(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteWorkout(${index})">🗑️</button>
            </li>
        `;
    });
}

function showWorkoutDetails(index) {
    const w = workouts[index];
    const details = document.getElementById("overviewDetails");

    document.querySelectorAll("#overviewList li").forEach(li => li.classList.remove("overview-highlight"));
    const listItem = document.querySelector(`#overviewList li:nth-child(${index + 1})`);
    if (listItem) listItem.classList.add("overview-highlight");

    let html = `<h3>${w.plan} – ${w.date}</h3>`;

    if (w.note) {
        html += `<div class="note-box"><strong>Notiz:</strong><br>${w.note}</div>`;
    }

    w.exercises.forEach(ex => {
        html += `<strong>${ex.name}</strong><ul>`;
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
    renderOverview();
    document.getElementById("overviewDetails").innerHTML = "";
}

// -----------------------------
// POPUP: WORKOUT EDITOR
// -----------------------------
function openWorkoutEditor(index) {
    const w = workouts[index];

    let html = `
        <h3>Workout bearbeiten</h3>

        <label>Notiz</label>
        <textarea id="editNote" style="width:100%;height:60px;">${w.note || ""}</textarea>

        <h4>Übungen</h4>
    `;

    w.exercises.forEach((ex, exIndex) => {
        html += `
            <div style="margin-bottom:15px; padding:10px; border:1px solid #ddd; border-radius:10px;">
                <strong>${ex.name}</strong>
                <button class="delete-btn" onclick="deleteExerciseFromWorkout(${index}, ${exIndex})">🗑️</button>

                <ul style="margin-top:10px;">
        `;

        ex.sets.forEach((s, setIndex) => {
            html += `
                <li>
                    <input type="number" id="w_${index}_ex_${exIndex}_w_${setIndex}" value="${s.weight}" style="width:60px;"> kg
                    <input type="number" id="w_${index}_ex_${exIndex}_r_${setIndex}" value="${s.reps}" style="width:60px;"> Wdh
                    <button class="delete-btn" onclick="deleteSetFromWorkout(${index}, ${exIndex}, ${setIndex})">×</button>
                </li>
            `;
        });

        html += `
                </ul>

                <button onclick="addSetToWorkout(${index}, ${exIndex})">+ Satz hinzufügen</button>
            </div>
        `;
    });

    html += `
        <button onclick="saveWorkoutEditor(${index})" style="margin-top:10px;">Speichern</button>
        <button onclick="closePopup()" style="margin-top:10px;">Abbrechen</button>
    `;

    openPopup(html);
}

function deleteExerciseFromWorkout(wIndex, exIndex) {
    workouts[wIndex].exercises.splice(exIndex, 1);
    save();
    openWorkoutEditor(wIndex);
}

function deleteSetFromWorkout(wIndex, exIndex, setIndex) {
    workouts[wIndex].exercises[exIndex].sets.splice(setIndex, 1);
    save();
    openWorkoutEditor(wIndex);
}

function addSetToWorkout(wIndex, exIndex) {
    workouts[wIndex].exercises[exIndex].sets.push({ weight: 0, reps: 0 });
    save();
    openWorkoutEditor(wIndex);
}

function saveWorkoutEditor(wIndex) {
    const w = workouts[wIndex];

    w.note = document.getElementById("editNote").value;

    w.exercises.forEach((ex, exIndex) => {
        ex.sets = ex.sets.map((s, setIndex) => ({
            weight: Number(document.getElementById(`w_${wIndex}_ex_${exIndex}_w_${setIndex}`).value),
            reps: Number(document.getElementById(`w_${wIndex}_ex_${exIndex}_r_${setIndex}`).value)
        }));
    });

    save();
    closePopup();
    renderOverview();
    showWorkoutDetails(wIndex);
}

// -----------------------------
// ÜBUNGEN
// -----------------------------
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

    exercises.push({ name, category });
    document.getElementById("exerciseName").value = "";
    save();
    renderExercises();
    renderPlans();
}

function deleteExercise(i) {
    const exName = exercises[i].name;

    plans = plans.map(p => ({
        ...p,
        exercises: p.exercises.filter(e => e !== exName)
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
                <button class="delete-btn" onclick="deleteExercise(${i})">×</button>
            </li>
        `;
    });
}

// -----------------------------
// PLÄNE
// -----------------------------
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
    const exerciseName = select.value;
    if (!exerciseName) return;

    if (!plans[planIndex].exercises.includes(exerciseName)) {
        plans[planIndex].exercises.push(exerciseName);
        save();
        renderPlans();
    }
}

function removeExerciseFromPlan(planIndex, exerciseName) {
    plans[planIndex].exercises = plans[planIndex].exercises.filter(ex => ex !== exerciseName);
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
            .map(ex => `<option value="${ex.name}">${ex.name}</option>`)
            .join("");

        const assignedExercises = p.exercises
            .map(ex => `
                <li>
                    ${ex}
                    <button class="delete-btn" onclick="removeExerciseFromPlan(${i}, '${ex}')">×</button>
                </li>
            `)
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

    // Nur den ersten Plan offen lassen
    setTimeout(() => {
        plans.forEach((_, i) => {
            const content = document.getElementById("plan_" + i);
            const box = document.getElementById("planBox_" + i);

            if (i === 0) {
                if (content) content.style.display = "block";
                if (box) box.classList.add("active");
            } else {
                if (content) content.style.display = "none";
                if (box) box.classList.remove("active");
            }
        });
    }, 0);
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

// -----------------------------
// TRACKING
// -----------------------------
let currentTracking = null;
let currentExerciseIndex = 0;

let timerInterval = null;
let timerSeconds = 0;
let timerStart = null;

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

function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    if (planIndex === "") return;

    const plan = plans[planIndex];

    currentTracking = {
        plan: plan.name,
        date: new Date().toISOString().split("T")[0],
        note: "",
        startTime: new Date(),
        exercises: plan.exercises.map(name => ({
            name,
            sets: []
        }))
    };

    currentExerciseIndex = 0;
    timerSeconds = 0;
    timerStart = null;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    const startEl = document.getElementById("trackingStartTime");
    if (startEl) {
        startEl.innerText =
            "Gestartet um " +
            currentTracking.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    renderTracking();
}

function addExerciseToCurrentWorkout() {
    const name = document.getElementById("addExerciseToWorkoutSelect").value;
    if (!name) return;

    currentTracking.exercises.push({
        name,
        sets: []
    });

    renderTracking();
}

// -----------------------------
// TRACKING-POPUP EDITOR
// -----------------------------
function editTrackingExercise(exIndex) {
    const ex = currentTracking.exercises[exIndex];

    let html = `<h3>${ex.name} bearbeiten</h3>`;

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

// -----------------------------
// TRACKING RENDER
// -----------------------------
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
        .filter(ex => !currentTracking.exercises.some(e => e.name === ex.name))
        .map(ex => `<option value="${ex.name}">${ex.name}</option>`)
        .join("");

    const canAddExercise = exerciseOptions.length > 0;

    const previousExercises = currentTracking.exercises
        .slice(0, currentExerciseIndex)
        .map((ex, idx) => `
            <li>
                <strong>${ex.name}</strong>
                <button onclick="editTrackingExercise(${idx})">✏️</button>
                <ul>${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}</ul>
            </li>
        `)
        .join("");

    const startEl = document.getElementById("trackingStartTime");
    if (startEl) {
        startEl.innerText =
            "Gestartet um " +
            currentTracking.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    if (currentExerciseIndex >= total) {
        area.innerHTML = `
            <h3>Letzte Übung abgeschlossen</h3>

            <button onclick="finishWorkoutPrompt()">Workout beenden</button>

            <div class="optional-box">
                <h4>Übung zum Workout hinzufügen</h4>
                <select id="addExerciseToWorkoutSelect" ${canAddExercise ? "" : "disabled"}>
                    ${exerciseOptions}
                </select>
                <button onclick="addExerciseToCurrentWorkout()" ${canAddExercise ? "" : "disabled"}>
                    Hinzufügen
                </button>
            </div>

            ${currentExerciseIndex > 0 ? `
                <h4>Vorherige Übungen:</h4>
                <ul>${previousExercises}</ul>
            ` : ""}
        `;
        return;
    }

    const ex = currentTracking.exercises[currentExerciseIndex];

    area.innerHTML = `
        <h3>${ex.name}</h3>
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
            <select id="addExerciseToWorkoutSelect" ${canAddExercise ? "" : "disabled"}>
                ${exerciseOptions}
            </select>
            <button onclick="addExerciseToCurrentWorkout()" ${canAddExercise ? "" : "disabled"}>
                Hinzufügen
            </button>
        </div>

        ${currentExerciseIndex > 0 ? `
            <h4>Vorherige Übungen:</h4>
            <ul>${previousExercises}</ul>
        ` : ""}
    `;
}

function saveSet() {
    const weight = Number(document.getElementById("trackWeight").value);
    const reps = Number(document.getElementById("trackReps").value);

    if (!weight || !reps) return;

    currentTracking.exercises[currentExerciseIndex].sets.push({ weight, reps });
    renderTracking();
}

function nextExercise() {
    currentExerciseIndex++;
    renderTracking();
}

// -------------------------------------
// NOTIZ BEIM BEENDEN
// -------------------------------------
function finishWorkoutPrompt() {
    const note = prompt("Optional: Notiz zum Workout hinzufügen:");
    if (note !== null && note.trim() !== "") currentTracking.note = note.trim();
    finishWorkout();
}

function finishWorkout() {
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

    renderTracking();
    showPage("overview");
}

// -----------------------------
// RENDER ALL
// -----------------------------
function renderAll() {
    renderOverview();
    renderCategories();
    renderExercises();
    renderPlans();
    renderTracking();
}

renderAll();
showPage("overview");

