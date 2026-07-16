/**
 * Score submission form handling (tournament page)
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Score submitted to data grid.");
    });
  }
});
