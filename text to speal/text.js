const voiceSelect = document.getElementById("voice-select");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");
const themeToggle = document.getElementById("theme-toggle");

// Load stored theme preference
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙 Dark Mode";
} else {
  themeToggle.textContent = "☀️ Light Mode";
}

// Theme Toggle Handler
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Voice setup
function populateVoices() {
  const voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " [default]" : ""}`;
    voiceSelect.appendChild(option);
  });
}
window.speechSynthesis.onvoiceschanged = populateVoices;

// Slider updates
rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});
pitchInput.addEventListener("input", () => {
  pitchValue.textContent = pitchInput.value;
});

// Speech function
function speakText() {
  const text = document.getElementById("text-input").value.trim();
  if (!text) {
    alert("Please enter some text.");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) speech.voice = selectedVoice;
  speech.rate = parseFloat(rateInput.value);
  speech.pitch = parseFloat(pitchInput.value);

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}
