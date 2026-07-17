/**
 * Score submission form handling (tournament page)
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submitScoreForm");
  const playerNameInput = document.getElementById("playerNameInput");
  const finalScoreInput = document.getElementById("finalScoreInput");
  const submitBtn = document.getElementById("submitScoreBtn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const playerName = playerNameInput.value.trim();
      const score = parseInt(finalScoreInput.value.trim(), 10);
      
      if (!playerName || isNaN(score)) {
        alert("Please enter a valid player name and score.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "PROCESSING...";

      try {
        // Find the player by name from the API
        const playersResponse = await fetch('http://localhost:5000/api/players');
        const playersData = await playersResponse.json();
        
        if (!playersData.success || !playersData.data) {
          throw new Error("Failed to fetch players list.");
        }

        const player = playersData.data.find(p => p.name.toLowerCase() === playerName.toLowerCase());
        
        if (!player) {
          throw new Error(`Player '${playerName}' not found in database. Please register them first.`);
        }

        // Extract tournament ID from the current URL path: /view/tournament/66c4..
        const parts = window.location.pathname.split("/");
        const tournamentId = parts.pop() || parts.pop(); // handle trailing slash

        // Submit the score
        const scoreResponse = await fetch(`http://localhost:5000/api/tournaments/${tournamentId}/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            playerId: player._id,
            score: score
          })
        });

        const scoreData = await scoreResponse.json();

        if (!scoreResponse.ok) {
          throw new Error(scoreData.message || "Failed to submit score.");
        }

        alert("Score successfully submitted and saved to the database!");
        form.reset();

      } catch (error) {
        console.error("Error submitting score:", error);
        alert(error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "VERIFY & SEND";
      }
    });
  }
});
