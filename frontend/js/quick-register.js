/**
 * Quick Registration handling (tournament page)
 */
document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("quickRegisterBtn");
  const nameInput = document.getElementById("quickRegisterName");

  if (registerBtn && nameInput) {
    registerBtn.addEventListener("click", async () => {
      const playerName = nameInput.value.trim();
      
      if (!playerName) {
        alert("Please enter a player name to register.");
        return;
      }

      registerBtn.disabled = true;
      registerBtn.textContent = "REGISTERING...";

      try {
        // Find the player by name from the API
        const playersResponse = await fetch('http://localhost:5000/api/players');
        const playersData = await playersResponse.json();
        
        if (!playersData.success || !playersData.data) {
          throw new Error("Failed to fetch players list.");
        }

        const player = playersData.data.find(p => p.name.toLowerCase() === playerName.toLowerCase());
        
        if (!player) {
          throw new Error(`Player '${playerName}' does not exist in the database. Please sign up first.`);
        }

        // Extract tournament ID from the current URL path: /view/tournament/66c4..
        const parts = window.location.pathname.split("/");
        const tournamentId = parts.pop() || parts.pop(); 

        // Submit the registration
        const registerResponse = await fetch(`http://localhost:5000/api/tournaments/${tournamentId}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            playerId: player._id
          })
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          throw new Error(registerData.message || "Failed to register for tournament.");
        }

        alert(`Success! ${playerName} is now registered for this tournament!`);
        nameInput.value = "";
        
        // Refresh the page to update the registered count
        window.location.reload();

      } catch (error) {
        console.error("Error registering:", error);
        alert(error.message);
      } finally {
        registerBtn.disabled = false;
        registerBtn.textContent = "REGISTER NOW";
      }
    });
  }
});
