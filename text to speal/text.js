const themeToggle = document.getElementById("theme-toggle");

// 🌗 Theme setup
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙 Dark Mode";
} else {
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// 🗣️ Speak text with default voice
function speakText() {
  const text = document.getElementById("text-input").value.trim();
  if (!text) {
    alert("Please enter some text.");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  window.speechSynthesis.speak(speech);
}
