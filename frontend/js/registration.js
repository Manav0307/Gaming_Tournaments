/**
 * Registration page interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const sideNav = document.getElementById("sideNav");
  let sideNavOpen = false;

  if (navToggle && sideNav) {
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
  }

  const tournamentSelect = document.getElementById("tourna");
  const form = document.getElementById("registrationForm");

  const setStatus = (message, type = "normal") => {
    let statusEl = document.getElementById("registrationStatus");
    if (!statusEl) {
      statusEl = document.createElement("p");
      statusEl.id = "registrationStatus";
      statusEl.className = "font-body text-sm font-bold uppercase text-center mt-4";
      form.appendChild(statusEl);
    }

    statusEl.textContent = message;
    statusEl.classList.remove("text-secondary", "text-primary", "opacity-60");
    if (type === "error") {
      statusEl.classList.add("text-secondary");
    } else if (type === "success") {
      statusEl.classList.add("text-primary");
    } else {
      statusEl.classList.add("opacity-60");
    }
  };

  const populateTournaments = async () => {
    if (!tournamentSelect) return;

    try {
      const response = await apiFetch("/tournaments");
      const payload = await response.json();
      const tournaments = Array.isArray(payload?.data) ? payload.data : [];

      tournamentSelect.innerHTML = '<option value="" disabled selected>SELECT_TOURNAMENT</option>';

      if (tournaments.length === 0) {
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.disabled = true;
        emptyOption.selected = true;
        emptyOption.textContent = "NO_TOURNAMENTS_AVAILABLE";
        tournamentSelect.appendChild(emptyOption);
        tournamentSelect.disabled = true;
        setStatus("No tournaments are available right now.", "error");
        return;
      }

      tournaments.forEach((tournament) => {
        const option = document.createElement("option");
        option.value = tournament._id;
        option.textContent = tournament.name;
        tournamentSelect.appendChild(option);
      });

      setStatus("Choose a tournament to continue.");
    } catch (error) {
      console.error("Failed to load tournaments:", error);
      tournamentSelect.innerHTML = '<option value="" disabled selected>FAILED_TO_LOAD_TOURNAMENTS</option>';
      tournamentSelect.disabled = true;
      setStatus("Could not load tournaments from the server.", "error");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").trim();
    const email = (formData.get("email") || "").trim();
    const tournamentId = formData.get("tourna");

    if (!name || !email || !tournamentId) {
      setStatus("All registration fields are required.", "error");
      return;
    }

    try {
      btn.disabled = true;
      btn.textContent = "PROCESSING...";
      setStatus("Submitting registration...");

      const playersResponse = await apiFetch("/players");
      const playersPayload = await playersResponse.json();
      const existingPlayers = Array.isArray(playersPayload?.data) ? playersPayload.data : [];
      let player = existingPlayers.find((entry) => entry.email === email);

      if (!player) {
        const createPlayerResponse = await apiFetch("/players", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            country: "GLOBAL",
          }),
        });

        const createPlayerPayload = await createPlayerResponse.json();
        if (!createPlayerResponse.ok) {
          throw new Error(createPlayerPayload?.message || "Player creation failed");
        }

        player = createPlayerPayload.data;
      }

      const registrationResponse = await apiFetch(`/tournaments/${tournamentId}/register`, {
        method: "POST",
        body: JSON.stringify({
          playerId: player._id,
        }),
      });

      const registrationPayload = await registrationResponse.json();
      if (!registrationResponse.ok) {
        throw new Error(registrationPayload?.message || "Registration failed");
      }

      setStatus(registrationPayload?.message || "Registration complete.", "success");
      form.reset();
      if (tournamentSelect) {
        tournamentSelect.selectedIndex = 0;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus(error.message || "Registration could not be completed.", "error");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  populateTournaments();

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
