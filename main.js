const calDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const deleteBtn = document.querySelector(".delete");

// Calculate first and second value based on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current number is 0, replace it if not add number to display
    calDisplay.textContent == "0"
      ? (calDisplay.textContent = number)
      : (calDisplay.textContent += number);
  }
}

function addDecimal(dot) {
  // If operator is pressed dont add decimal
  if (awaitingNextValue) return;
  // If no decimal add one
  if (!calDisplay.textContent.includes(".")) {
    calDisplay.textContent = `${calDisplay.textContent}${dot}`;
  }
}

function useOperator(operator) {
  const currentValue = parseInt(calDisplay.textContent);
  // prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Adding Event Listeners to relevant Buttons
inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("operator")) {
    btn.addEventListener("click", () => useOperator(btn.value));
  } else if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", () => addDecimal(btn.value));
  }
});

deleteBtn.addEventListener("click", () => {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calDisplay.textContent = "0";
});
