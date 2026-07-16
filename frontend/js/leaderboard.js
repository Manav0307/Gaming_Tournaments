/**
 * Leaderboard and tournament page micro-interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button, a").forEach((el) => {
    el.addEventListener("mousedown", () => {
      if (el.classList.contains("shadow-[4px_4px_0px_0px_#1a1a1a]")) {
        el.style.transform = "translate(2px, 2px)";
        el.style.boxShadow = "none";
      }
      if (el.classList.contains("shadow-[6px_6px_0px_0px_#1a1a1a]")) {
        el.style.transform = "translate(4px, 4px)";
        el.style.boxShadow = "none";
      }
    });
    el.addEventListener("mouseup", () => {
      el.style.transform = "";
      el.style.boxShadow = "";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      el.style.boxShadow = "";
    });
  });
});
