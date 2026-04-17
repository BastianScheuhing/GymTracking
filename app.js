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
    list.innerHTML = "";

    workouts.forEach(w => {
        list.innerHTML += `
            <li>
                <div>
                    <strong>${w.plan}</strong><br>
                    ${w.date}
                </div>
            </li>
        `;
    });
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
    save();
    renderExercises();
}

function deleteExercise(i) {
    exercises.splice(i, 1);
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
}

// -----------------------------
// PLÄNE
// -----------------------------
function createPlan() {
    const name = document.getElementById("planName").value;
    if (!name) return;

    plans.push({ name, exercises: [] });
    save();
    renderPlans();
}

function deletePlan(i) {
    plans.splice(i, 1);
    save();
    renderPlans();
}

function renderPlans() {
    const list = document.getElementById("planList");
    const select = document.getElementById("trackingPlanSelect");

    list.innerHTML = "";
    select.innerHTML = "";

    plans.forEach((p, i) => {
        list.innerHTML += `
            <li>
                ${p.name}
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

function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    const plan = plans[planIndex];

    currentTracking = {
        plan: plan.name,
        date: new Date().toISOString().split("T")[0],
        exercises: [...plan.exercises]
    };

    renderTracking();
}

function renderTracking() {
    const list = document.getElementById("trackingExerciseList");
    list.innerHTML = "";

    if (!currentTracking) return;

    currentTracking.exercises.forEach(ex => {
        list.innerHTML += `<li>${ex}</li>`;
    });
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
