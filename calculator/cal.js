const display = document.getElementById("display");
const history = document.getElementById("history");

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate expression and update history
function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;

    const entry = document.createElement("div");
    entry.textContent = `${expression} = ${result}`;
    history.prepend(entry);

    if (history.children.length > 5) {
      history.removeChild(history.lastChild);
    }
  } catch {
    display.value = "Error";
  }
}

// Keyboard support with visual feedback
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/^[0-9+\-*/.%]$/.test(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    e.preventDefault();
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }

  const btn = document.querySelector(`button[data-key="${key}"]`);
  if (btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 100);
  }
});
