import { describe, it, expect, beforeEach } from "vitest";
import { TUTORS, filterTutors, renderTutors } from "../src/app.js";

describe("filterTutors", () => {
  it("возвращает всех, если язык не указан", () => {
    expect(filterTutors(TUTORS, "")).toHaveLength(3);
  });

  it("фильтрует по Python", () => {
    const result = filterTutors(TUTORS, "Python");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Анна");
  });

  it("возвращает пустой массив для неизвестного языка", () => {
    expect(filterTutors(TUTORS, "Haskell")).toEqual([]);
  });
});

describe("renderTutors", () => {
  let listEl;

  beforeEach(() => {
    document.body.innerHTML = '<ul id="tutors-list"></ul>';
    listEl = document.getElementById("tutors-list");
  });

  it("рендерит три карточки для полного списка", () => {
    renderTutors(listEl, TUTORS);
    expect(listEl.querySelectorAll("li.tutor")).toHaveLength(3);
  });

  it("отображает имя и цену первого репетитора", () => {
    renderTutors(listEl, [TUTORS[0]]);
    const card = listEl.querySelector("li.tutor");
    expect(card.textContent).toContain("Анна");
    expect(card.textContent).toContain("1500");
    expect(card.textContent).toContain("Python");
  });

  it("перезаписывает предыдущий рендер, а не добавляет", () => {
    renderTutors(listEl, TUTORS);
    renderTutors(listEl, [TUTORS[0]]);
    expect(listEl.querySelectorAll("li.tutor")).toHaveLength(1);
  });

  it("проставляет data-language для фильтрации", () => {
    renderTutors(listEl, TUTORS);
    const pythonCard = listEl.querySelector('[data-language="Python"]');
    expect(pythonCard).not.toBeNull();
  });
});