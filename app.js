// -----------------------------
// DATA STORAGE
// -----------------------------
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
let plans = JSON.parse(localStorage.getItem("plans")) || [];
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function save() {
    localStorage.setItem("exercises", JSON.stringify(exercises));
    localStorage.setItem("plans", JSON.stringify(plans));
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

// -----------------------------
// EXERCISES
// -----------------------------
function addExercise() {
    const name = document.getElementById("exerciseName").value;
    const category = document.getElementById("exerciseCategory").value;

    if (!name) return;

    exercises.push({ name, category });
    save();
    renderExercises();
}

function deleteExercise(index) {
    exercises.splice(index, 1);
    save();
    renderExercises();
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

    renderPlanSelect();
}

// -----------------------------
// PLANS
// -----------------------------
function createPlan() {
    const name = document.getElementById("planName").value;
    if (!name) return;

    plans.push({ name, exercises: [] });
    save();
    renderPlans();
}

function addExerciseToPlan(planIndex, exerciseName) {
    plans[planIndex].exercises.push(exerciseName);
    save();
    renderPlans();
}

function deletePlan(index) {
    plans.splice(index, 1);
    save();
    renderPlans();
}

function removeExerciseFromPlan(planIndex, exName) {
    plans[planIndex].exercises = plans[planIndex].exercises.filter(e => e !== exName);
    save();
    renderPlans();
}

function renderPlans() {
    const list = document.getElementById("planList");
    list.innerHTML = "";

    plans.forEach((p, i) => {
        list.innerHTML += `
            <li>
                <strong>${p.name}</strong>
                <button class="delete-btn" onclick="deletePlan(${i})">×</button>
            </li>

            <div style="margin-top:10px;">
                <select id="addToPlan_${i}">
                    ${exercises.map(ex => `<option>${ex.name}</option>`).join("")}
                </select>
                <button onclick="addExerciseToPlan(${i}, document.getElementById('addToPlan_${i}').value)">Hinzufügen</button>
            </div>

            <ul>
                ${p.exercises.map(ex => `
                    <li>
                        ${ex}
                        <button class="delete-btn" onclick="removeExerciseFromPlan(${i}, '${ex}')">×</button>
                    </li>
                `).join("")}
            </ul>
        `;
    });

    renderPlanSelect();
}

// -----------------------------
// WORKOUT START
// -----------------------------
let currentWorkout = null;
let currentExerciseIndex = 0;
let currentSetIndex = 1;

function renderPlanSelect() {
    const select = document.getElementById("planSelect");
    select.innerHTML = plans.map((p, i) => `<option value="${i}">${p.name}</option>`).join("");
}

function startWorkout() {
    const planIndex = document.getElementById("planSelect").value;
    const dateInput = document.getElementById("workoutDate");

    if (!dateInput.value) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }

    const plan = plans[planIndex];

    currentWorkout = {
        plan: plan.name,
        date: dateInput.value,
        exercises: plan.exercises.map(name => ({
            name,
            sets: []
        }))
    };

    currentExerciseIndex = 0;
    currentSetIndex = 1;

    openNextExercise();
}

// -----------------------------
// BOTTOM SHEET LOGIC
// -----------------------------
const sheet = document.getElementById("bottomSheet");
const sheetTitle = document.getElementById("sheetTitle");
const sheetLastSet = document.getElementById("sheetLastSet");
const sheetWeight = document.getElementById("sheetWeight");
const sheetReps = document.getElementById("sheetReps");

function openSheet() {
    sheet.classList.remove("hidden");
}

function closeSheet() {
    sheet.classList.add("hidden");
}

function openNextExercise() {
    if (currentExerciseIndex >= currentWorkout.exercises.length) {
        finishWorkout();
        return;
    }

    const ex = currentWorkout.exercises[currentExerciseIndex];

    const last = getLastSet(ex.name);

    sheetTitle.textContent = `${ex.name} – Satz ${currentSetIndex}`;
    sheetLastSet.textContent = last ? `Letzter Satz: ${last.weight}kg × ${last.reps}` : "Kein letzter Satz vorhanden";

    sheetWeight.value = last ? last.weight : "";
    sheetReps.value = last ? last.reps : "";

    openSheet();
}

function getLastSet(exName) {
    const history = workouts
        .filter(w => w.plan === currentWorkout.plan)
        .sort((a, b) => b.date.localeCompare(a.date));

    for (const w of history) {
        const ex = w.exercises.find(e => e.name === exName);
        if (ex && ex.sets.length > 0) {
            return ex.sets[ex.sets.length - 1];
        }
    }
    return null;
}

// -----------------------------
// SET HANDLING
// -----------------------------
function saveSet() {
    const weight = Number(sheetWeight.value);
    const reps = Number(sheetReps.value);

    if (!weight || !reps) return;

    currentWorkout.exercises[currentExerciseIndex].sets.push({ weight, reps });

    closeSheet();

    setTimeout(() => {
        askNextSet();
    }, 200);
}

function skipSet() {
    closeSheet();
    currentExerciseIndex++;
    currentSetIndex = 1;

    setTimeout(() => {
        openNextExercise();
    }, 200);
}

function askNextSet() {
    const doMore = confirm("Weiteren Satz machen?");
    if (doMore) {
        currentSetIndex++;
        openNextExercise();
    } else {
        currentExerciseIndex++;
        currentSetIndex = 1;
        openNextExercise();
    }
}

// -----------------------------
// FINISH WORKOUT
// -----------------------------
function finishWorkout() {
    workouts.push(currentWorkout);
    save();
    alert("Workout gespeichert!");
    renderHistory();
}

// -----------------------------
// HISTORY
// -----------------------------
function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    const grouped = {};

    workouts.forEach(w => {
        if (!grouped[w.date]) grouped[w.date] = [];
        grouped[w.date].push(w);
    });

    Object.keys(grouped)
        .sort()
        .forEach(date => {
            list.innerHTML += `<li><strong>${date}</strong></li>`;

            grouped[date].forEach(w => {
                w.exercises.forEach(ex => {
                    list.innerHTML += `
                        <div class="day-group">
                            <strong>${ex.name}</strong>
                            <ul>
                                ${ex.sets.map(s => `
                                    <li>
                                        ${s.weight}kg × ${s.reps}
                                        <button class="delete-btn" onclick="deleteSetFromHistory('${date}', '${ex.name}', ${s.weight}, ${s.reps})">×</button>
                                    </li>
                                `).join("")}
                            </ul>
                        </div>
                    `;
                });
            });
        });
}

function deleteSetFromHistory(date, exName, weight, reps) {
    workouts = workouts.map(w => {
        if (w.date !== date) return w;

        w.exercises.forEach(ex => {
            if (ex.name === exName) {
                ex.sets = ex.sets.filter(s => !(s.weight === weight && s.reps === reps));
            }
        });

        return w;
    });

    save();
    renderHistory();
}

// -----------------------------
// DELETE ALL DATA
// -----------------------------
function deleteAllData() {
    const confirmDelete = confirm("Willst du wirklich ALLES löschen? Übungen, Pläne und Workouts werden unwiderruflich entfernt.");

    if (!confirmDelete) return;

    exercises = [];
    plans = [];
    workouts = [];

    save();

    renderExercises();
    renderPlans();
    renderHistory();

    alert("Alle Daten wurden gelöscht.");
}

// -----------------------------
// SWIPE DOWN TO CLOSE SHEET
// -----------------------------
let startY = 0;

sheet.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

sheet.addEventListener("touchmove", e => {
    const diff = e.touches[0].clientY - startY;
    if (diff > 80) {
        closeSheet();
    }
});

// Initial render
renderExercises();
renderPlans();
renderHistory();
