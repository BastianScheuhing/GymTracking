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

function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    if (planIndex === "") return;

    const plan = plans[planIndex];

    currentTracking = {
        plan: plan.name,
        date: new Date().toISOString().split("T")[0],
        exercises: plan.exercises.map(name => ({
            name,
            sets: []
        }))
    };

    currentExerciseIndex = 0;
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

function renderTracking() {
    const area = document.getElementById("trackingArea");

    if (!currentTracking) {
        area.innerHTML = "";
        return;
    }

    const total = currentTracking.exercises.length;
    const done = currentExerciseIndex;

    // Dropdown für freie Übungsauswahl
    const exerciseOptions = exercises
        .map(ex => `<option value="${ex.name}">${ex.name}</option>`)
        .join("");

    // Liste bisheriger Übungen
    const previousExercises = currentTracking.exercises
        .slice(0, currentExerciseIndex)
        .map(ex => `
            <li>
                <strong>${ex.name}</strong>
                <ul>${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}</ul>
            </li>
        `)
        .join("");

    if (currentExerciseIndex >= total) {
        area.innerHTML = `
            <h3>Workout abgeschlossen?</h3>
            <button onclick="finishWorkout()">Workout beenden</button>
        `;
        return;
    }

    const ex = currentTracking.exercises[currentExerciseIndex];

    area.innerHTML = `
        <h3>${ex.name}</h3>
        <p>${done} von ${total} Übungen erledigt</p>

        <label>Gewicht (kg)</label>
        <input id="trackWeight" type="number" />

        <label>Wiederholungen</label>
        <input id="trackReps" type="number" />

        <button onclick="saveSet()">Satz speichern</button>

        <h4>Bisherige Sätze:</h4>
        <ul>
            ${ex.sets.map(s => `<li>${s.weight}kg × ${s.reps}</li>`).join("")}
        </ul>

        <h4>Vorherige Übungen:</h4>
        <ul>${previousExercises}</ul>

        <h4>Übung zum Workout hinzufügen</h4>
        <select id="addExerciseToWorkoutSelect">${exerciseOptions}</select>
        <button onclick="addExerciseToCurrentWorkout()">Hinzufügen</button>

        <button onclick="nextExercise()">Nächste Übung</button>
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

function finishWorkout() {
    workouts.push(currentTracking);
    save();
    currentTracking = null;
    currentExerciseIndex = 0;
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
