// ---------------------------------------------------------
// VERSION
// ---------------------------------------------------------
const APP_VERSION = "1.2.1";

const CHANGELOG = [
    {
        version: "1.2.1",
        date: "2026-04-22",
        notes: [
            "Modernes Karten-Design für alle Tabs",
            "Dashboard mit Stats-Grid und Progressions-Karten",
            "Historie zeigt Sätze als Chips in der Detailansicht",
            "Tracking-Tab mit Fortschrittsanzeige und Satz-Chips",
            "Pläne-Tab mit Übungs-Chips statt Listen",
            "Übungen-Tab mit Suche und Kategorien-Gruppen",
        ]
    },
    {
        version: "1.2.0",
        date: "2026-04-20",
        notes: [
            "Volumen-Metrik in der Progression (Gewicht × Wdh)",
            "PR-Erkennung mit Toast-Benachrichtigung",
            "Plateau-Erkennung nach 3 gleichen Werten",
            "Verbesserte Mini-Charts mit Bezier-Kurven und Gradient",
            "Übungs-Detailansicht mit vollständiger Historie",
            "Workout-Dauer wird gespeichert und angezeigt",
        ]
    },
    {
        version: "1.1.0",
        date: "2026-04-15",
        notes: [
            "Einstellungsmenü mit Export/Import (JSON)",
            "CSV-Export für Workouts, Übungen und Pläne",
            "Workout-Editor zum nachträglichen Bearbeiten",
            "Freies Training ohne Plan möglich",
            "Drag & Drop Sortierung der Übungen im Tracking",
        ]
    },
    {
        version: "1.0.0",
        date: "2026-04-10",
        notes: [
            "Erster Release",
            "Übungen mit Kategorien verwalten",
            "Trainingspläne erstellen",
            "Workouts tracken mit Sätzen und Wiederholungen",
            "Dashboard mit Wochenübersicht und Progression",
            "Historie aller Workouts",
        ]
    }
];

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
                    name: ex.name || "Unbekannte Übung",
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

    if      (page === "dashboard")  renderDashboard();
    else if (page === "history")    renderHistory();
    else if (page === "exercises")  { renderCategories(); renderExercises(); }
    else if (page === "plans")      renderPlans();
    else if (page === "tracking")   renderTracking();
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

    if (workouts.length === 0) {
        list.innerHTML = `<p style="color:#888;">Noch keine Workouts gespeichert.</p>`;
        return;
    }

    const reversed = [...workouts].reverse();

    list.innerHTML = reversed.map((w, index) => {
        const originalIndex = workouts.length - 1 - index;
        return `
            <div class="history-card">
                <div class="history-card-main" onclick="showWorkoutDetails(${originalIndex})">
                    <div class="history-card-name">${w.plan}</div>
                    <div class="history-card-meta">${w.date}${w.duration ? ` · ${w.duration} min` : ""}</div>
                </div>
                <div class="history-card-actions">
                    <button class="ex-icon-btn" onclick="openWorkoutEditor(${originalIndex})">✏️</button>
                    <button class="ex-icon-btn" onclick="deleteWorkout(${originalIndex})">🗑️</button>
                </div>
            </div>
        `;
    }).join("");
}

function showWorkoutDetails(index) {
    const w = workouts[index];
    const details = document.getElementById("overviewDetails");

    document.querySelectorAll(".history-card").forEach(c => c.classList.remove("overview-highlight"));
    const reversedIndex = workouts.length - 1 - index;
    const card = document.querySelectorAll(".history-card")[reversedIndex];
    if (card) card.classList.add("overview-highlight");

    const exercisesHtml = w.exercises.map(ex => {
        const exInfo = exercises.find(e => e.id === ex.id);
        const setsHtml = ex.sets.map((s, i) =>
            `<span class="set-chip">S${i + 1}: ${s.weight}kg × ${s.reps}</span>`
        ).join("");
        return `
            <div class="detail-exercise">
                <div class="detail-ex-name">${exInfo ? exInfo.name : "Unbekannte Übung"}</div>
                <div class="detail-sets">${setsHtml}</div>
            </div>
        `;
    }).join("");

    details.innerHTML = `
        <div class="detail-card">
            <div class="detail-header">
                <strong>${w.plan}</strong>
                <span class="detail-meta">${w.date}${w.duration ? ` · ${w.duration} min` : ""}</span>
            </div>
            ${w.note ? `<div class="detail-exercise"><div class="note-box" style="margin:0;"><strong>Notiz:</strong> ${w.note}</div></div>` : ""}
            ${exercisesHtml}
        </div>
    `;
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

    if (select) {
        select.innerHTML = categories.map(c => `<option>${c}</option>`).join("");
    }

    if (list) {
        list.innerHTML = categories.map((c, i) => `
            <span class="cat-chip">
                ${c}
                <button class="cat-chip-delete" onclick="deleteCategory(${i})">×</button>
            </span>
        `).join("");
    }
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
    delete progressionCollapsed[exId];

    save();
    renderExercises();
    renderPlans();
}

function renderExercises() {
    const list = document.getElementById("exerciseList");
    const searchEl = document.getElementById("exerciseSearch");
    const filter = searchEl ? searchEl.value.toLowerCase().trim() : "";

    list.innerHTML = "";

    const groups = {};
    exercises.forEach((ex, i) => {
        if (filter && !ex.name.toLowerCase().includes(filter) && !ex.category.toLowerCase().includes(filter)) return;
        if (!groups[ex.category]) groups[ex.category] = [];
        groups[ex.category].push({ ex, i });
    });

    if (Object.keys(groups).length === 0) {
        list.innerHTML = `<p style="color:#999; text-align:center; margin-top:24px;">Keine Übungen gefunden</p>`;
        return;
    }

    Object.keys(groups).sort().forEach(category => {
        const items = groups[category];
        list.innerHTML += `
            <div class="ex-group">
                <div class="ex-group-header">
                    <span>${category}</span>
                    <span class="ex-group-count">${items.length}</span>
                </div>
                ${items.map(({ ex, i }) => `
                    <div class="ex-item">
                        <span class="ex-item-name">${ex.name}</span>
                        <div class="ex-item-actions">
                            <button class="ex-icon-btn" onclick="renameExercisePopup('${ex.id}')">✏️</button>
                            <button class="ex-icon-btn ex-delete" onclick="deleteExercise(${i})">🗑️</button>
                        </div>
                    </div>
                `).join("")}
            </div>
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

    const exerciseOptions = exercises
        .map(ex => `<option value="${ex.id}">${ex.name}</option>`)
        .join("");

    list.innerHTML = plans.map((p, i) => {
        const chipsHtml = p.exercises.map(exId => {
            const ex = exercises.find(e => e.id === exId);
            return `
                <span class="plan-ex-chip">
                    ${ex ? ex.name : "?"}
                    <button class="cat-chip-delete" onclick="removeExerciseFromPlan(${i}, '${exId}')">×</button>
                </span>
            `;
        }).join("");

        return `
            <div class="plan-card" id="planBox_${i}">
                <div class="plan-card-header" onclick="toggleCollapse('plan_${i}'); highlightPlan(${i});">
                    <span class="plan-card-title">${p.name}</span>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span id="arrow-plan_${i}">▸</span>
                        <button class="ex-icon-btn" onclick="deletePlan(${i}); event.stopPropagation();">🗑️</button>
                    </div>
                </div>
                <div id="plan_${i}" class="plan-card-body" style="display:none;">
                    <div class="plan-exercises">${chipsHtml || `<span style="color:#aaa; font-size:14px;">Noch keine Übungen</span>`}</div>
                    <div style="display:flex; gap:8px;">
                        <select id="planAdd_${i}" style="flex:1; margin:0;">${exerciseOptions}</select>
                        <button onclick="addExerciseToPlan(${i})" style="margin:0; white-space:nowrap;">+ Hinzufügen</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    select.innerHTML = plans.map((p, i) => `<option value="${i}">${p.name}</option>`).join("");
}

function highlightPlan(index) {
    const allCards = document.querySelectorAll(".plan-card");

    allCards.forEach((card, i) => {
        if (i !== index) {
            card.classList.remove("active");
        }
    });

    if (allCards[index]) allCards[index].classList.add("active");
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

    const addExerciseBlock = `
        <div class="ex-add-card" style="margin-top:12px;">
            <div class="ex-add-header" onclick="toggleCollapse('addExToWorkout')">
                <span>Übung hinzufügen</span>
                <span id="arrow-addExToWorkout">▸</span>
            </div>
            <div id="addExToWorkout" style="display:none; padding:0 16px 16px;">
                <select id="addExerciseToWorkoutSelect" style="margin:8px 0 10px;">${exerciseOptions}</select>
                <button onclick="addExerciseToCurrentWorkout()" style="width:100%; margin:0;">Hinzufügen</button>
            </div>
        </div>
    `;

    // -----------------------------------------------------
    // FINISHED ALL EXERCISES
    // -----------------------------------------------------
    if (currentExerciseIndex >= total) {
        const doneList = currentTracking.exercises.map(ex => {
            const info = exercises.find(e => e.id === ex.id);
            const setsText = ex.sets.map(s => `${s.weight}×${s.reps}`).join(", ");
            return `
                <div class="tracking-ex-item done">
                    <div>
                        <div>${info ? info.name : "Unbekannt"}</div>
                        ${setsText ? `<div class="tracking-ex-sets">${setsText}</div>` : ""}
                    </div>
                </div>
            `;
        }).join("");

        area.innerHTML = `
            <div class="tracking-done-card">
                <div class="tracking-done-icon">✅</div>
                <div class="tracking-done-title">Alle Übungen abgeschlossen!</div>
                <div class="tracking-done-sub">${total} Übung${total !== 1 ? "en" : ""}</div>
                <button onclick="finishWorkoutPrompt()" style="width:100%; margin:0; background:#34c759;">Workout beenden</button>
            </div>
            <div class="tracking-exercise-list">${doneList}</div>
            ${addExerciseBlock}
        `;
        return;
    }

    // -----------------------------------------------------
    // CURRENT EXERCISE
    // -----------------------------------------------------
    const ex = currentTracking.exercises[currentExerciseIndex];
    const exInfo = exercises.find(e => e.id === ex.id);

    const setsChips = ex.sets.length > 0
        ? `<div class="tracking-sets">${ex.sets.map((s, i) => `<span class="set-chip">S${i + 1}: ${s.weight}kg × ${s.reps}</span>`).join("")}</div>`
        : "";

    const exerciseListHtml = currentTracking.exercises.map((item, idx) => {
        const info = exercises.find(e => e.id === item.id);
        const isCurrent = idx === currentExerciseIndex;
        return `
            <div class="tracking-ex-item${isCurrent ? " current" : idx < currentExerciseIndex ? " done" : ""}">
                <span>${info ? info.name : "Unbekannt"}</span>
                <div class="tracking-ex-item-actions">
                    <button class="ex-icon-btn" onclick="moveExerciseUp(${idx})">↑</button>
                    <button class="ex-icon-btn" onclick="moveExerciseDown(${idx})">↓</button>
                </div>
            </div>
        `;
    }).join("");

    area.innerHTML = `
        <div class="tracking-header">
            <div class="tracking-ex-name">${exInfo ? exInfo.name : "Unbekannt"}</div>
            <div class="tracking-progress">${done + 1} / ${total}</div>
        </div>

        <div class="tracking-input-card">
            <div class="tracking-input-row">
                <div class="tracking-input-group">
                    <label>Gewicht (kg)</label>
                    <input id="trackWeight" type="number" value="${ex.sets.at(-1)?.weight ?? ""}">
                </div>
                <div class="tracking-input-group">
                    <label>Wiederholungen</label>
                    <input id="trackReps" type="number" value="${ex.sets.at(-1)?.reps ?? ""}">
                </div>
            </div>
            <button onclick="saveSet()" style="width:100%; margin:10px 0 0;">Satz speichern</button>
        </div>

        ${setsChips}

        <button onclick="nextExercise()" style="width:100%; margin:0 0 4px; background:#34c759;">Nächste Übung →</button>

        <div class="tracking-timer" onclick="toggleTimer()">
            <span>⏱️</span>
            <span id="timerDisplay">${formatTime(timerSeconds)}</span>
        </div>

        <div class="tracking-exercise-list">${exerciseListHtml}</div>

        ${addExerciseBlock}
    `;
}

// ---------------------------------------------------------
// SAVE SET
// ---------------------------------------------------------
function saveSet() {
    const weight = Number(document.getElementById("trackWeight").value);
    const reps = Number(document.getElementById("trackReps").value);

    if (!weight || !reps) return;

    const exId = currentTracking.exercises[currentExerciseIndex].id;
    const prevPR = getExercisePR(exId);

    currentTracking.exercises[currentExerciseIndex].sets.push({ weight, reps });
    renderTracking();

    if (prevPR > 0 && weight > prevPR) {
        showPRToast(weight);
    }
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

    const durationMs = new Date() - new Date(currentTracking.startTime);
    currentTracking.duration = Math.round(durationMs / 60000);

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

            if (!map[ex.id]) map[ex.id] = { name: exInfo.name, volumeValues: [], bestSetValues: [] };

            if (ex.sets.length > 0) {
                const volume = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
                const bestSet = Math.max(...ex.sets.map(s => s.weight));
                map[ex.id].volumeValues.push(volume);
                map[ex.id].bestSetValues.push(bestSet);
            }
        });
    });

    const result = [];

    Object.keys(map).forEach(id => {
        const entry = map[id];
        const arr = entry.volumeValues;
        const bArr = entry.bestSetValues;

        if (arr.length < 2) return;

        const last = arr[arr.length - 1];
        const prev = arr[arr.length - 2];

        let sum = 0;
        for (let i = 1; i < arr.length; i++) sum += arr[i] - arr[i - 1];
        const avgDiff = sum / (arr.length - 1);

        const recentVols = arr.slice(-3);
        const plateau = arr.length >= 3 && recentVols[recentVols.length - 1] <= recentVols[0];

        const lastBest = bArr[bArr.length - 1];
        const prevBest = bArr.length >= 2 ? bArr.slice(0, -1).reduce((m, v) => v > m ? v : m, 0) : 0;
        const allTimeBest = lastBest > prevBest ? lastBest : prevBest;
        const isPR = bArr.length >= 2 && lastBest > prevBest;

        result.push({
            id,
            name: entry.name,
            lastIncrease: last - prev,
            avgIncrease: avgDiff,
            lastVolume: last,
            count: arr.length,
            values: arr,
            chartValues: bArr,
            lastBest,
            allTimeBest,
            isPR,
            plateau
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

    canvas.width = canvas.offsetWidth || 300;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const labelH = 16;
    const padX = 4;
    const padY = 6;
    const chartH = h - labelH;

    ctx.clearRect(0, 0, w, h);

    if (values.length < 2) {
        ctx.fillStyle = "#e0e0e0";
        ctx.fillRect(padX, chartH / 2, w - padX * 2, 2);
        return;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const getX = i => padX + (i / (values.length - 1)) * (w - padX * 2);
    const getY = v => padY + (1 - (v - min) / range) * (chartH - padY * 2);

    const buildCurve = () => {
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(values[0]));
        for (let i = 1; i < values.length; i++) {
            const x0 = getX(i - 1), y0 = getY(values[i - 1]);
            const x1 = getX(i),     y1 = getY(values[i]);
            const cpX = (x0 + x1) / 2;
            ctx.bezierCurveTo(cpX, y0, cpX, y1, x1, y1);
        }
    };

    // Gradient fill under the curve
    buildCurve();
    ctx.lineTo(getX(values.length - 1), chartH);
    ctx.lineTo(getX(0), chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, chartH);
    grad.addColorStop(0, "rgba(0, 122, 255, 0.22)");
    grad.addColorStop(1, "rgba(0, 122, 255, 0.0)");
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    buildCurve();
    ctx.strokeStyle = "#007aff";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    // Endpoint dot
    const lx = getX(values.length - 1);
    const ly = getY(values[values.length - 1]);
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#007aff";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#999";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${values[0]} kg`, padX, h);
    ctx.textAlign = "right";
    ctx.fillText(`${values[values.length - 1]} kg`, w - padX, h);
}

// ---------------------------------------------------------
// DASHBOARD – INSIGHTS (with collapsible progression)
// ---------------------------------------------------------
let progressionCollapsed = {};

function toggleProgression(id) {
    progressionCollapsed[id] = !progressionCollapsed[id];
    const collapsed = progressionCollapsed[id];
    const div = document.getElementById(`prog_${id}`);
    const arrow = document.getElementById(`arrow-prog_${id}`);
    if (div) div.style.display = collapsed ? "none" : "block";
    if (arrow) arrow.textContent = collapsed ? "▸" : "▾";
    if (!collapsed && div) {
        const canvas = div.querySelector("canvas");
        if (canvas && canvas.dataset.values) {
            drawMiniChart(canvas.id, JSON.parse(canvas.dataset.values));
        }
    }
}

function renderInsights() {
    const box = document.getElementById("insightsBox");

    if (workouts.length === 0) {
        box.innerHTML = `<p style="color:#888;">Noch keine Insights verfügbar.</p>`;
        return;
    }

    const thisWeekCount = getWorkoutsThisWeek().length;
    const lastWeekCount = getWorkoutsLastWeek().length;
    const comparison = weeklyComparisonText(thisWeekCount, lastWeekCount);
    const progression = getExerciseProgression();

    box.innerHTML = `
        <div class="insight-stats-grid">
            <div class="insight-stat-card">
                <div class="insight-stat-value">${thisWeekCount}</div>
                <div class="insight-stat-label">Diese Woche</div>
            </div>
            <div class="insight-stat-card">
                <div class="insight-stat-value">${lastWeekCount}</div>
                <div class="insight-stat-label">Letzte Woche</div>
            </div>
        </div>

        <div class="insight-compare-card">${comparison}</div>

        <div class="progression-card">
            <h3>Progression</h3>
            ${
                progression.length === 0
                ? `<p style="color:#888; margin:0;">Noch keine Progression messbar.</p>`
                : progression.map((p, idx) => {
                    if (progressionCollapsed[p.id] === undefined) {
                        progressionCollapsed[p.id] = false;
                    }
                    const collapsed = progressionCollapsed[p.id];
                    const prBadge = p.isPR ? `<span class="badge-pr">🏆 PR</span>` : "";
                    const plateauBadge = p.plateau ? `<span class="badge-plateau">⚠️ Plateau</span>` : "";

                    return `
                        <h4 onclick="toggleProgression('${p.id}')" class="progression-header">
                            <span>${p.name} ${prBadge}${plateauBadge}</span>
                            <span class="progression-header-controls">
                                <button onclick="showExerciseDetail('${p.id}'); event.stopPropagation();"
                                        style="font-size:12px; padding:3px 8px; margin:0;">Details</button>
                                <span id="arrow-prog_${p.id}">${collapsed ? "▸" : "▾"}</span>
                            </span>
                        </h4>
                        <div id="prog_${p.id}" style="display:${collapsed ? "none" : "block"}; font-size:13px; color:#555; padding:8px 0 4px;">
                            Volumen letzte Steigerung: ${p.lastIncrease > 0 ? "+" : ""}${Math.round(p.lastIncrease)} kg·Wdh<br>
                            Bestes Gewicht: ${p.lastBest} kg${p.allTimeBest > p.lastBest ? ` (Rekord: ${p.allTimeBest} kg)` : ""}<br>
                            (${p.count} Workouts)
                            <canvas id="chart_${idx}" height="75" class="mini-chart-canvas"
                                data-values='${JSON.stringify(p.chartValues)}'></canvas>
                        </div>
                    `;
                }).join("")
            }
        </div>
    `;

    progression.forEach((p, idx) => {
        if (!progressionCollapsed[p.id]) {
            drawMiniChart(`chart_${idx}`, p.chartValues);
        }
    });
}

// ---------------------------------------------------------
// DASHBOARD – WEEKLY HISTORY
// ---------------------------------------------------------
function renderHistoryGrouped() {
    const box = document.getElementById("historyBox");

    if (workouts.length === 0) {
        box.innerHTML = `<p style="color:#888;">Noch keine Workouts gespeichert.</p>`;
        return;
    }

    const groups = groupWorkoutsByWeek();
    const keys = Object.keys(groups).sort().reverse();

    box.innerHTML = keys.map(key => {
        const list = groups[key];
        return `
            <div class="week-box">
                <h3 onclick="toggleCollapse('week_${key}')">
                    ${key} <span id="arrow-week_${key}">▾</span>
                </h3>
                <div id="week_${key}">
                    ${list.map(w => `
                        <div class="history-entry">
                            <strong>${w.plan}</strong> – ${w.date}${w.duration ? ` · ${w.duration} min` : ""}
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }).join("");
}

// ---------------------------------------------------------
// WEEKLY INSIGHT HELPERS
// ---------------------------------------------------------
function getWorkoutsForWeekOf(date) {
    const { year, week } = getISOWeek(date);
    return workouts.filter(w => {
        const wInfo = getISOWeek(w.date);
        return wInfo.year === year && wInfo.week === week;
    });
}

function getWorkoutsThisWeek() {
    return getWorkoutsForWeekOf(new Date());
}

function getWorkoutsLastWeek() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return getWorkoutsForWeekOf(d);
}

function weeklyComparisonText(thisWeek, lastWeek) {
    if (thisWeek === 0 && lastWeek === 0) return "Noch keine Daten vorhanden";
    if (thisWeek > lastWeek) return `+${thisWeek - lastWeek} Trainings mehr als letzte Woche`;
    if (thisWeek < lastWeek) return `${lastWeek - thisWeek} Trainings weniger als letzte Woche`;
    return "Gleich viele Trainings wie letzte Woche";
}

function getWeeklyComparison() {
    return weeklyComparisonText(getWorkoutsThisWeek().length, getWorkoutsLastWeek().length);
}

// ---------------------------------------------------------
// BACKUP CENTER
// ---------------------------------------------------------
function openChangelog() {
    const entriesHtml = CHANGELOG.map(entry => `
        <div class="changelog-entry">
            <div class="changelog-version">v${entry.version}</div>
            <div class="changelog-date">${entry.date}</div>
            <ul class="changelog-notes">
                ${entry.notes.map(n => `<li>${n}</li>`).join("")}
            </ul>
        </div>
    `).join("");

    openPopup(`
        <h2 style="margin-bottom:16px;">📋 Patch Notes</h2>
        ${entriesHtml}
        <button onclick="closePopup()" style="width:100%; margin-top:8px;">Schließen</button>
    `);
}

function openSettingsMenu() {
    const html = `
        <h2>Einstellungen – v${APP_VERSION}</h2>

        <h3>📦 Export / Import</h3>
        <button onclick="exportAll()">📤 Alles exportieren (JSON)</button>
        <input type="file" accept="application/json" onchange="handleImportFile(event)">

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

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadJSON(obj, filename) {
    downloadBlob(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }), filename);
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
            existing = { id: generateId(), name, category };
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
                    id: generateId(),
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
    downloadBlob(new Blob([text], { type: "text/csv" }), filename);
}

// ---------------------------------------------------------
// PERSONAL RECORDS
// ---------------------------------------------------------
function getExercisePR(exerciseId) {
    let maxWeight = 0;
    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            if (ex.id === exerciseId) {
                ex.sets.forEach(s => { if (s.weight > maxWeight) maxWeight = s.weight; });
            }
        });
    });
    return maxWeight;
}

function showPRToast(weight) {
    const existing = document.querySelector(".pr-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "pr-toast";
    toast.textContent = `🏆 Neuer Rekord: ${weight} kg!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ---------------------------------------------------------
// EXERCISE DETAIL VIEW
// ---------------------------------------------------------
function showExerciseDetail(exerciseId) {
    const exInfo = exercises.find(e => e.id === exerciseId);
    const name = exInfo ? exInfo.name : "Unbekannte Übung";
    const pr = getExercisePR(exerciseId);

    const relevant = workouts
        .filter(w => w.exercises.some(ex => ex.id === exerciseId))
        .reverse();

    let html = `
        <h2>${name}</h2>
        <p>🏆 Persönlicher Rekord: <strong>${pr > 0 ? pr + " kg" : "–"}</strong></p>
        <hr>
    `;

    if (relevant.length === 0) {
        html += `<p>Noch keine Einträge vorhanden.</p>`;
    } else {
        relevant.forEach(w => {
            const ex = w.exercises.find(e => e.id === exerciseId);
            const volume = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
            const bestSet = ex.sets.length > 0 ? Math.max(...ex.sets.map(s => s.weight)) : 0;

            html += `
                <div class="history-entry">
                    <strong>${w.date}</strong>${w.plan !== "Freies Training" ? ` – ${w.plan}` : ""}
                    ${w.duration ? ` <span style="color:#888; font-size:13px;">(${w.duration} min)</span>` : ""}
                    <br><small style="color:#666;">Bestes Set: ${bestSet} kg · Volumen: ${volume} kg·Wdh</small>
                    <ul style="margin:4px 0 0 0; padding-left:16px;">
                        ${ex.sets.map((s, i) => `<li>Satz ${i + 1}: ${s.weight} kg × ${s.reps}</li>`).join("")}
                    </ul>
                </div>
            `;
        });
    }

    html += `<button onclick="closePopup()" style="margin-top:20px;">Schließen</button>`;
    openPopup(html);
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
document.getElementById("appVersionText").textContent = "Version " + APP_VERSION;
renderAll();
showPage("dashboard");