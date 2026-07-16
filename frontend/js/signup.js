/**
 * Signup page interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("translate-x-2");
      input.parentElement.style.transition = "transform 0.2s ease-out";
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("translate-x-2");
    });
  });

  // Simple ticker animation simulation
  const footer = document.querySelector("footer div");
  let x = 0;
  function animateTicker() {
    x -= 0.5;
    if (x < -500) x = 0;
    footer.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animateTicker);
  }
  // animateTicker(); // Disabled to prevent excessive motion if not needed
});
