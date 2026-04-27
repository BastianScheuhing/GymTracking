// ---------------------------------------------------------
// VERSION
// ---------------------------------------------------------
const APP_VERSION = "2.9";

const CHANGELOG = [
    {
        version: "2.9",
        date: "2026-04-27",
        notes: [
            "Muskelkarte mit anatomisch realistischeren SVG-Formen (Bezier-Kurven)",
            "Bizeps und Trizeps als separate Muskelgruppen (Vorder-/Rückseite)",
            "Antippen einer Muskelgruppe zeigt Name und Satzanzahl als Tooltip",
            "Muskelstatistik unter der Karte zeigt trainierte Gruppen dieser Woche",
            "Übung im Tracking nur per vollständigem Wischen löschbar (75% der Breite)",
            "Zoom auf Mobilgeräten wieder deaktiviert"
        ]
    },
    {
        version: "1.2.8",
        date: "2026-04-25",
        notes: [
            "Workout aus Historie als Vorlage für neues Training verwenden (▶️ Button)",
            "Übung im aktiven Workout per Links-Wischen entfernen"
        ]
    },
    {
        version: "1.2.7",
        date: "2026-04-25",
        notes: [
            "Pause-Timer läuft korrekt weiter wenn der Bildschirm gesperrt ist",
            "Anzeige nach Timer-Ablauf: zeigt wie lange die Pause bereits überschritten ist",
            "Drag & Drop im Tracking setzt verschobene Übung direkt als aktive Übung"
        ]
    },
    {
        version: "1.2.6",
        date: "2026-04-25",
        notes: [
            "Muskelkarte zum Dashboard hinzugefügt"
        ]
    },
    {
        version: "1.2.5",
        date: "2026-04-24",
        notes: [
            "Pause-Timer startet automatisch nach jedem gespeicherten Satz (1 min / 2 min / 3 min / Aus)",
            "Timer-Dauer während laufendem Countdown direkt umschaltbar",
            "Geschätzte verbleibende Trainingszeit im Tracking-Header",
            "Übungen per Drag & Drop neu sortierbar (⁝ Handle)",
            "Schnell-Buttons für Gewicht (−5 / −2.5 / +2.5 / +5 kg)",
            "Schnell-Buttons für Wiederholungen (−1 / +1 / +2 / +5)"
        ]
    },
    {
        version: "1.2.4",
        date: "2026-04-24",
        notes: [
            "Seitenübergänge mit sanfter Fade-Animation",
            "Übungen im Tracking gleiten beim Hinzufügen ein",
            "Satz-Chips erscheinen mit Pop-Animation",
            "Dashboard-Statistiken zählen beim Öffnen hoch",
            "Konfetti-Feier beim Abschließen aller Übungen",
            "Historien- und Übungslisten mit gestaffeltem Fade-In",
            "Aktive Navigation mit animiertem Punkt-Indikator",
            "Letzte-Einheit-Hinweis während Tracking zeigt vorherige Sätze",
            "Satz-Chips nach links wischen zum Löschen"
        ]
    },
    {
        version: "1.2.3",
        date: "2026-04-23",
        notes: [
            "🏆 Neue Bestleistungen diesen Monat auf Dashboard",
            "Geschätztes 1RM in Übungs-Detailansicht (Epley-Formel)",
            "Erweiterte Übungs-Charts mit Gewicht/1RM Tabs und Datumslabeln"
        ]
    },
    {
        version: "1.2.2",
        date: "2026-04-23",
        notes: [
            "Pläne öffnen automatisch nach Erstellung und bleiben bei Übungs-Hinzufügen offen",
            "Kategorie-Filter und Suchfunktion im Übungs-Dropdown für Pläne",
            "Nur nicht hinzugefügte Übungen im Plan-Dropdown angezeigt",
            "Kategorien in Plänen mit Checkmark (✓) markiert, wenn alle Übungen hinzugefügt",
            "Übungs-Kategorien im Übungen-Tab sind jetzt kollapsierbar",
            "Pläne können umbenannt werden (✏️ Button)",
            "Modernisiertes Popup-Design mit Animationen und besseren Buttons",
            "Workout-Editor überarbeitet mit modernem Design",
            "Übungen können zu bereits beendeten Workouts hinzugefügt werden",
            "Notizen von Workouts im Editor bearbeitbar",
            "Zoom auf Mobile-Geräten deaktiviert für bessere App-Erfahrung",
        ]
    },
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
// DASHBOARD CONFIG
// ---------------------------------------------------------
const DASHBOARD_SECTIONS = [
    { key: "stats",         label: "Wochenstatistik" },
    { key: "comparison",    label: "Wochenvergleich" },
    { key: "muscleMap",     label: "Muskelkarte" },
    { key: "volume",        label: "Sätze diese Woche" },
    { key: "monthlyPRs",    label: "Bestleistungen diesen Monat" },
    { key: "allTimePRs",    label: "Bestleistungen aller Zeiten" },
    { key: "progression",   label: "Progression" },
    { key: "weeklyHistory", label: "Wochenübersicht" },
    { key: "calendar",      label: "Kalender" },
];
const DASHBOARD_DEFAULTS = {
    stats: true, comparison: true, muscleMap: true, volume: true,
    monthlyPRs: true, allTimePRs: true, progression: true,
    weeklyHistory: true, calendar: true
};

const MUSCLE_GROUPS = [
    { id: "chest",      label: "Brust" },
    { id: "shoulders",  label: "Schultern" },
    { id: "biceps",     label: "Bizeps" },
    { id: "triceps",    label: "Trizeps" },
    { id: "forearms",   label: "Unterarme" },
    { id: "abs",        label: "Bauch" },
    { id: "back",       label: "Rücken" },
    { id: "legs",       label: "Oberschenkel" },
    { id: "hamstrings", label: "Beinbeuger" },
    { id: "glutes",     label: "Gesäß" },
    { id: "calves",     label: "Waden" },
];

const MUSCLE_MAP_DEFAULTS = {
    "Brust":      ["chest"],
    "Schultern":  ["shoulders"],
    "Bizeps":     ["biceps"],
    "Trizeps":    ["triceps"],
    "Unterarme":  ["forearms"],
    "Rücken":     ["back"],
    "Bauch":      ["abs"],
    "Core":       ["abs"],
    "Beine":      ["legs", "hamstrings"],
    "Quadrizeps": ["legs"],
    "Beinbeuger": ["hamstrings"],
    "Gesäß":      ["glutes"],
    "Waden":      ["calves"],
};

function loadMuscleMapping() {
    const saved = localStorage.getItem("muscleCategoryMap");
    const mapping = saved ? JSON.parse(saved) : { ...MUSCLE_MAP_DEFAULTS };
    for (const cat of Object.keys(mapping)) {
        if (mapping[cat].includes("arms")) {
            mapping[cat] = mapping[cat].filter(m => m !== "arms").concat(["biceps", "triceps"]);
        }
    }
    return mapping;
}
let dashboardConfig = { ...DASHBOARD_DEFAULTS, ...JSON.parse(localStorage.getItem("dashboardConfig") || "{}") };
let dashboardOrder  = (() => {
    const saved = JSON.parse(localStorage.getItem("dashboardOrder") || "null");
    const keys  = DASHBOARD_SECTIONS.map(s => s.key);
    if (saved && saved.length === keys.length && keys.every(k => saved.includes(k))) return saved;
    return keys;
})();

function saveDashboardConfig() {
    localStorage.setItem("dashboardConfig", JSON.stringify(dashboardConfig));
}

function toggleDashboardSection(key, value) {
    dashboardConfig[key] = value;
    saveDashboardConfig();
    renderDashboard();
}

function moveDashboardSection(key, dir) {
    const idx = dashboardOrder.indexOf(key);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= dashboardOrder.length) return;
    [dashboardOrder[idx], dashboardOrder[newIdx]] = [dashboardOrder[newIdx], dashboardOrder[idx]];
    localStorage.setItem("dashboardOrder", JSON.stringify(dashboardOrder));
    renderDashboard();
    openDashboardSettings();
}

function openDashboardSettings() {
    const last = dashboardOrder.length - 1;
    const rows = dashboardOrder.map((key, idx) => {
        const section = DASHBOARD_SECTIONS.find(s => s.key === key);
        if (!section) return "";
        return `
            <div class="dash-toggle-row">
                <div class="dash-order-btns">
                    <button class="dash-order-btn" onclick="moveDashboardSection('${key}',-1)" ${idx === 0    ? "disabled" : ""}>↑</button>
                    <button class="dash-order-btn" onclick="moveDashboardSection('${key}', 1)" ${idx === last ? "disabled" : ""}>↓</button>
                </div>
                <span class="dash-toggle-label">${section.label}</span>
                <label class="toggle-switch">
                    <input type="checkbox" ${dashboardConfig[key] !== false ? "checked" : ""}
                        onchange="toggleDashboardSection('${key}', this.checked)">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        `;
    }).join("");

    openPopup(`
        <p style="color:#888; font-size:13px; margin:0 0 16px;">Reihenfolge ändern oder Bereiche ein-/ausblenden.</p>
        ${rows}
        <div class="popup-footer" style="margin-top:16px;">
            <button onclick="closePopup()" style="width:100%;">Fertig</button>
        </div>
    `, "Dashboard anpassen");
}

// ---------------------------------------------------------
// DATA (with ID support)
// ---------------------------------------------------------
let categories = JSON.parse(localStorage.getItem("categories")) || ["Brust", "Rücken", "Beine"];
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
let plans = JSON.parse(localStorage.getItem("plans")) || [];
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// O(1) lookup index over `exercises`. Refreshed inside save() and after migrations.
let exerciseById = new Map();
function rebuildExerciseIndex() {
    exerciseById = new Map(exercises.map(e => [e.id, e]));
}

// ---------------------------------------------------------
// ID GENERATOR
// ---------------------------------------------------------
function generateId(prefix = "ex") {
    return prefix + "_" + Math.random().toString(36).substring(2, 10);
}

// Escape user-provided strings before interpolating into innerHTML, attribute values, or
// HTML text. Without this, an exercise / plan / category name (or imported backup) containing
// `<`, `&`, or `"` could break the page or inject markup.
function esc(str) {
    if (str == null) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------
// ANIMATION UTILITIES
// ---------------------------------------------------------
function animateCountUp(el, target, duration = 700) {
    if (target === 0) { el.textContent = "0"; return; }
    const start = Date.now();
    const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function showConfetti() {
    const emojis = ["💪", "🏆", "🔥", "⭐", "✨", "🎉"];
    for (let i = 0; i < 14; i++) {
        const el = document.createElement("div");
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = [
            "position:fixed",
            `font-size:${18 + Math.random() * 14}px`,
            `left:${5 + Math.random() * 90}%`,
            "top:60%",
            "z-index:9998",
            "pointer-events:none",
            `animation:confettiFly 0.9s ease-out ${i * 0.055}s both`
        ].join(";");
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1100 + i * 55);
    }
}

// ---------------------------------------------------------
// HAPTIC
// ---------------------------------------------------------
function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

// ---------------------------------------------------------
// VOLUME PER CATEGORY
// ---------------------------------------------------------
function getVolumeByCategory() {
    const vol = {};
    getWorkoutsThisWeek().forEach(w => {
        w.exercises.forEach(ex => {
            const info = exerciseById.get(ex.id);
            if (!info) return;
            vol[info.category] = (vol[info.category] || 0) + ex.sets.length;
        });
    });
    return vol;
}

// ---------------------------------------------------------
// ALL-TIME PRs
// ---------------------------------------------------------
let allTimePRsCollapsed = true;

function toggleAllTimePRs() {
    allTimePRsCollapsed = !allTimePRsCollapsed;
    const list  = document.getElementById("all-time-pr-list");
    const arrow = document.getElementById("arrow-all-time-prs");
    if (list)  list.style.display  = allTimePRsCollapsed ? "none" : "block";
    if (arrow) arrow.textContent   = allTimePRsCollapsed ? "▸" : "▾";
}

function getAllTimePRs() {
    const prMap = {};
    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            ex.sets.forEach(s => {
                if (s.weight > 0 && (!prMap[ex.id] || s.weight > prMap[ex.id].weight)) {
                    prMap[ex.id] = { weight: s.weight, reps: s.reps };
                }
            });
        });
    });
    return Object.entries(prMap).map(([id, pr]) => {
        const info = exerciseById.get(id);
        return info ? { id, name: info.name, category: info.category, ...pr } : null;
    }).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------
// WORKOUT CALENDAR
// ---------------------------------------------------------
let calendarYear  = new Date().getFullYear();
let calendarMonth = new Date().getMonth();

function calendarPrev() {
    if (--calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
    renderDashboard();
}

function calendarNext() {
    if (++calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
    renderDashboard();
}

function calendarDayClick(dateStr) {
    showPage("history");
    const idx = workouts.findIndex(w => w.date === dateStr);
    if (idx >= 0) setTimeout(() => showWorkoutDetails(idx), 80);
}

function getLastSessionData(exId) {
    for (let i = workouts.length - 1; i >= 0; i--) {
        const ex = workouts[i].exercises.find(e => e.id === exId);
        if (ex && ex.sets.length > 0) {
            return { date: workouts[i].date, sets: ex.sets };
        }
    }
    return null;
}

function addSetChipSwipeListeners() {
    document.querySelectorAll(".tracking-sets .set-chip[data-set-index]").forEach(chip => {
        let startX = 0;

        chip.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            chip.style.transition = "none";
        }, { passive: true });

        chip.addEventListener("touchmove", e => {
            const dx = e.touches[0].clientX - startX;
            if (dx < 0) {
                e.preventDefault();
                chip.style.transform = `translateX(${Math.max(dx, -80)}px)`;
                const pct = Math.min(Math.abs(dx) / 60, 1);
                chip.style.background = `rgb(${Math.round(240 + 15 * pct)}, ${Math.round(240 - 180 * pct)}, ${Math.round(245 - 215 * pct)})`;
                chip.style.color = pct > 0.5 ? "#fff" : "";
            }
        }, { passive: false });

        chip.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].clientX - startX;
            if (dx < -50) {
                chip.style.transition = "transform 0.18s ease, opacity 0.18s ease";
                chip.style.transform = "translateX(-130px)";
                chip.style.opacity = "0";
                setTimeout(() => {
                    const idx = parseInt(chip.dataset.setIndex);
                    currentTracking.exercises[currentExerciseIndex].sets.splice(idx, 1);
                    renderTracking();
                }, 180);
            } else {
                chip.style.transition = "transform 0.2s ease, background 0.2s ease, color 0.2s ease";
                chip.style.transform = "translateX(0)";
                chip.style.background = "";
                chip.style.color = "";
            }
        });
    });
}

function addExerciseItemSwipeListeners() {
    document.querySelectorAll(".tracking-ex-item").forEach(item => {
        let startX = 0;
        let itemW = 0;

        item.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            itemW  = item.offsetWidth;
            item.style.transition = "none";
        }, { passive: true });

        item.addEventListener("touchmove", e => {
            const dx = e.touches[0].clientX - startX;
            if (dx < 0) {
                e.preventDefault();
                const clamped = Math.max(dx, -itemW);
                item.style.transform = `translateX(${clamped}px)`;
                const pct = Math.min(Math.abs(dx) / itemW, 1);
                item.style.background = `rgb(255, ${Math.round(59 - 59 * pct)}, ${Math.round(48 - 48 * pct)})`;
                item.style.color = pct > 0.3 ? "#fff" : "";
            }
        }, { passive: false });

        item.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].clientX - startX;
            if (dx < -(itemW * 0.75)) {
                item.style.transition = "transform 0.18s ease, opacity 0.18s ease";
                item.style.transform = `translateX(-${itemW + 20}px)`;
                item.style.opacity = "0";
                setTimeout(() => {
                    deleteTrackingExercise(parseInt(item.dataset.idx));
                }, 180);
            } else {
                item.style.transition = "transform 0.22s ease, background 0.22s ease, color 0.22s ease";
                item.style.transform = "translateX(0)";
                item.style.background = "";
                item.style.color = "";
            }
        });
    });
}

function deleteTrackingExercise(idx) {
    currentTracking.exercises.splice(idx, 1);
    if (idx < currentExerciseIndex) {
        currentExerciseIndex--;
    } else if (idx === currentExerciseIndex) {
        currentExerciseIndex = Math.min(currentExerciseIndex, currentTracking.exercises.length - 1);
    }
    renderTracking();
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
rebuildExerciseIndex();


// ---------------------------------------------------------
// SAVE
// ---------------------------------------------------------
function save() {
    try {
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("exercises", JSON.stringify(exercises));
        localStorage.setItem("plans", JSON.stringify(plans));
        localStorage.setItem("workouts", JSON.stringify(workouts));
        rebuildExerciseIndex();
    } catch (err) {
        console.error("save() failed:", err);
        const isQuota = err && (err.name === "QuotaExceededError" || err.code === 22);
        showErrorToast(isQuota
            ? "⚠️ Speicher voll – bitte Daten exportieren und alte Workouts löschen"
            : "⚠️ Speichern fehlgeschlagen – Daten könnten verloren gehen");
    }
}

function showErrorToast(message) {
    const existing = document.querySelector(".error-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "error-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// ---------------------------------------------------------
// POPUP SYSTEM
// ---------------------------------------------------------
function openPopup(html, title = "") {
    const overlay = document.getElementById("popupOverlay");

    let content = html;
    let hasHeader = title || (html.includes("<h3>") || html.includes("<h2>"));

    if (hasHeader && title) {
        const headerMatch = html.match(/<h[23]>[^<]*<\/h[23]>/);
        if (headerMatch) {
            content = html.replace(headerMatch[0], "");
            title = headerMatch[0].replace(/<\/?h[23]>/g, "");
        }
    }

    overlay.innerHTML = `
        <div class="popup-box">
            ${hasHeader ? `
            <div class="popup-header">
                <h3>${title || ""}</h3>
                <button class="popup-close-btn" onclick="closePopup()">×</button>
            </div>
            ` : ""}
            <div class="popup-content">
                ${content}
            </div>
        </div>
    `;
    overlay.style.display = "flex";
}

function closePopup() {
    const overlay = document.getElementById("popupOverlay");
    overlay.style.display = "none";
    overlay.innerHTML = "";
}

// Promise-based replacements for native confirm()/alert() so dialogs match the app's popup design
// (better on iOS, can't be blocked, supports markup).
function confirmDialog({
    message,
    title = "Bestätigen",
    confirmLabel = "OK",
    cancelLabel = "Abbrechen",
    danger = false
} = {}) {
    return new Promise(resolve => {
        const safeMsg = esc(message).replace(/\n/g, "<br>");
        const confirmStyle = danger ? "background:#ff3b30; color:#fff;" : "";
        openPopup(`
            <p style="margin:0 0 18px; line-height:1.45;">${safeMsg}</p>
            <div class="popup-footer">
                <button id="__confirmCancel">${esc(cancelLabel)}</button>
                <button id="__confirmOk" style="${confirmStyle}">${esc(confirmLabel)}</button>
            </div>
        `, title);
        document.getElementById("__confirmCancel").onclick = () => { closePopup(); resolve(false); };
        document.getElementById("__confirmOk").onclick     = () => { closePopup(); resolve(true);  };
    });
}

function alertDialog(message, title = "") {
    return new Promise(resolve => {
        const safeMsg = esc(message).replace(/\n/g, "<br>");
        openPopup(`
            <p style="margin:0 0 18px; line-height:1.45;">${safeMsg}</p>
            <div class="popup-footer">
                <button id="__alertOk" style="width:100%;">OK</button>
            </div>
        `, title);
        document.getElementById("__alertOk").onclick = () => { closePopup(); resolve(); };
    });
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

// Per-render memo cache. Filled while building the dashboard, cleared after.
// Lets `getWorkoutsThisWeek` / `getWorkoutsLastWeek` skip re-filtering all workouts
// on the 2nd/3rd call within the same render.
let dashboardCache = null;

function renderDashboard() {
    dashboardCache = {};
    try {
        const sections = buildDashboardSections();
        document.getElementById("dashboardContent").innerHTML =
            dashboardOrder.map(k => sections[k] || "").join("");
        afterDashboardRender();
    } finally {
        dashboardCache = null;
    }
}

function afterDashboardRender() {
    document.querySelectorAll("#dashboardContent .stat-num").forEach(el => {
        animateCountUp(el, parseInt(el.dataset.target));
    });
    document.querySelectorAll("#dashboardContent canvas.mini-chart-canvas").forEach(canvas => {
        if (canvas.dataset.values) drawMiniChart(canvas.id, JSON.parse(canvas.dataset.values));
    });
}

// ---------------------------------------------------------
// MUSCLE MAP
// ---------------------------------------------------------
function getMuscleHeatColor(sets) {
    if (!sets || sets === 0) return "#ebebf0";
    if (sets <= 3)  return "#b3d1ff";
    if (sets <= 9)  return "#ff9500";
    return "#ff3b30";
}

function buildBodySvg(view, muscleSets) {
    const c = k => getMuscleHeatColor(muscleSets[k] || 0);
    const ms = muscleSets;
    const neutral = "#e8e8ef";
    const stroke  = "#c4c4cc";
    const sw = 0.8;
    const tip = id => `onclick="showMuscleTip(event,'${id}',${ms[id]||0})" style="cursor:pointer;"`;

    if (view === "front") return `
        <svg viewBox="0 0 100 220" width="100%">
            <ellipse cx="50" cy="13" rx="10" ry="12" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <path d="M 46,24 L 54,24 L 55,33 L 45,33 Z" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Shoulders -->
            <path d="M 28,36 C 16,32 9,39 10,51 C 11,61 20,64 28,62 Z"
                  fill="${c('shoulders')}" stroke="${stroke}" stroke-width="${sw}" ${tip('shoulders')}/>
            <path d="M 72,36 C 84,32 91,39 90,51 C 89,61 80,64 72,62 Z"
                  fill="${c('shoulders')}" stroke="${stroke}" stroke-width="${sw}" ${tip('shoulders')}/>
            <!-- Chest -->
            <path d="M 28,38 C 32,31 44,30 50,33 L 50,66 C 44,73 30,70 28,65 Z"
                  fill="${c('chest')}" stroke="${stroke}" stroke-width="${sw}" ${tip('chest')}/>
            <path d="M 72,38 C 68,31 56,30 50,33 L 50,66 C 56,73 70,70 72,65 Z"
                  fill="${c('chest')}" stroke="${stroke}" stroke-width="${sw}" ${tip('chest')}/>
            <!-- Abs -->
            <path d="M 44,66 C 42,82 42,96 44,108 L 56,108 C 58,96 58,82 56,66 Z"
                  fill="${c('abs')}" stroke="${stroke}" stroke-width="${sw}" ${tip('abs')}/>
            <line x1="44" y1="79" x2="56" y2="79" stroke="${stroke}" stroke-width="0.5" pointer-events="none"/>
            <line x1="44" y1="91" x2="56" y2="91" stroke="${stroke}" stroke-width="0.5" pointer-events="none"/>
            <line x1="50" y1="66" x2="50" y2="108" stroke="${stroke}" stroke-width="0.5" pointer-events="none"/>
            <!-- Hip -->
            <path d="M 36,108 C 32,114 31,122 33,126 C 42,130 58,130 67,126 C 69,122 68,114 64,108 Z"
                  fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Biceps -->
            <path d="M 21,57 C 11,64 9,78 12,87 L 18,86 C 16,77 17,63 24,58 Z"
                  fill="${c('biceps')}" stroke="${stroke}" stroke-width="${sw}" ${tip('biceps')}/>
            <path d="M 79,57 C 89,64 91,78 88,87 L 82,86 C 84,77 83,63 76,58 Z"
                  fill="${c('biceps')}" stroke="${stroke}" stroke-width="${sw}" ${tip('biceps')}/>
            <!-- Forearms -->
            <path d="M 11,89 C 8,100 9,112 11,118 L 17,116 C 16,108 16,98 17,89 Z"
                  fill="${c('forearms')}" stroke="${stroke}" stroke-width="${sw}" ${tip('forearms')}/>
            <path d="M 89,89 C 92,100 91,112 89,118 L 83,116 C 84,108 84,98 83,89 Z"
                  fill="${c('forearms')}" stroke="${stroke}" stroke-width="${sw}" ${tip('forearms')}/>
            <!-- Quads -->
            <path d="M 33,124 C 23,138 23,160 27,170 C 31,178 39,178 43,170 C 47,160 47,138 43,124 Z"
                  fill="${c('legs')}" stroke="${stroke}" stroke-width="${sw}" ${tip('legs')}/>
            <path d="M 67,124 C 77,138 77,160 73,170 C 69,178 61,178 57,170 C 53,160 53,138 57,124 Z"
                  fill="${c('legs')}" stroke="${stroke}" stroke-width="${sw}" ${tip('legs')}/>
            <!-- Knees -->
            <ellipse cx="35" cy="174" rx="8" ry="5" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <ellipse cx="65" cy="174" rx="8" ry="5" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Calves -->
            <path d="M 28,178 C 23,192 24,208 28,214 C 32,218 38,218 42,214 C 46,208 45,194 40,178 Z"
                  fill="${c('calves')}" stroke="${stroke}" stroke-width="${sw}" ${tip('calves')}/>
            <path d="M 72,178 C 77,192 76,208 72,214 C 68,218 62,218 58,214 C 54,208 55,194 60,178 Z"
                  fill="${c('calves')}" stroke="${stroke}" stroke-width="${sw}" ${tip('calves')}/>
        </svg>`;

    return `
        <svg viewBox="0 0 100 220" width="100%">
            <ellipse cx="50" cy="13" rx="10" ry="12" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <path d="M 46,24 L 54,24 L 55,33 L 45,33 Z" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Trapezius -->
            <path d="M 30,34 C 38,26 62,26 70,34 C 68,48 60,58 50,60 C 40,58 32,48 30,34 Z"
                  fill="${c('back')}" stroke="${stroke}" stroke-width="${sw}" ${tip('back')}/>
            <!-- Lats -->
            <path d="M 30,40 C 16,58 14,82 18,108 L 32,108 L 36,64 Z"
                  fill="${c('back')}" stroke="${stroke}" stroke-width="${sw}" ${tip('back')}/>
            <path d="M 70,40 C 84,58 86,82 82,108 L 68,108 L 64,64 Z"
                  fill="${c('back')}" stroke="${stroke}" stroke-width="${sw}" ${tip('back')}/>
            <!-- Erectors -->
            <path d="M 44,60 L 40,108 L 46,108 L 50,60 Z"
                  fill="${c('back')}" stroke="${stroke}" stroke-width="${sw}" ${tip('back')}/>
            <path d="M 56,60 L 60,108 L 54,108 L 50,60 Z"
                  fill="${c('back')}" stroke="${stroke}" stroke-width="${sw}" ${tip('back')}/>
            <!-- Hip -->
            <path d="M 36,108 C 32,114 31,122 33,126 C 42,130 58,130 67,126 C 69,122 68,114 64,108 Z"
                  fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Triceps -->
            <path d="M 20,55 C 10,63 9,78 12,87 L 18,86 C 16,77 15,63 22,58 Z"
                  fill="${c('triceps')}" stroke="${stroke}" stroke-width="${sw}" ${tip('triceps')}/>
            <path d="M 80,55 C 90,63 91,78 88,87 L 82,86 C 84,77 85,63 78,58 Z"
                  fill="${c('triceps')}" stroke="${stroke}" stroke-width="${sw}" ${tip('triceps')}/>
            <!-- Forearms -->
            <path d="M 11,89 C 8,100 9,112 11,118 L 17,116 C 16,108 16,98 17,89 Z"
                  fill="${c('forearms')}" stroke="${stroke}" stroke-width="${sw}" ${tip('forearms')}/>
            <path d="M 89,89 C 92,100 91,112 89,118 L 83,116 C 84,108 84,98 83,89 Z"
                  fill="${c('forearms')}" stroke="${stroke}" stroke-width="${sw}" ${tip('forearms')}/>
            <!-- Glutes -->
            <path d="M 33,108 C 19,118 17,136 23,146 C 29,154 41,154 47,146 C 52,138 51,124 45,116 C 42,112 38,110 36,108 Z"
                  fill="${c('glutes')}" stroke="${stroke}" stroke-width="${sw}" ${tip('glutes')}/>
            <path d="M 67,108 C 81,118 83,136 77,146 C 71,154 59,154 53,146 C 48,138 49,124 55,116 C 58,112 62,110 64,108 Z"
                  fill="${c('glutes')}" stroke="${stroke}" stroke-width="${sw}" ${tip('glutes')}/>
            <!-- Hamstrings -->
            <path d="M 25,148 C 19,160 21,176 25,182 C 29,190 37,192 43,186 C 49,178 48,162 44,150 Z"
                  fill="${c('hamstrings')}" stroke="${stroke}" stroke-width="${sw}" ${tip('hamstrings')}/>
            <path d="M 75,148 C 81,160 79,176 75,182 C 71,190 63,192 57,186 C 51,178 52,162 56,150 Z"
                  fill="${c('hamstrings')}" stroke="${stroke}" stroke-width="${sw}" ${tip('hamstrings')}/>
            <!-- Knees -->
            <ellipse cx="34" cy="186" rx="8" ry="5" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <ellipse cx="66" cy="186" rx="8" ry="5" fill="${neutral}" stroke="${stroke}" stroke-width="${sw}"/>
            <!-- Calves -->
            <path d="M 28,190 C 22,202 23,212 27,216 C 31,219 37,219 41,216 C 45,212 44,202 39,190 Z"
                  fill="${c('calves')}" stroke="${stroke}" stroke-width="${sw}" ${tip('calves')}/>
            <path d="M 72,190 C 78,202 77,212 73,216 C 69,219 63,219 59,216 C 55,212 56,202 61,190 Z"
                  fill="${c('calves')}" stroke="${stroke}" stroke-width="${sw}" ${tip('calves')}/>
        </svg>`;
}

function showMuscleTip(evt, muscleId, sets) {
    const existing = document.getElementById("__muscleTip");
    if (existing) existing.remove();

    const group = MUSCLE_GROUPS.find(g => g.id === muscleId);
    const label = group ? group.label : muscleId;
    const level = sets === 0 ? "Kein Training"
        : sets <= 3  ? `${sets} Sätze – Wenig`
        : sets <= 9  ? `${sets} Sätze – Mittel`
        : `${sets} Sätze – Intensiv`;

    const tip = document.createElement("div");
    tip.id = "__muscleTip";
    tip.className = "muscle-tip";
    tip.innerHTML = `<strong>${esc(label)}</strong><br><span>${level}</span>`;

    const card = evt.target.closest(".muscle-map-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    tip.style.left = (evt.clientX - rect.left) + "px";
    tip.style.top  = (evt.clientY - rect.top - 56) + "px";
    card.appendChild(tip);

    const remove = () => { tip.remove(); document.removeEventListener("click", remove); };
    setTimeout(() => document.addEventListener("click", remove), 0);
}

function buildMuscleMapSection() {
    const weekWorkouts = getWorkoutsThisWeek();
    const mapping = loadMuscleMapping();
    const setCounts = {};
    weekWorkouts.forEach(workout => {
        workout.exercises.forEach(ex => {
            const exInfo = exerciseById.get(ex.id);
            if (!exInfo) return;
            setCounts[exInfo.category] = (setCounts[exInfo.category] || 0) + ex.sets.length;
        });
    });

    const muscleSets = {};
    Object.entries(setCounts).forEach(([cat, count]) => {
        (mapping[cat] || []).forEach(m => {
            muscleSets[m] = (muscleSets[m] || 0) + count;
        });
    });

    const muscleStatItems = MUSCLE_GROUPS
        .filter(g => (muscleSets[g.id] || 0) > 0)
        .map(g => {
            const n = muscleSets[g.id];
            const color = getMuscleHeatColor(n);
            return `<span class="muscle-stat-item">
                <span class="legend-dot" style="background:${color};"></span>
                ${esc(g.label)}&nbsp;<strong>${n}</strong>
            </span>`;
        }).join("");

    return `
        <div class="muscle-map-card">
            <div class="muscle-map-header">
                <div class="muscle-map-title">🫀 Muskelkarte – Diese Woche</div>
                <button onclick="openMuscleMappingPopup()" style="font-size:12px; padding:5px 10px; margin:0; background:#f0f0f5; color:#333;">⚙️ Zuordnen</button>
            </div>
            <div class="muscle-map-views">
                <div class="muscle-map-view">
                    <div class="muscle-map-label">Vorne</div>
                    ${buildBodySvg("front", muscleSets)}
                </div>
                <div class="muscle-map-view">
                    <div class="muscle-map-label">Hinten</div>
                    ${buildBodySvg("back", muscleSets)}
                </div>
            </div>
            <div class="muscle-map-legend">
                <span class="legend-item"><span class="legend-dot" style="background:#ebebf0;"></span>Kein</span>
                <span class="legend-item"><span class="legend-dot" style="background:#b3d1ff;"></span>Wenig (1–3)</span>
                <span class="legend-item"><span class="legend-dot" style="background:#ff9500;"></span>Mittel (4–9)</span>
                <span class="legend-item"><span class="legend-dot" style="background:#ff3b30;"></span>Intensiv (10+)</span>
            </div>
            ${muscleStatItems ? `<div class="muscle-stat-bar">${muscleStatItems}</div>` : ""}
        </div>`;
}

function openMuscleMappingPopup() {
    const mapping = loadMuscleMapping();
    const rows = categories.map(cat => {
        const active = mapping[cat] || [];
        const chips = MUSCLE_GROUPS.map(g => `
            <label class="muscle-chip-label">
                <input type="checkbox" data-cat="${esc(cat)}" data-muscle="${g.id}" ${active.includes(g.id) ? "checked" : ""}>
                <span class="muscle-chip${active.includes(g.id) ? " active" : ""}">${g.label}</span>
            </label>`).join("");
        return `
            <div class="mapping-row">
                <div class="mapping-cat-name">${esc(cat)}</div>
                <div class="mapping-chips">${chips}</div>
            </div>`;
    }).join("");

    openPopup(`
        ${rows || '<p style="color:#888;">Keine Kategorien vorhanden.</p>'}
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="saveMuscleMappingFromPopup()">Speichern</button>
        </div>
    `, "💪 Muskelzuordnung");

    document.querySelectorAll(".muscle-chip-label input").forEach(input => {
        input.addEventListener("change", () => {
            input.nextElementSibling.classList.toggle("active", input.checked);
        });
    });
}

function saveMuscleMappingFromPopup() {
    const mapping = {};
    document.querySelectorAll(".muscle-chip-label input").forEach(input => {
        const cat = input.dataset.cat;
        if (!mapping[cat]) mapping[cat] = [];
        if (input.checked) mapping[cat].push(input.dataset.muscle);
    });
    localStorage.setItem("muscleCategoryMap", JSON.stringify(mapping));
    closePopup();
    renderDashboard();
}

function buildDashboardSections() {
    const S = {};

    if (workouts.length === 0) {
        S.stats = `<p style="color:#888;">Noch keine Insights verfügbar.</p>`;
        ["comparison","volume","monthlyPRs","allTimePRs","progression","weeklyHistory","calendar"]
            .forEach(k => S[k] = "");
        return S;
    }

    const thisWeekCount = getWorkoutsThisWeek().length;
    const lastWeekCount = getWorkoutsLastWeek().length;
    const comparison    = weeklyComparisonText(thisWeekCount, lastWeekCount);
    const prs           = getPRsThisMonth();
    const allTimePRs    = getAllTimePRs();
    const progression   = getExerciseProgression();
    const volByCat      = getVolumeByCategory();

    // STATS
    S.stats = dashboardConfig.stats ? `
        <div class="insight-stats-grid">
            <div class="insight-stat-card">
                <div class="insight-stat-value">💪 <span class="stat-num" data-target="${thisWeekCount}">0</span></div>
                <div class="insight-stat-label">Diese Woche</div>
            </div>
            <div class="insight-stat-card">
                <div class="insight-stat-value">📅 <span class="stat-num" data-target="${lastWeekCount}">0</span></div>
                <div class="insight-stat-label">Letzte Woche</div>
            </div>
        </div>` : "";

    // COMPARISON
    S.comparison = dashboardConfig.comparison
        ? `<div class="insight-compare-card">${comparison}</div>` : "";

    // VOLUME
    if (dashboardConfig.volume && Object.keys(volByCat).length > 0) {
        const maxSets = Math.max(...Object.values(volByCat));
        const rows = Object.entries(volByCat).sort((a, b) => b[1] - a[1]).map(([cat, sets]) => `
            <div class="volume-row">
                <div class="volume-label">${esc(cat)}</div>
                <div class="volume-bar-wrap"><div class="volume-bar" style="width:${Math.round(sets/maxSets*100)}%"></div></div>
                <div class="volume-count">${sets}</div>
            </div>`).join("");
        S.volume = `<div class="pr-section" style="margin-bottom:14px;">
            <h3 style="margin:0 0 12px;font-size:16px;color:#333;cursor:default;">📊 Sätze diese Woche</h3>${rows}</div>`;
    } else { S.volume = ""; }

    // MONTHLY PRs
    if (dashboardConfig.monthlyPRs) {
        if (prs.length > 0) {
            const visiblePRs = prs.slice(0, 5), hiddenPRs = prs.slice(5), hasMore = hiddenPRs.length > 0;
            S.monthlyPRs = `
                <div class="pr-section">
                    <div class="pr-header" onclick="togglePRSection()">
                        <h3>🏆 Bestleistungen diesen Monat</h3>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span class="pr-count-badge">${prs.length}</span>
                            <span id="arrow-pr-section">${prSectionExpanded ? "▾" : "▸"}</span>
                        </div>
                    </div>
                    <div id="pr-list" style="display:${prSectionExpanded ? "block" : "none"};">
                        ${visiblePRs.map(pr => `
                            <div class="pr-row" onclick="showExerciseDetail('${pr.id}')">
                                <div>${esc(pr.name)}</div>
                                <div><strong>${pr.newMax} kg</strong> <span class="pr-delta">↑ +${pr.delta} kg</span></div>
                            </div>`).join("")}
                        ${hasMore ? `
                            <div id="pr-hidden" style="display:${prMoreExpanded ? "block" : "none"};">
                                ${hiddenPRs.map(pr => `
                                    <div class="pr-row" onclick="showExerciseDetail('${pr.id}')">
                                        <div>${esc(pr.name)}</div>
                                        <div><strong>${pr.newMax} kg</strong> <span class="pr-delta">↑ +${pr.delta} kg</span></div>
                                    </div>`).join("")}
                            </div>
                            <button id="pr-more-btn" data-count="${hiddenPRs.length}" onclick="togglePRMore()"
                                    style="width:100%;margin-top:8px;font-size:13px;background:#f0f0f5;color:#333;">
                                ${prMoreExpanded ? "Weniger anzeigen ▲" : `Mehr anzeigen (${hiddenPRs.length}) ▼`}
                            </button>` : ""}
                    </div>
                </div>`;
        } else {
            S.monthlyPRs = `<p style="color:#888;margin:0 0 16px;">Noch keine neuen Bestleistungen diesen Monat.</p>`;
        }
    } else { S.monthlyPRs = ""; }

    // ALL-TIME PRs
    S.allTimePRs = dashboardConfig.allTimePRs && allTimePRs.length > 0 ? `
        <div class="pr-section">
            <div class="pr-header" onclick="toggleAllTimePRs()">
                <h3>🥇 Bestleistungen aller Zeiten</h3>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span class="pr-count-badge">${allTimePRs.length}</span>
                    <span id="arrow-all-time-prs">${allTimePRsCollapsed ? "▸" : "▾"}</span>
                </div>
            </div>
            <div id="all-time-pr-list" style="display:${allTimePRsCollapsed ? "none" : "block"};">
                ${allTimePRs.map(pr => `
                    <div class="pr-row" onclick="showExerciseDetail('${pr.id}')">
                        <div>${esc(pr.name)}<br><small style="color:#aaa;font-size:12px;">${esc(pr.category)}</small></div>
                        <div><strong>${pr.weight} kg</strong> <span style="color:#888;font-size:13px;">× ${pr.reps}</span></div>
                    </div>`).join("")}
            </div>
        </div>` : "";

    // PROGRESSION
    S.progression = dashboardConfig.progression ? `
        <div class="progression-card">
            <h3>Progression</h3>
            ${progression.length === 0
                ? `<p style="color:#888;margin:0;">Noch keine Progression messbar.</p>`
                : progression.map((p, idx) => {
                    if (progressionCollapsed[p.id] === undefined) progressionCollapsed[p.id] = false;
                    const collapsed     = progressionCollapsed[p.id];
                    const prBadge       = p.isPR    ? `<span class="badge-pr">🏆 PR</span>` : "";
                    const plateauBadge  = p.plateau ? `<span class="badge-plateau">⚠️ Plateau</span>` : "";
                    return `
                        <h4 onclick="toggleProgression('${p.id}')" class="progression-header">
                            <span>${esc(p.name)} ${prBadge}${plateauBadge}</span>
                            <span class="progression-header-controls">
                                <button onclick="showExerciseDetail('${p.id}');event.stopPropagation();"
                                        style="font-size:12px;padding:3px 8px;margin:0;">Details</button>
                                <span id="arrow-prog_${p.id}">${collapsed ? "▸" : "▾"}</span>
                            </span>
                        </h4>
                        <div id="prog_${p.id}" style="display:${collapsed ? "none" : "block"};font-size:13px;color:#555;padding:8px 0 4px;">
                            Volumen letzte Steigerung: ${p.lastIncrease > 0 ? "+" : ""}${Math.round(p.lastIncrease)} kg·Wdh<br>
                            Bestes Gewicht: ${p.lastBest} kg${p.allTimeBest > p.lastBest ? ` (Rekord: ${p.allTimeBest} kg)` : ""}<br>
                            (${p.count} Workouts)
                            <canvas id="chart_${idx}" height="75" class="mini-chart-canvas"
                                data-values='${JSON.stringify(p.chartValues)}'></canvas>
                        </div>`;
                }).join("")}
        </div>` : "";

    // WEEKLY HISTORY
    if (dashboardConfig.weeklyHistory) {
        const groups = groupWorkoutsByWeek();
        const keys = Object.keys(groups).sort().reverse();
        S.weeklyHistory = `
            <h2 style="font-size:17px;margin:20px 0 10px;">Wochenübersicht</h2>
            ${keys.map(key => `
                <div class="week-box">
                    <h3 onclick="toggleCollapse('week_${key}')">${key} <span id="arrow-week_${key}">▾</span></h3>
                    <div id="week_${key}">
                        ${groups[key].map(w => `
                            <div class="history-entry">
                                <strong>${esc(w.plan)}</strong> – ${w.date}${w.duration ? ` · ${w.duration} min` : ""}
                            </div>`).join("")}
                    </div>
                </div>`).join("")}`;
    } else { S.weeklyHistory = ""; }

    // CALENDAR
    if (dashboardConfig.calendar) {
        const MONTHS = ["Januar","Februar","März","April","Mai","Juni",
                        "Juli","August","September","Oktober","November","Dezember"];
        const year = calendarYear, month = calendarMonth;
        const dateMap = {};
        workouts.forEach(w => { dateMap[w.date] = true; });
        const firstDow   = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const todayStr   = new Date().toISOString().slice(0, 10);
        let cells = "";
        for (let i = 0; i < firstDow; i++) cells += `<div class="cal-cell empty"></div>`;
        for (let d = 1; d <= daysInMonth; d++) {
            const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
            const haW = dateMap[ds], isT = ds === todayStr;
            cells += `<div class="cal-cell${haW?" has-workout":""}${isT?" today":""}"
                ${haW ? `onclick="calendarDayClick('${ds}')"` : ""}>${d}</div>`;
        }
        S.calendar = `
            <div class="cal-card">
                <div class="cal-header">
                    <button class="cal-nav-btn" onclick="calendarPrev()">‹</button>
                    <span class="cal-title">${MONTHS[month]} ${year}</span>
                    <button class="cal-nav-btn" onclick="calendarNext()">›</button>
                </div>
                <div class="cal-weekdays">
                    <div>Mo</div><div>Di</div><div>Mi</div><div>Do</div><div>Fr</div><div>Sa</div><div>So</div>
                </div>
                <div class="cal-grid">${cells}</div>
            </div>`;
    } else { S.calendar = ""; }

    S.muscleMap = dashboardConfig.muscleMap ? buildMuscleMapSection() : "";

    return S;
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
            <div class="history-card anim-fade-in" style="animation-delay:${index * 0.05}s">
                <div class="history-card-main" onclick="showWorkoutDetails(${originalIndex})">
                    <div class="history-card-name">${esc(w.plan)}</div>
                    <div class="history-card-meta">${w.date}${w.duration ? ` · ${w.duration} min` : ""}</div>
                </div>
                <div class="history-card-actions">
                    <button class="ex-icon-btn" title="Als Vorlage verwenden" onclick="startFromHistory(${originalIndex})">▶️</button>
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
        const exInfo = exerciseById.get(ex.id);
        const setsHtml = ex.sets.map((s, i) =>
            `<span class="set-chip">S${i + 1}: ${s.weight}kg × ${s.reps}</span>`
        ).join("");
        return `
            <div class="detail-exercise">
                <div class="detail-ex-name">${exInfo ? esc(exInfo.name) : "Unbekannte Übung"}</div>
                <div class="detail-sets">${setsHtml}</div>
            </div>
        `;
    }).join("");

    details.innerHTML = `
        <div class="detail-card">
            <div class="detail-header">
                <strong>${esc(w.plan)}</strong>
                <span class="detail-meta">${w.date}${w.duration ? ` · ${w.duration} min` : ""}</span>
            </div>
            ${w.note ? `<div class="detail-exercise"><div class="note-box" style="margin:0;"><strong>Notiz:</strong> ${w.note}</div></div>` : ""}
            ${exercisesHtml}
        </div>
    `;
}

async function deleteWorkout(i) {
    const ok = await confirmDialog({
        message: "Workout wirklich löschen?",
        title: "Workout löschen",
        confirmLabel: "Löschen",
        danger: true
    });
    if (!ok) return;
    workouts.splice(i, 1);
    save();
    renderHistory();
    document.getElementById("overviewDetails").innerHTML = "";
}

async function startFromHistory(i) {
    const w = workouts[i];
    const ok = await confirmDialog({
        message: `„${w.plan}" als Vorlage starten?\nAlle Übungen werden übernommen, Sätze beginnen leer.`,
        title: "Workout starten",
        confirmLabel: "Starten"
    });
    if (!ok) return;
    const validExercises = w.exercises
        .filter(ex => exerciseById.has(ex.id))
        .map(ex => ({ id: ex.id, sets: [] }));

    if (validExercises.length === 0) {
        await alertDialog("Keine gültigen Übungen in diesem Workout gefunden.", "Hinweis");
        return;
    }

    currentTracking = {
        plan: w.plan,
        date: new Date().toISOString().split("T")[0],
        note: "",
        startTime: new Date(),
        exercises: validExercises
    };

    currentExerciseIndex = 0;
    timerSeconds = 0;
    timerStart = null;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    setTimestamps = [];
    stopRestTimer();
    initRestTimerUI();
    showRestTimerCard();

    showPage("tracking");
}

// ---------------------------------------------------------
// ÜBUNGEN (with rename support)
// ---------------------------------------------------------
function renderCategories() {
    const list = document.getElementById("categoryList");
    const select = document.getElementById("exerciseCategory");

    if (select) {
        select.innerHTML = categories.map(c => `<option>${esc(c)}</option>`).join("");
    }

    if (list) {
        list.innerHTML = categories.map((c, i) => `
            <span class="cat-chip">
                ${esc(c)}
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
    const ex = exerciseById.get(id);

    openPopup(`
        <h3>Übung umbenennen</h3>
        <input id="renameInput" value="${esc(ex.name)}">
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="renameExercise('${id}')">Speichern</button>
        </div>
    `, "Übung umbenennen");
}

function renameExercise(id) {
    const newName = document.getElementById("renameInput").value.trim();
    if (!newName) return;

    const ex = exerciseById.get(id);
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

    let groupIndex = 0;
    Object.keys(groups).sort().forEach(category => {
        const items = groups[category];
        const safeId = "exGroup_" + category.replace(/\s+/g, "_");
        const delay = (groupIndex++ * 0.07).toFixed(2);
        list.innerHTML += `
            <div class="ex-group anim-fade-in" style="animation-delay:${delay}s">
                <div class="ex-group-header" onclick="toggleCollapse('${safeId}')">
                    <span id="arrow-${safeId}">▾</span>
                    <span>${esc(category)}</span>
                    <span class="ex-group-count">${items.length}</span>
                </div>
                <div id="${safeId}" class="ex-group-items">
                    ${items.map(({ ex, i }) => `
                        <div class="ex-item">
                            <span class="ex-item-name">${esc(ex.name)}</span>
                            <div class="ex-item-actions">
                                <button class="ex-icon-btn" onclick="renameExercisePopup('${ex.id}')">✏️</button>
                                <button class="ex-icon-btn ex-delete" onclick="deleteExercise(${i})">🗑️</button>
                            </div>
                        </div>
                    `).join("")}
                </div>
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
    toggleCollapse("plan_" + (plans.length - 1));
}

function renamePlanPopup(index) {
    const plan = plans[index];
    openPopup(`
        <h3>Plan umbenennen</h3>
        <input id="renameInput" value="${esc(plan.name)}">
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="renamePlan(${index})">Speichern</button>
        </div>
    `, "Plan umbenennen");
}

function renamePlan(index) {
    const newName = document.getElementById("renameInput").value.trim();
    if (!newName) return;

    plans[index].name = newName;
    save();
    closePopup();
    renderPlans();
    renderTracking();
}

async function deletePlan(i) {
    const ok = await confirmDialog({
        message: "Plan wirklich löschen?",
        title: "Plan löschen",
        confirmLabel: "Löschen",
        danger: true
    });
    if (!ok) return;
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
    }
    renderPlans();
    toggleCollapse("plan_" + planIndex);
}

function removeExerciseFromPlan(planIndex, exerciseId) {
    plans[planIndex].exercises = plans[planIndex].exercises.filter(id => id !== exerciseId);
    save();
    renderPlans();
    toggleCollapse("plan_" + planIndex);
}

function renderPlans() {
    const list = document.getElementById("planList");
    const select = document.getElementById("trackingPlanSelect");

    list.innerHTML = plans.map((p, i) => {
        const availableExercises = exercises.filter(ex => !p.exercises.includes(ex.id));
        const exerciseOptions = availableExercises
            .map(ex => `<option value="${ex.id}">${esc(ex.name)}</option>`)
            .join("");

        const chipsHtml = p.exercises.map(exId => {
            const ex = exerciseById.get(exId);
            return `
                <span class="plan-ex-chip">
                    ${ex ? ex.name : "?"}
                    <button class="cat-chip-delete" onclick="removeExerciseFromPlan(${i}, '${exId}')">×</button>
                </span>
            `;
        }).join("");

        const categoryOptions = categories.map(c => {
            const total = exercises.filter(ex => ex.category === c).length;
            const added = exercises.filter(ex => ex.category === c && p.exercises.includes(ex.id)).length;
            const full  = total > 0 && added === total;
            return `<option value="${esc(c)}" ${full ? "disabled" : ""}>${esc(c)}${full ? " ✓" : ""}</option>`;
        }).join("");

        return `
            <div class="plan-card" id="planBox_${i}">
                <div class="plan-card-header" onclick="toggleCollapse('plan_${i}'); highlightPlan(${i});">
                    <span class="plan-card-title">${esc(p.name)}</span>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span id="arrow-plan_${i}">▸</span>
                        <button class="ex-icon-btn" onclick="renamePlanPopup(${i}); event.stopPropagation();">✏️</button>
                        <button class="ex-icon-btn" onclick="deletePlan(${i}); event.stopPropagation();">🗑️</button>
                    </div>
                </div>
                <div id="plan_${i}" class="plan-card-body" style="display:none;">
                    <div class="plan-exercises">${chipsHtml || `<span style="color:#aaa; font-size:14px;">Noch keine Übungen</span>`}</div>
                    ${availableExercises.length ? `
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; gap:8px;">
                            <select id="planCat_${i}" onchange="filterPlanExercises(${i})" style="flex:1; margin:0;">
                                <option value="">Alle Kategorien</option>
                                ${categoryOptions}
                            </select>
                            <input id="planSearch_${i}" type="text" placeholder="Suchen…" oninput="filterPlanExercises(${i})" style="flex:1; margin:0;">
                        </div>
                        <div style="display:flex; gap:8px;">
                            <select id="planAdd_${i}" style="flex:1; margin:0;">${exerciseOptions}</select>
                            <button onclick="addExerciseToPlan(${i})" style="margin:0; white-space:nowrap;">+ Hinzufügen</button>
                        </div>
                    </div>` : `<span style="color:#aaa; font-size:13px;">Alle Übungen bereits hinzugefügt</span>`}
                </div>
            </div>
        `;
    }).join("");

    select.innerHTML = plans.map((p, i) => `<option value="${i}">${esc(p.name)}</option>`).join("");
}

function filterPlanExercises(planIndex) {
    const catEl    = document.getElementById("planCat_"    + planIndex);
    const searchEl = document.getElementById("planSearch_" + planIndex);
    const selectEl = document.getElementById("planAdd_"    + planIndex);
    if (!catEl || !searchEl || !selectEl) return;

    const category = catEl.value;
    const search   = searchEl.value.toLowerCase();
    const plan     = plans[planIndex];

    const filtered = exercises.filter(ex => {
        if (plan.exercises.includes(ex.id)) return false;
        if (category && ex.category !== category) return false;
        if (search && !ex.name.toLowerCase().includes(search)) return false;
        return true;
    });

    selectEl.innerHTML = filtered.length
        ? filtered.map(ex => `<option value="${ex.id}">${esc(ex.name)}</option>`).join("")
        : `<option value="" disabled>Keine Übungen gefunden</option>`;
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

let restTimerDuration = parseInt(localStorage.getItem("restTimerDuration") || "60");
let restTimerRemaining = 0;
let restTimerInterval = null;
let restTimerEndTime = null;
let restTimerFinishedAt = null;
let restTimerOverInterval = null;
let setTimestamps = [];
let dragState = null;

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
// REST TIMER
// ---------------------------------------------------------
function startRestTimer() {
    if (restTimerDuration === 0) return;
    stopRestTimer();
    restTimerFinishedAt = null;
    restTimerEndTime = Date.now() + restTimerDuration * 1000;
    restTimerRemaining = restTimerDuration;
    const labelEl = document.getElementById("restTimerLabel");
    if (labelEl) labelEl.textContent = "⏸ Pause";
    const countdown = document.getElementById("restCountdown");
    if (countdown) countdown.style.display = "";
    updateRestTimerUI();
    restTimerInterval = setInterval(() => {
        restTimerRemaining = Math.ceil((restTimerEndTime - Date.now()) / 1000);
        if (restTimerRemaining <= 0) {
            restTimerRemaining = 0;
            stopRestTimer();
            vibrate([100, 50, 100]);
            restTimerFinishedAt = Date.now();
            updateRestTimerOverUI();
            restTimerOverInterval = setInterval(updateRestTimerOverUI, 1000);
            return;
        }
        updateRestTimerUI();
    }, 500);
}

function stopRestTimer() {
    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
    }
    if (restTimerOverInterval) {
        clearInterval(restTimerOverInterval);
        restTimerOverInterval = null;
    }
    restTimerEndTime = null;
    restTimerFinishedAt = null;
}

function updateRestTimerOverUI() {
    const cd = document.getElementById("restCountdown");
    if (!cd) return;
    cd.style.display = "";
    const elapsed = Math.floor((Date.now() - restTimerFinishedAt) / 1000);
    const timeEl = document.getElementById("restTimerTime");
    if (timeEl) timeEl.textContent = "+" + formatTime(elapsed);
    const labelEl = document.getElementById("restTimerLabel");
    if (labelEl) labelEl.textContent = "⚠️ Bereits vorbei";
    const bar = document.getElementById("restTimerBar");
    if (bar) bar.style.width = "0%";
}

function skipRestTimer() {
    stopRestTimer();
    restTimerRemaining = 0;
    const countdown = document.getElementById("restCountdown");
    if (countdown) countdown.style.display = "none";
}

function setRestDuration(s) {
    const wasRunning = restTimerInterval !== null;
    restTimerDuration = s;
    localStorage.setItem("restTimerDuration", s);
    stopRestTimer();
    restTimerRemaining = 0;
    const optsEl = document.getElementById("restTimerOpts");
    if (optsEl) optsEl.innerHTML = restTimerOptsHTML();
    if (s === 0 || !wasRunning) {
        const countdown = document.getElementById("restCountdown");
        if (countdown) countdown.style.display = "none";
    } else {
        startRestTimer();
    }
}

function restTimerOptsHTML() {
    return [["Aus", 0], ["1 min", 60], ["2 min", 120], ["3 min", 180]]
        .map(([label, val]) =>
            `<button class="rest-opt-btn${restTimerDuration === val ? " active" : ""}" onclick="setRestDuration(${val})">${label}</button>`)
        .join("");
}

function updateRestTimerUI() {
    const timeEl = document.getElementById("restTimerTime");
    if (timeEl) timeEl.textContent = formatTime(restTimerRemaining);
    const bar = document.getElementById("restTimerBar");
    if (bar && restTimerDuration > 0) {
        bar.style.width = `${(restTimerRemaining / restTimerDuration) * 100}%`;
    }
}

function initRestTimerUI() {
    const card = document.getElementById("restTimerCard");
    if (!card) return;
    card.style.display = "none";
    card.innerHTML = `
        <div class="rest-timer-card">
            <div id="restCountdown" style="display:none;">
                <div class="rest-timer-header">
                    <span class="rest-timer-label" id="restTimerLabel">⏸ Pause</span>
                    <span class="rest-timer-time" id="restTimerTime">0:00</span>
                    <button onclick="skipRestTimer()" style="background:none;color:#888;font-size:13px;padding:4px 8px;margin:0;font-weight:600;">Überspringen</button>
                </div>
                <div class="rest-timer-bar-wrap" style="margin-bottom:10px;">
                    <div class="rest-timer-bar" id="restTimerBar" style="width:100%;"></div>
                </div>
            </div>
            <div class="rest-timer-opts" id="restTimerOpts">${restTimerOptsHTML()}</div>
        </div>
    `;
}

function showRestTimerCard() {
    const card = document.getElementById("restTimerCard");
    if (card) card.style.display = "";
}

// ---------------------------------------------------------
// QUICK WEIGHT ADJUST
// ---------------------------------------------------------
function adjustWeight(delta) {
    const el = document.getElementById("trackWeight");
    if (!el) return;
    const current = parseFloat(el.value) || 0;
    const newVal = Math.max(0, current + delta);
    el.value = newVal % 1 === 0 ? newVal : newVal.toFixed(1);
}

function adjustReps(delta) {
    const el = document.getElementById("trackReps");
    if (!el) return;
    el.value = Math.max(0, (parseInt(el.value) || 0) + delta);
}

// ---------------------------------------------------------
// ESTIMATED TIME REMAINING
// ---------------------------------------------------------
function getEstimatedTimeRemaining() {
    if (!currentTracking || setTimestamps.length < 3) return null;
    const workoutStart = new Date(currentTracking.startTime).getTime();
    const elapsed = Date.now() - workoutStart;
    const setsDone = currentTracking.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    if (setsDone < 3) return null;
    const avgTimePerSet = elapsed / setsDone;
    const setsPerEx = setsDone / Math.max(1, currentExerciseIndex + 1);
    const remainingExercises = currentTracking.exercises.length - currentExerciseIndex - 1;
    const currentExSets = currentTracking.exercises[currentExerciseIndex]?.sets.length || 0;
    const remainingSetsInCurrent = Math.max(0, Math.round(setsPerEx) - currentExSets);
    const remainingSets = remainingExercises * Math.round(setsPerEx) + remainingSetsInCurrent;
    if (remainingSets <= 0) return null;
    return Math.round((remainingSets * avgTimePerSet) / 1000);
}

// ---------------------------------------------------------
// DRAG TO REORDER EXERCISES
// ---------------------------------------------------------
function addExerciseDragListeners() {
    const items = document.querySelectorAll(".tracking-ex-item[data-idx]");
    items.forEach(item => {
        const handle = item.querySelector(".drag-handle");
        if (!handle) return;

        handle.addEventListener("touchstart", e => {
            dragState = {
                fromIdx: parseInt(item.dataset.idx),
                currentIdx: parseInt(item.dataset.idx),
                startY: e.touches[0].clientY
            };
            item.classList.add("dragging");
            e.preventDefault();
        }, { passive: false });

        handle.addEventListener("touchmove", e => {
            if (!dragState) return;
            const y = e.touches[0].clientY;
            document.querySelectorAll(".tracking-ex-item[data-idx]").forEach(other => {
                other.classList.remove("drag-over");
                const rect = other.getBoundingClientRect();
                if (y >= rect.top && y <= rect.bottom) {
                    dragState.currentIdx = parseInt(other.dataset.idx);
                }
            });
            if (dragState.currentIdx !== dragState.fromIdx) {
                const target = document.querySelector(`.tracking-ex-item[data-idx="${dragState.currentIdx}"]`);
                if (target) target.classList.add("drag-over");
            }
            e.preventDefault();
        }, { passive: false });

        handle.addEventListener("touchend", () => {
            if (!dragState) return;
            document.querySelectorAll(".tracking-ex-item[data-idx]").forEach(el => {
                el.classList.remove("dragging", "drag-over");
            });
            if (dragState.currentIdx !== dragState.fromIdx) {
                commitDragReorder(dragState.fromIdx, dragState.currentIdx);
            }
            dragState = null;
        });
    });
}

function commitDragReorder(fromIdx, toIdx) {
    const arr = currentTracking.exercises;
    const moved = arr.splice(fromIdx, 1)[0];
    arr.splice(toIdx, 0, moved);
    // Adjust currentExerciseIndex to track the same exercise
    if (fromIdx === currentExerciseIndex) {
        currentExerciseIndex = toIdx;
    } else if (fromIdx < currentExerciseIndex && toIdx >= currentExerciseIndex) {
        currentExerciseIndex--;
    } else if (fromIdx > currentExerciseIndex && toIdx <= currentExerciseIndex) {
        currentExerciseIndex = toIdx;
    }
    renderTracking();
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
    setTimestamps = [];
    stopRestTimer();
    initRestTimerUI();
    showRestTimerCard();

    renderTracking();
}

async function startTracking() {
    const planIndex = document.getElementById("trackingPlanSelect").value;
    if (planIndex === "") return;

    const plan = plans[planIndex];

    if (!plan.exercises || plan.exercises.length === 0) {
        await alertDialog(`Der Plan „${plan.name}" hat noch keine Übungen. Bitte zuerst Übungen im Plan hinzufügen.`, "Plan unvollständig");
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
    setTimestamps = [];
    stopRestTimer();
    initRestTimerUI();
    showRestTimerCard();

    renderTracking();
}

// ---------------------------------------------------------
// ADD EXERCISE TO CURRENT WORKOUT
// ---------------------------------------------------------
function addExerciseToCurrentWorkout() {
    const id = document.getElementById("addExerciseToWorkoutSelect").value;
    if (!id) return;

    currentTracking.exercises.push({ id, sets: [] });
    renderTracking();

    const items = document.querySelectorAll(".tracking-ex-item");
    const last = items[items.length - 1];
    if (last) last.classList.add("anim-slide-in");
}

function filterTrackingExercises() {
    const catEl    = document.getElementById("trackingCat");
    const searchEl = document.getElementById("trackingSearch");
    const selectEl = document.getElementById("addExerciseToWorkoutSelect");
    if (!catEl || !searchEl || !selectEl) return;

    const category = catEl.value;
    const search   = searchEl.value.toLowerCase();

    const alreadyAdded = currentTracking.exercises.map(ex => ex.id);

    const filtered = exercises.filter(ex => {
        if (alreadyAdded.includes(ex.id)) return false;
        if (category && ex.category !== category) return false;
        if (search && !ex.name.toLowerCase().includes(search)) return false;
        return true;
    });

    selectEl.innerHTML = filtered.length
        ? filtered.map(ex => `<option value="${ex.id}">${esc(ex.name)}</option>`).join("")
        : `<option value="" disabled>Keine Übungen gefunden</option>`;
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
    const exInfo = exerciseById.get(ex.id);

    let html = `<h3>${exInfo ? esc(exInfo.name) : "Unbekannt"} bearbeiten</h3>`;

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
    const startAreas = document.querySelectorAll(".tracking-start-area");

    // Preserve scroll position across re-renders. Without this, every saveSet() call
    // jumps the user back to the top of the page on mobile.
    const scrollY = window.scrollY;

    if (!currentTracking) {
        area.innerHTML = "";
        const startEl = document.getElementById("trackingStartTime");
        if (startEl) startEl.innerText = "";
        startAreas.forEach(el => el.style.display = "block");
        return;
    }

    // Hide start buttons when workout is active
    startAreas.forEach(el => el.style.display = "none");

    const total = currentTracking.exercises.length;
    const done = currentExerciseIndex;

    if (timerStart) {
        timerSeconds = Math.floor((Date.now() - timerStart) / 1000);
    }

    const alreadyAdded = currentTracking.exercises.map(ex => ex.id);
    const availableExercises = exercises.filter(ex => !alreadyAdded.includes(ex.id));

    const exerciseOptions = availableExercises
        .map(ex => `<option value="${ex.id}">${esc(ex.name)}</option>`)
        .join("");

    const categoryOptions = [...categories].sort().map(c => {
        const total = exercises.filter(ex => ex.category === c).length;
        const added = exercises.filter(ex => ex.category === c && alreadyAdded.includes(ex.id)).length;
        const full  = total === 0 || added === total;
        return `<option value="${esc(c)}" ${full ? "disabled" : ""}>${esc(c)}${full ? " ✓" : ""}</option>`;
    }).join("");

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
                ${availableExercises.length ? `
                <div style="display:flex; gap:8px; margin-bottom:10px;">
                    <select id="trackingCat" onchange="filterTrackingExercises()" style="flex:1; margin:0;">
                        <option value="">Alle Kategorien</option>
                        ${categoryOptions}
                    </select>
                    <input id="trackingSearch" type="text" placeholder="Suchen…" oninput="filterTrackingExercises()" style="flex:1; margin:0;">
                </div>
                <div style="display:flex; gap:8px;">
                    <select id="addExerciseToWorkoutSelect" style="flex:1; margin:0;">${exerciseOptions}</select>
                    <button onclick="addExerciseToCurrentWorkout()" style="margin:0; white-space:nowrap;">+ Hinzufügen</button>
                </div>
                ` : `<span style="color:#aaa; font-size:13px;">Alle Übungen bereits hinzugefügt</span>`}
            </div>
        </div>
    `;

    // -----------------------------------------------------
    // NO EXERCISES YET (FREE TRAINING)
    // -----------------------------------------------------
    if (total === 0) {
        area.innerHTML = `
            <div style="text-align:center; padding:40px 20px;">
                <div style="font-size:48px; margin-bottom:12px;">➕</div>
                <div style="font-size:16px; font-weight:600; margin-bottom:8px;">Noch keine Übungen</div>
                <div style="color:#888; margin-bottom:24px;">Fügen Sie eine Übung hinzu, um zu beginnen</div>
            </div>
            ${addExerciseBlock}
        `;
        // Auto-open the add exercise section
        setTimeout(() => {
            const collapseEl = document.getElementById("addExToWorkout");
            const arrowEl = document.getElementById("arrow-addExToWorkout");
            if (collapseEl) {
                collapseEl.style.display = "block";
                if (arrowEl) arrowEl.innerText = "▾";
            }
        }, 0);
        return;
    }

    // -----------------------------------------------------
    // FINISHED ALL EXERCISES
    // -----------------------------------------------------
    if (currentExerciseIndex >= total) {
        const doneList = currentTracking.exercises.map(ex => {
            const info = exerciseById.get(ex.id);
            const setsText = ex.sets.map(s => `${s.weight}×${s.reps}`).join(", ");
            return `
                <div class="tracking-ex-item done">
                    <div>
                        <div>${info ? esc(info.name) : "Unbekannt"}</div>
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
    const exInfo = exerciseById.get(ex.id);

    const setsChips = ex.sets.length > 0
        ? `<div class="tracking-sets">${ex.sets.map((s, i) => `<span class="set-chip" data-set-index="${i}">S${i + 1}: ${s.weight}kg × ${s.reps}</span>`).join("")}</div>`
        : "";

    const lastSession = getLastSessionData(ex.id);
    const lastSessionHtml = lastSession ? `
        <div class="last-session-hint">
            <div class="last-session-label">Letzte Einheit · ${lastSession.date}</div>
            <div class="tracking-sets" style="margin:0;">${lastSession.sets.map((s, i) =>
                `<span class="set-chip">S${i + 1}: ${s.weight}kg × ${s.reps}</span>`
            ).join("")}</div>
        </div>
    ` : "";

    const exerciseListHtml = currentTracking.exercises.map((item, idx) => {
        const info = exerciseById.get(item.id);
        const isCurrent = idx === currentExerciseIndex;
        return `
            <div class="tracking-ex-item${isCurrent ? " current" : idx < currentExerciseIndex ? " done" : ""}" data-idx="${idx}">
                <span>${info ? esc(info.name) : "Unbekannt"}</span>
                <span class="drag-handle">≡</span>
            </div>
        `;
    }).join("");

    const eta = getEstimatedTimeRemaining();
    const etaHtml = eta !== null
        ? `<div style="font-size:11px; color:#aaa; margin-top:3px;">~${Math.ceil(eta / 60)} min übrig</div>`
        : "";

    area.innerHTML = `
        <div class="tracking-header">
            <div class="tracking-ex-name">${exInfo ? esc(exInfo.name) : "Unbekannt"}</div>
            <div style="text-align:right;">
                <div class="tracking-progress">${done + 1} / ${total}</div>
                ${etaHtml}
            </div>
        </div>

        ${lastSessionHtml}

        <div class="tracking-input-card">
            <div class="tracking-input-row">
                <div class="tracking-input-group">
                    <label>Gewicht (kg)</label>
                    <input id="trackWeight" type="number" value="${ex.sets.at(-1)?.weight ?? ""}">
                    <div class="weight-quick-btns">
                        <button class="weight-quick-btn" onclick="adjustWeight(-5)">−5</button>
                        <button class="weight-quick-btn" onclick="adjustWeight(-2.5)">−2.5</button>
                        <button class="weight-quick-btn" onclick="adjustWeight(2.5)">+2.5</button>
                        <button class="weight-quick-btn" onclick="adjustWeight(5)">+5</button>
                    </div>
                </div>
                <div class="tracking-input-group">
                    <label>Wiederholungen</label>
                    <input id="trackReps" type="number" value="${ex.sets.at(-1)?.reps ?? ""}">
                    <div class="weight-quick-btns">
                        <button class="weight-quick-btn" onclick="adjustReps(-1)">−1</button>
                        <button class="weight-quick-btn" onclick="adjustReps(1)">+1</button>
                        <button class="weight-quick-btn" onclick="adjustReps(2)">+2</button>
                        <button class="weight-quick-btn" onclick="adjustReps(5)">+5</button>
                    </div>
                </div>
            </div>
            <button onclick="saveSet()" style="width:100%; margin:10px 0 0;">Satz speichern</button>
        </div>

        ${setsChips}

        <div style="display:flex; gap:8px;">
            <button onclick="nextExercise()" style="flex:2; margin:0; background:#34c759;">Nächste Übung →</button>
            <button onclick="finishWorkoutPrompt()" style="flex:1; margin:0; background:#ff3b30;">Workout Beenden 🛑</button>
        </div>

        <div class="tracking-exercise-list">${exerciseListHtml}</div>

        ${addExerciseBlock}
    `;

    addSetChipSwipeListeners();
    addExerciseDragListeners();
    addExerciseItemSwipeListeners();

    // After replacing the active-exercise area, restore the user's scroll position so
    // saving a set doesn't jump the page back to the top.
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
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
    setTimestamps.push(Date.now());
    renderTracking();
    vibrate(25);
    startRestTimer();

    const chips = document.querySelectorAll(".set-chip");
    const lastChip = chips[chips.length - 1];
    if (lastChip) lastChip.classList.add("anim-chip-pop");

    if (prevPR > 0 && weight > prevPR) {
        showPRToast(weight);
        vibrate([50, 30, 50]);
    }
}

// ---------------------------------------------------------
// NEXT EXERCISE
// ---------------------------------------------------------
function nextExercise() {
    currentExerciseIndex++;
    renderTracking();
    if (currentExerciseIndex >= currentTracking.exercises.length) {
        showConfetti();
        vibrate([50, 50, 100]);
    } else {
        vibrate(40);
    }
}

// ---------------------------------------------------------
// FINISH WORKOUT
// ---------------------------------------------------------
async function finishWorkoutPrompt() {
    const isComplete = currentExerciseIndex >= currentTracking.exercises.length;

    if (!isComplete) {
        const remaining = currentTracking.exercises.length - currentExerciseIndex;
        const ok = await confirmDialog({
            message: `Du hast noch ${remaining} Übung${remaining !== 1 ? "en" : ""} nicht abgeschlossen.\nMöchtest du das Workout trotzdem beenden?`,
            title: "Workout beenden?",
            confirmLabel: "Beenden",
            danger: true
        });
        if (!ok) return;
    }

    openPopup(`
        <h3>Workout beenden</h3>
        <label>Notiz (optional)</label>
        <textarea id="workoutNoteInput" style="height:100px; resize:vertical;" placeholder="z.B. Heute gut gefühlt..."></textarea>
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="finishWorkout()">Speichern</button>
        </div>
    `, "Workout beenden");
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
    setTimestamps = [];
    stopRestTimer();
    initRestTimerUI();

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

    const noteHtml = `
        <div style="margin-bottom:20px;">
            <label style="display:block; margin-bottom:8px; font-weight:500;">Notiz</label>
            <textarea id="workoutEditorNote" placeholder="z.B. Heute gut gefühlt..."
                      style="width:100%; height:80px; padding:10px; border:1px solid #ddd; border-radius:10px; font-size:14px; resize:vertical; box-sizing:border-box;">${w.note || ""}</textarea>
        </div>
    `;

    let contentHtml = noteHtml;

    w.exercises.forEach((ex, exIndex) => {
        const exInfo = exerciseById.get(ex.id);
        const name = exInfo ? exInfo.name : "Unbekannte Übung";

        contentHtml += `
            <div class="editor-exercise-block" style="margin-bottom:20px; padding:16px; background:#f9f9fb; border-radius:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h4 style="margin:0; font-size:15px; font-weight:600;">${esc(name)}</h4>
                    <button onclick="deleteEditorExercise(${exIndex})"
                            style="background:none; border:none; font-size:18px; cursor:pointer; color:#ff3b30; padding:0; margin:0;">×</button>
                </div>
        `;

        ex.sets.forEach((set, setIndex) => {
            contentHtml += `
                <div class="set-edit-row" style="display:flex; gap:8px; margin-bottom:10px; align-items:center;">
                    <input type="number" id="edit_weight_${exIndex}_${setIndex}"
                           value="${set.weight}" placeholder="Gewicht" style="flex:1;">
                    <input type="number" id="edit_reps_${exIndex}_${setIndex}"
                           value="${set.reps}" placeholder="Wdh" style="flex:1;">
                    <button onclick="deleteEditorSet(${exIndex}, ${setIndex})"
                            style="background:none; border:none; font-size:16px; cursor:pointer; color:#ff3b30; padding:8px; margin:0;">🗑️</button>
                </div>
            `;
        });

        contentHtml += `
                <button onclick="addEditorSet(${exIndex})"
                        style="width:100%; margin-top:8px; background:#f0f0f5; color:#007aff; border:none; padding:10px; border-radius:10px; cursor:pointer; font-weight:500;">+ Satz hinzufügen</button>
            </div>
        `;
    });

    const addExerciseButton = `
        <button onclick="addExerciseToWorkoutEditor()"
                style="width:100%; margin-bottom:20px; background:#007aff; color:white; border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:500; font-size:15px;">+ Übung hinzufügen</button>
    `;

    const footerHtml = `
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="saveWorkoutEditor()">Speichern</button>
        </div>
    `;

    openPopup(addExerciseButton + contentHtml + footerHtml, "Workout bearbeiten");
}

async function addExerciseToWorkoutEditor() {
    const w = workouts[workoutEditIndex];
    const usedExerciseIds = w.exercises.map(ex => ex.id);
    const availableExercises = exercises.filter(ex => !usedExerciseIds.includes(ex.id));

    let exerciseOptions = availableExercises
        .map(ex => `<option value="${ex.id}">${esc(ex.name)}</option>`)
        .join("");

    if (!exerciseOptions) {
        await alertDialog("Alle Übungen sind bereits in diesem Workout.", "Hinweis");
        return;
    }

    openPopup(`
        <label>Übung auswählen:</label>
        <select id="exerciseSelectForWorkout" style="margin-bottom:16px;">
            <option value="">-- Bitte wählen --</option>
            ${exerciseOptions}
        </select>
        <div class="popup-footer">
            <button onclick="closePopup()">Abbrechen</button>
            <button onclick="selectExerciseForWorkout()">Hinzufügen</button>
        </div>
    `, "Übung hinzufügen");
}

async function selectExerciseForWorkout() {
    const select = document.getElementById("exerciseSelectForWorkout");
    const exerciseId = select.value;

    if (!exerciseId) {
        await alertDialog("Bitte wählen Sie eine Übung aus.", "Hinweis");
        return;
    }

    const w = workouts[workoutEditIndex];
    w.exercises.push({
        id: exerciseId,
        sets: [{ weight: 0, reps: 0 }]
    });

    closePopup();
    openWorkoutEditor(workoutEditIndex);
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

    const noteEl = document.getElementById("workoutEditorNote");
    if (noteEl) {
        w.note = noteEl.value.trim();
    }

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
            const exInfo = exerciseById.get(ex.id);
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

function drawDetailChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || data.length < 2) return;

    canvas.width = canvas.offsetWidth || 400;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const padX = 30;
    const padY = 10;
    const padBottom = 20;
    const chartH = h - padY - padBottom;
    const chartW = w - padX * 2;

    ctx.clearRect(0, 0, w, h);

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const getX = i => padX + (i / (data.length - 1)) * chartW;
    const getY = v => padY + (1 - (v - min) / range) * chartH;

    const buildCurve = () => {
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(values[0]));
        for (let i = 1; i < values.length; i++) {
            const x0 = getX(i - 1), y0 = getY(values[i - 1]);
            const x1 = getX(i), y1 = getY(values[i]);
            const cpX = (x0 + x1) / 2;
            ctx.bezierCurveTo(cpX, y0, cpX, y1, x1, y1);
        }
    };

    // Gradient fill under the curve
    buildCurve();
    ctx.lineTo(getX(data.length - 1), padY + chartH);
    ctx.lineTo(getX(0), padY + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padY, 0, padY + chartH);
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
    const lx = getX(data.length - 1);
    const ly = getY(values[data.length - 1]);
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#007aff";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Y-axis labels (min, max)
    ctx.fillStyle = "#999";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(max), padX - 4, padY + 8);
    ctx.fillText(Math.round(min), padX - 4, padY + chartH + 4);

    // X-axis date labels (first, middle, last)
    ctx.textAlign = "center";
    const formatDate = dateStr => {
        const d = dateStr.split("-");
        return `${d[2]}.${d[1]}`;
    };
    ctx.fillText(formatDate(data[0].date), getX(0), h - 2);
    const mid = Math.floor(data.length / 2);
    ctx.fillText(formatDate(data[mid].date), getX(mid), h - 2);
    ctx.fillText(formatDate(data[data.length - 1].date), getX(data.length - 1), h - 2);
}

// ---------------------------------------------------------
// DASHBOARD – INSIGHTS (with collapsible progression)
// ---------------------------------------------------------
let progressionCollapsed = {};
let prSectionExpanded = true;
let prMoreExpanded = false;

function togglePRSection() {
    prSectionExpanded = !prSectionExpanded;
    const list = document.getElementById("pr-list");
    const arrow = document.getElementById("arrow-pr-section");
    if (list) list.style.display = prSectionExpanded ? "block" : "none";
    if (arrow) arrow.textContent = prSectionExpanded ? "▾" : "▸";
}

function togglePRMore() {
    prMoreExpanded = !prMoreExpanded;
    const hidden = document.getElementById("pr-hidden");
    const btn = document.getElementById("pr-more-btn");
    if (hidden) hidden.style.display = prMoreExpanded ? "block" : "none";
    if (btn) btn.textContent = prMoreExpanded ? "Weniger anzeigen ▲" : `Mehr anzeigen (${btn.dataset.count}) ▼`;
}

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
    if (dashboardCache && dashboardCache.thisWeek) return dashboardCache.thisWeek;
    const result = getWorkoutsForWeekOf(new Date());
    if (dashboardCache) dashboardCache.thisWeek = result;
    return result;
}

function getWorkoutsLastWeek() {
    if (dashboardCache && dashboardCache.lastWeek) return dashboardCache.lastWeek;
    const d = new Date();
    d.setDate(d.getDate() - 7);
    const result = getWorkoutsForWeekOf(d);
    if (dashboardCache) dashboardCache.lastWeek = result;
    return result;
}

function weeklyComparisonText(thisWeek, lastWeek) {
    if (thisWeek === 0 && lastWeek === 0) return "ℹ️ Noch keine Daten vorhanden";
    if (thisWeek > lastWeek) return `📈 +${thisWeek - lastWeek} Trainings mehr als letzte Woche`;
    if (thisWeek < lastWeek) return `📉 ${lastWeek - thisWeek} Trainings weniger als letzte Woche`;
    return "➡️ Gleich viele Trainings wie letzte Woche";
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
        <div class="popup-content">${entriesHtml}</div>
        <div class="popup-footer">
            <button onclick="closePopup()" style="width:100%;">Schließen</button>
        </div>
    `, "📋 Patch Notes");
}

function openSettingsMenu() {
    openPopup(`
        <div class="popup-content">
            <h3 style="margin:0 0 12px;">📦 Export / Import</h3>
            <button onclick="exportAll()">📤 Alles exportieren (JSON)</button>
            <input type="file" accept="application/json" onchange="handleImportFile(event)">

            <hr>

            <h3 style="margin:12px 0;">📊 CSV-Export</h3>
            <button onclick="exportCSVWorkouts()">Workouts.csv</button>
            <button onclick="exportCSVExercises()">Exercises.csv</button>
            <button onclick="exportCSVPlans()">Plans.csv</button>

            <hr>

            <h3 style="margin:12px 0;">⚙️ System</h3>
            <p style="margin:0;">App-Version: ${APP_VERSION}</p>
        </div>
        <div class="popup-footer">
            <button onclick="closePopup()" style="width:100%;">Schließen</button>
        </div>
    `, `⚙️ Einstellungen – v${APP_VERSION}`);
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

async function importAll(json) {
    try {
        const data = JSON.parse(json);

        if (!data.version) {
            await alertDialog("Ungültiges Backup: Version fehlt.", "Import fehlgeschlagen");
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

        await alertDialog("Backup erfolgreich importiert!", "Import erfolgreich");

    } catch (e) {
        console.error("IMPORT FEHLER:", e);
        await alertDialog("Fehler beim Import. Datei ungültig.", "Import fehlgeschlagen");
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



async function deleteAllAppData() {
    const ok = await confirmDialog({
        message: "Willst du wirklich ALLE Daten löschen?\nÜbungen, Kategorien, Pläne, Workouts und Tracking werden unwiderruflich entfernt.",
        title: "Alle Daten löschen",
        confirmLabel: "Alles löschen",
        danger: true
    });
    if (!ok) return;

    exercises = [];
    categories = [];
    plans = [];
    workouts = [];

    localStorage.clear();

    renderAll();
    await alertDialog("Alle App-Daten wurden gelöscht.", "Erledigt");
}


// ---------------------------------------------------------
// CSV EXPORT
// ---------------------------------------------------------
function exportCSVWorkouts() {
    let csv = "Datum;Plan;Übung;Satz;Gewicht;Wdh\n";

    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            const exInfo = exerciseById.get(ex.id);
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
// PERSONAL RECORDS & PROGRESS CALCULATIONS
// ---------------------------------------------------------
function calculateOneRM(weight, reps) {
    if (reps === 1) return weight;
    return Math.round((weight * (1 + reps / 30)) * 10) / 10;
}

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

function getPRsThisMonth() {
    const now = new Date();
    const thisMonthPrefix = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");

    const prMap = {};

    workouts.forEach(w => {
        if (w.date.startsWith(thisMonthPrefix)) {
            w.exercises.forEach(ex => {
                if (ex.sets.length > 0) {
                    const maxThisMonth = Math.max(...ex.sets.map(s => s.weight));

                    if (!prMap[ex.id]) {
                        prMap[ex.id] = maxThisMonth;
                    } else if (maxThisMonth > prMap[ex.id]) {
                        prMap[ex.id] = maxThisMonth;
                    }
                }
            });
        }
    });

    const prs = [];
    Object.keys(prMap).forEach(exerciseId => {
        const maxThisMonth = prMap[exerciseId];
        let prevBest = 0;

        workouts.forEach(w => {
            if (!w.date.startsWith(thisMonthPrefix)) {
                const ex = w.exercises.find(e => e.id === exerciseId);
                if (ex && ex.sets.length > 0) {
                    const max = Math.max(...ex.sets.map(s => s.weight));
                    if (max > prevBest) prevBest = max;
                }
            }
        });

        if (maxThisMonth > prevBest) {
            const exInfo = exerciseById.get(exerciseId);
            prs.push({
                id: exerciseId,
                name: exInfo ? exInfo.name : "Unbekannte Übung",
                newMax: maxThisMonth,
                prevMax: prevBest,
                delta: maxThisMonth - prevBest
            });
        }
    });

    return prs.sort((a, b) => b.delta - a.delta);
}

function getExerciseChartData(exerciseId) {
    const relevant = workouts
        .filter(w => w.exercises.some(ex => ex.id === exerciseId))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return relevant.map(w => {
        const ex = w.exercises.find(e => e.id === exerciseId);
        const bestSet = ex.sets.length > 0 ? Math.max(...ex.sets.map(s => s.weight)) : 0;
        const bestReps = ex.sets.find(s => s.weight === bestSet)?.reps || 1;
        const oneRM = calculateOneRM(bestSet, bestReps);

        return {
            date: w.date,
            weight: bestSet,
            oneRM: oneRM
        };
    });
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
    const exInfo = exerciseById.get(exerciseId);
    const name = exInfo ? exInfo.name : "Unbekannte Übung";
    const pr = getExercisePR(exerciseId);
    const chartData = getExerciseChartData(exerciseId);

    const relevant = workouts
        .filter(w => w.exercises.some(ex => ex.id === exerciseId))
        .reverse();

    let bestSet = { weight: 0, reps: 1 };
    if (relevant.length > 0) {
        const ex = relevant[0].exercises.find(e => e.id === exerciseId);
        const maxWeight = Math.max(...ex.sets.map(s => s.weight));
        bestSet = ex.sets.find(s => s.weight === maxWeight) || { weight: maxWeight, reps: 1 };
    }
    const estimatedOneRM = calculateOneRM(bestSet.weight, bestSet.reps);

    let html = `
        <h2>${esc(name)}</h2>
        <p>🏆 Persönlicher Rekord: <strong>${pr > 0 ? pr + " kg" : "–"}</strong></p>
        ${bestSet.weight > 0 ? `<p style="color:#666; font-size:14px;">Bestes Set: ${bestSet.weight} kg × ${bestSet.reps} Wdh<br>Geschätztes 1RM: <strong>${estimatedOneRM} kg</strong></p>` : ""}
        <hr>
    `;

    if (chartData.length > 0) {
        html += `
            <div class="detail-chart-tabs">
                <button class="detail-chart-tab active" onclick="switchChartTab('weight', '${exerciseId}')">Gewicht</button>
                <button class="detail-chart-tab" onclick="switchChartTab('oneRM', '${exerciseId}')">1RM</button>
            </div>
            <canvas id="exerciseDetailChart" height="130" style="width:100%; margin:10px 0;"></canvas>
        `;
    }

    html += `<div style="margin-top:10px;"><strong>Verlauf</strong></div>`;

    if (relevant.length === 0) {
        html += `<p>Noch keine Einträge vorhanden.</p>`;
    } else {
        relevant.forEach(w => {
            const ex = w.exercises.find(e => e.id === exerciseId);
            const volume = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
            const bestSet = ex.sets.length > 0 ? Math.max(...ex.sets.map(s => s.weight)) : 0;

            html += `
                <div class="history-entry">
                    <strong>${w.date}</strong>${w.plan !== "Freies Training" ? ` – ${esc(w.plan)}` : ""}
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

    if (chartData.length > 0) {
        setTimeout(() => {
            const weightData = chartData.map(d => ({ date: d.date, value: d.weight }));
            drawDetailChart("exerciseDetailChart", weightData);
        }, 0);
    }
}

function switchChartTab(tab, exerciseId) {
    const chartData = getExerciseChartData(exerciseId);
    if (chartData.length === 0) return;

    const tabs = document.querySelectorAll(".detail-chart-tab");
    tabs.forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");

    const data = tab === "weight"
        ? chartData.map(d => ({ date: d.date, value: d.weight }))
        : chartData.map(d => ({ date: d.date, value: d.oneRM }));

    drawDetailChart("exerciseDetailChart", data);
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
initRestTimerUI();
renderAll();
showPage("dashboard");

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    if (restTimerFinishedAt) {
        updateRestTimerOverUI();
        return;
    }
    if (!restTimerEndTime) return;
    const remaining = Math.ceil((restTimerEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
        restTimerRemaining = 0;
        stopRestTimer();
        vibrate([100, 50, 100]);
        restTimerFinishedAt = Date.now();
        updateRestTimerOverUI();
        restTimerOverInterval = setInterval(updateRestTimerOverUI, 1000);
    } else {
        restTimerRemaining = remaining;
        updateRestTimerUI();
    }
});
