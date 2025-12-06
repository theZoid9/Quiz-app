export const questionEl = document.getElementById("question");
export const optionsEl = document.getElementById("options");
export const msgEl = document.getElementById("output");

export const selectedId =
  new URLSearchParams(window.location.search).get("id") || "1";

export const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://your-backend-on-render.onrender.com";