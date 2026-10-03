export const TUTORS = [
  { id: 1, name: "Анна", language: "Python", price: 1500 },
  { id: 2, name: "Иван", language: "JavaScript", price: 2000 },
  { id: 3, name: "Мария", language: "Scratch", price: 1000 },
];

/**
 * Фильтрует репетиторов по языку.
 * @param {Array} tutors
 * @param {string} language — пустая строка означает «все»
 */
export function filterTutors(tutors, language) {
  if (!language) return tutors;
  return tutors.filter((t) => t.language === language);
}

/**
 * Рендерит список репетиторов в переданный <ul>.
 */
export function renderTutors(listEl, tutors) {
  listEl.innerHTML = "";
  for (const t of tutors) {
    const li = document.createElement("li");
    li.className = "tutor";
    li.dataset.language = t.language;

    const name = document.createElement("p");
    name.className = "tutor__name";
    name.textContent = t.name;

    const meta = document.createElement("p");
    meta.className = "tutor__meta";
    meta.textContent = `${t.language} · ${t.price} ₽ / час`;

    li.append(name, meta);
    listEl.append(li);
  }
}

// Инициализация только в браузере — в тестах этого блока нет
if (typeof document !== "undefined" && document.getElementById("tutors-list")) {
  const listEl = document.getElementById("tutors-list");
  const emptyEl = document.getElementById("empty-message");
  const selectEl = document.getElementById("lang");

  renderTutors(listEl, TUTORS);

  selectEl.addEventListener("change", (e) => {
    const filtered = filterTutors(TUTORS, e.target.value);
    renderTutors(listEl, filtered);
    emptyEl.hidden = filtered.length > 0;
  });
}