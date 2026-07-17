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
  // Handle Form Submission
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevents the browser from turning the screen white/reloading

      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData.entries());

      // Basic client-side validation
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // Send the data silently in the background
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Success: " + result.message);
          signupForm.reset(); // Clear the form so they stay on the page
        } else {
          alert("Failed: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error, could not reach the server.");
      }
    });
  }
});
