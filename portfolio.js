const works = [
    {
        id: 1,
        title: "Практическая работа №1",
        description: "Работа с формами в JavaScript ",
        category: "html"
    },
    {
        id: 2,
        title: "Практическая работа №2",
        description: "Интерактивный веб-каталог с использованием JSON, API, jQuery и Bootstrap",
        category: "html"
    },
    {
        id: 3,
        title: "Практическая работа №3",
        description: "Библиотека jQuery, Фреймворк Bootstrap, Основы React.js и Состояния/События",
        category: "html"
    },
    {
        id: 4,
        title: "Практическая работа №4",
        description: "Современные фронтенд-фреймворки (Vue.js, Angular), основы TypeScript и архитектура SPA",
        category: "js"
    },
    {
        id: 5,
        title: "Практическая работа №5",
        description: "Progressive Web Apps (PWA), WebAssembly, разработка с использованием Web API и тестирование",
        category: "js"
    },
    {
        id: 6,
        title: "Практическая работа №6",
        description: "Основы безопасности в веб-разработке, инструменты DevTools, системы контроля версий (Git) и основы сборки (Webpack)",
        category: "tools"
    },
    {
        id: 7,
        title: "Практическая работа №6.2",
        description: "Основы безопасности в веб-разработке, инструменты DevTools, системы контроля версий (Git) и основы сборки (Webpack)",
        category: "tools"
    },
    {
        id: 8,
        title: "Практическая работа №7",
        description: "Работа с изображениями, облачные базы данных (Firebase), контейнеризация (Docker) и основы CI/CD ",
        category: "js"
    },
    {
        id: 9,
        title: "Практическая работа №8",
        description: " SEO-оптимизация, веб-аналитика и метрики, доступность (Accessibility / a11y) и публикация проекта (Деплой)",
        category: "js"
    },
    {
        id: 10,
        title: "Практическая работа №9",
        description: "Производительность и оптимизация загрузки, архитектура веб-приложений, финальная интеграция и защита итогового мини-проекта",
        category: "tools"
    },
    {
        id: 11,
        title: "Практическая работа №10",
        description: "Подготовка к защите учебного проекта, презентация функционала, рефакторинг кода и итоговый аудит качества",
        category: "tools"
    }
];
const workList = document.getElementById("work-list");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const filters = document.querySelectorAll(".filter");
let completedWorks = JSON.parse(
    localStorage.getItem("completedWorks")
) || [];
function renderWorks(filter = "all") {
    workList.innerHTML = "";
    const filteredWorks = works.filter(work => {
        return filter === "all" || work.category === filter;
    });
    if (filteredWorks.length === 0) {
        workList.innerHTML = "<p>Ничего не найдено.</p>";
        return;
    }
    filteredWorks.forEach(work => {
        const isCompleted = completedWorks.includes(work.id);
        const card = document.createElement("div");
        card.className = "work-card";
        card.innerHTML = `
            <h3>${work.title}</h3>
            <p>${work.description}</p>
            <label>
                <input
                    type="checkbox"
                    data-id="${work.id}"
                    ${isCompleted ? "checked" : ""}
                >
                Сдано
            </label>
        `;
        workList.appendChild(card);
    });
}
function updateProgress() {
    const completed = completedWorks.length;
    const total = works.length;
    const percentage = (completed / total) * 100;
    progressText.textContent = `${completed} / ${total}`;
    progressFill.style.width = `${percentage}%`;
}
function saveProgress() {
    localStorage.setItem(
        "completedWorks",
        JSON.stringify(completedWorks)
    );
    updateProgress();
}
workList.addEventListener("change", function(event) {
    if (event.target.type !== "checkbox") return;
    const workId = Number(event.target.dataset.id);
    if (event.target.checked) {
        if (!completedWorks.includes(workId)) {
            completedWorks.push(workId);
        }
    } else {
        completedWorks = completedWorks.filter(id => id !== workId);
    }
    saveProgress();
});
filters.forEach(button => {
    button.addEventListener("click", function() {
        filters.forEach(filter => filter.classList.remove("active"));
        this.classList.add("active");
        renderWorks(this.dataset.filter);
    });
});
renderWorks();
updateProgress();