/**
 * Registration page interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const sideNav = document.getElementById("sideNav");
  let sideNavOpen = false;

  navToggle.addEventListener("click", () => {
    sideNavOpen = !sideNavOpen;
    if (sideNavOpen) {
      sideNav.style.transform = "translateX(0)";
      navToggle.querySelector("span").textContent = "close";
    } else {
      sideNav.style.transform = "translateX(-100%)";
      navToggle.querySelector("span").textContent = "menu";
    }
  });

  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "PROCESSED...";
    btn.classList.add("bg-primary-fixed", "text-primary");
    btn.classList.remove("bg-secondary", "text-white");

    setTimeout(() => {
      alert("PLAYER IDENTIFIED. WELCOME TO THE ARENA.");
      btn.textContent = originalText;
      btn.classList.remove("bg-primary-fixed", "text-primary");
      btn.classList.add("bg-secondary", "text-white");
      form.reset();
    }, 1000);
  });

  document.querySelectorAll(".neo-shadow").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
});
