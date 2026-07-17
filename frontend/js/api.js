/**
 * Shared API configuration and utilities for ARENA.BAU
 */
const API_BASE_URL = "http://localhost:5000/api";

/**
 * Generic fetch wrapper for API requests
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}

/**
 * Micro-interactions for neo-brutalist buttons (index page)
 */
function initNeoBrutalShadowButtons() {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mousedown", () => {
      if (button.classList.contains("neo-brutal-shadow")) {
        button.style.transform = "translate(4px, 4px)";
        button.style.boxShadow = "none";
      }
    });
    button.addEventListener("mouseup", () => {
      if (button.classList.contains("neo-brutal-shadow")) {
        button.style.transform = "";
        button.style.boxShadow = "";
      }
    });
    button.addEventListener("mouseleave", () => {
      if (button.classList.contains("neo-brutal-shadow")) {
        button.style.transform = "";
        button.style.boxShadow = "";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "index") {
    initNeoBrutalShadowButtons();
  }
});
