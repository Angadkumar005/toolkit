const passwordDisplay = document.getElementById("password-display");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthIndicator = document.getElementById("strength-indicator");
const themeToggle = document.getElementById("theme-toggle");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");

const includeLower = document.getElementById("include-lower");
const includeUpper = document.getElementById("include-upper");
const includeNumber = document.getElementById("include-number");
const includeSymbol = document.getElementById("include-symbol");

const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

let passwordHistory = JSON.parse(localStorage.getItem("passwordHistory")) || [];

function updateHistoryUI() {
  historyList.innerHTML = "";
  passwordHistory.slice(-5).reverse().forEach((pwd) => {
    const li = document.createElement("li");
    li.textContent = pwd;
    historyList.appendChild(li);
  });
}

function saveToHistory(pwd) {
  passwordHistory.push(pwd);
  if (passwordHistory.length > 20) passwordHistory.shift(); // Limit history
  localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
  updateHistoryUI();
}

// Theme toggle
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙 Dark Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Update length text
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Password generation logic
function generatePassword() {
  let characters = "";
  if (includeLower.checked) characters += lowerSet;
  if (includeUpper.checked) characters += upperSet;
  if (includeNumber.checked) characters += numberSet;
  if (includeSymbol.checked) characters += symbolSet;

  if (characters === "") {
    alert("Please select at least one character type!");
    return;
  }

  const length = parseInt(lengthSlider.value);
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  passwordDisplay.value = password;
  animatePasswordDisplay();
  evaluateStrength(password);
  saveToHistory(password);
}

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  if (!passwordDisplay.value) return;
  navigator.clipboard.writeText(passwordDisplay.value);
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
});

// Strength checker
function evaluateStrength(password) {
  let strength = "Weak";
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (length >= 12 && hasUpper && hasLower && hasNumber && hasSymbol) {
    strength = "Strong";
  } else if (length >= 8 && (hasUpper || hasSymbol)) {
    strength = "Good";
  }

  strengthIndicator.innerHTML = `Strength: <span>${strength}</span>`;
}

// Animate password
function animatePasswordDisplay() {
  passwordDisplay.classList.add("animate");
  setTimeout(() => {
    passwordDisplay.classList.remove("animate");
  }, 300);
}

// Clear history button
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("passwordHistory");
  passwordHistory = [];
  updateHistoryUI();
});

// Generate on click
generateBtn.addEventListener("click", generatePassword);

// Initial history render
updateHistoryUI();
