const currentDisplay = document.querySelector("#current-operand");
const previousDisplay = document.querySelector("#previous-operand");
let currentInput = "0";
let previousInput = "";
let currentOperator = null;
const buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent;
    if (button.classList.contains("number-btn")) {
      handleNumber(value);
    } else if (button.classList.contains("operator-btn")) {
      handleOperator(value);
    } else {
      const action = button.dataset.action;
      if (action === "clear") clearCalculator();
      if (action === "delete") deleteLast();
      if (action === "calculate") calculate();
      if (action === "toggle-sign") toggleSign();
      if (action === "percent") calculatePercent();
    }
    updateScreen();
  });
});
function handleNumber(number) {
  if (currentInput === "0" && number === "0") return;
  if (number === "." && currentInput.includes(".")) return;
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
}
function handleOperator(operator) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = "";
}
function calculate() {
  if (previousInput === "" || currentInput === "" || currentOperator === null)
    return;
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (currentOperator === "+") {
    result = prev + current;
  } else if (currentOperator === "−") {
    result = prev - current;
  } else if (currentOperator === "×") {
    result = prev * current;
  } else if (currentOperator === "÷") {
    if (current === 0) {
      alert("0-a bölmək olmaz!");
      clearCalculator();
      return;
    }
    result = prev / current;
  }
  currentInput = String(result);
  currentOperator = null;
  previousInput = "";
}
function clearCalculator() {
  currentInput = "0";
  previousInput = "";
  currentOperator = null;
}
function deleteLast() {
  if (currentInput === "0" || currentInput === "") return;
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "") {
    currentInput = "0";
  }
}
function toggleSign() {
  if (currentInput === "0" || currentInput === "") return;
  if (currentInput.startsWith("-")) {
    currentInput = currentInput.slice(1);
  } else {
    currentInput = "-" + currentInput;
  }
}
function calculatePercent() {
  if (currentInput === "") return;
  currentInput = String(parseFloat(currentInput) / 100);
}
function updateScreen() {
  currentDisplay.textContent = currentInput;
  if (currentOperator !== null) {
    previousDisplay.textContent = previousInput + " " + currentOperator;
  } else {
    previousDisplay.textContent = "";
  }
}
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if ((key >= "0" && key <= "9") || key === ".") {
    handleNumber(key);
  }
  if (key === "+" || key === "-") handleOperator(key === "-" ? "−" : "+");
  if (key === "*") handleOperator("×");
  if (key === "/") handleOperator("÷");
  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  }
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearCalculator();
  if (key === "%") calculatePercent();
  updateScreen();
});
