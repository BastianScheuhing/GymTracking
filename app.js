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

    workouts.forEach((w, index) => {
        list.innerHTML += `
            <li onclick="showWorkoutDetails(${index})">
                <div>
                    <strong>${w.plan}</strong><br>
                    ${w.date}
                </div>
                <span>${w.exercises.length} Übungen</span>
            </li>
        `;
    });
}

function showWorkoutDetails(index) {
    const w = workouts[index];
    const details = document.getElementById("overviewDetails");

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
    const name = document.getElementById("newCategory").value;
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
    const name = document.getElementById("exerciseName").value;
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
    const name = document.getElementById("planName").value;
    if (!name) return;

    plans.push({ name, exercises: [] });
    document.getElementById("planName").value = "";
    save();
    renderPlans();
}

function deletePlan(i) {
    plans.splice(i, 1);
    save();
    renderPlans();
}

function addExerciseToPlan(planIndex) {
    const select = document.getElementById("planAdd_" + planIndex);
    const exerciseName = select.value;

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
            <li>
                <div style="width:100%;">
                    <strong>${p.name}</strong>

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

                <button class="delete-btn" onclick="deletePlan(${i})">×</button>
            </li>
        `;

        select.innerHTML += `<option value="${i}">${p.name}</option>`;
    });
}

// -----------------------------
// TRACKING
// -----------------------------
let currentTracking = null;
let currentExerciseIndex = 0;

// TIMER
let timerInterval = null;
let timerSeconds = 0;

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 0;
        renderTracking();
        return;
    }

    timerInterval = setInterval(() => {
        timerSeconds++;
        document.getElementById("timerDisplay").innerText = formatTime(timerSeconds);
    }, 1000);
}

function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    if (planIndex === "") return;

    const plan = plans[planIndex];

    currentTracking = {
        plan: plan.name,
        date: new Date().toISOString().split("T")[0],
        note: "",
        exercises: plan.exercises.map(name => ({
            name,
            sets: []
        }))
    };

    currentExerciseIndex = 0;
    timerSeconds = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

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
// EDIT MODE
// -----------------------------
function editExercise(index) {
    const ex = currentTracking.exercises[index];

    let html = `<h3>${ex.name} bearbeiten</h3>`;

    ex.sets.forEach((s, i) => {
        html += `
            <div class="edit-box">
                <label>Satz ${i + 1}</label><br>
                <input id="editWeight_${i}" type="number" value="${s.weight}" /> kg
                <input id="editReps_${i}" type="number" value="${s.reps}" /> Wdh
                <button onclick="deleteSet(${index}, ${i})">🗑️</button>
            </div>
        `;
    });

    html += `
        <button onclick="saveEditedExercise(${index})">Speichern</button>
        <button onclick="renderTracking()">Abbrechen</button>
    `;

    document.getElementById("trackingArea").innerHTML = html;
}

function deleteSet(exIndex, setIndex) {
    currentTracking.exercises[exIndex].sets.splice(setIndex, 1);
    editExercise(exIndex);
}

function saveEditedExercise(index) {
    const ex = currentTracking.exercises[index];

    ex.sets = ex.sets.map((s, i) => ({
        weight: Number(document.getElementById(`editWeight_${i}`).value),
        reps: Number(document.getElementById(`editReps_${i}`).value)
    }));

    renderTracking();
}

// -----------------------------
// TRACKING RENDER
// -----------------------------
function renderTracking() {
    const area = document.getElementById("trackingArea");

    if (!currentTracking) {
        area.innerHTML = "";
        return;
    }

    const total = currentTracking.exercises.length;
    const done = currentExerciseIndex;

    // Nur Übungen anzeigen, die NICHT im Workout sind
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
                <button onclick="editExercise(${idx})">✏️</button>
                <ul>${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}</ul>
            </li>
        `)
        .join("");

    // -------------------------------------
    // LETZTE ÜBUNG
    // -------------------------------------
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

            <div class="timer-box" onclick="toggleTimer()">
                <span class="timer-icon">⏱️</span>
                <span id="timerDisplay">${formatTime(timerSeconds)}</span>
            </div>
        `;
        return;
    }

    const ex = currentTracking.exercises[currentExerciseIndex];

    area.innerHTML = `
        <h3>${ex.name}</h3>
        <p>${done} von ${total} Übungen erledigt</p>

        <div class="timer-box" onclick="toggleTimer()">
            <span class="timer-icon">⏱️</span>
            <span id="timerDisplay">${formatTime(timerSeconds)}</span>
        </div>

        <label>Gewicht (kg)</label>
        <input id="trackWeight" type="number" value="${ex.sets.at(-1)?.weight ?? ''}" />

        <label>Wiederholungen</label>
        <input id="trackReps" type="number" value="${ex.sets.at(-1)?.reps ?? ''}" />

        <button onclick="saveSet()">Satz speichern</button>

        <button onclick="nextExercise()" style="margin-top:20px;">Nächste Übung</button>

        <h4>Bisherige Sätze:</h4>
        <ul>
            ${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}
        </ul>

        <div class="optional-box">
            <h4>Übung zum Workout hinzufügen</h4>
            <select id="addExerciseToWorkoutSelect" ${canAddExercise ? "" : "disabled"}>
                ${exerciseOptions}
            </select>
            <button onclick="addExerciseToCurrentWorkout()" ${canAddExercise ? "" : "disabled"}>
                Hinzufügen
            </button>
        </div>

        <h4>Vorherige Übungen:</h4>
        <ul>${previousExercises}</ul>
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
    if (note) currentTracking.note = note;
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
