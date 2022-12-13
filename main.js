let numValArr = [];
let operand = "";
let val1 = 0;
let val2 = 0;
let result = 0;

const buttons = document.querySelector(".button-container");
const numberButtons = document.querySelectorAll(".num");
const operandButtons = document.querySelectorAll(".operand");
const operateButton = document.querySelector(".operate");
const upperDisplay = document.querySelector(".upper-display");
const lowDisplay = document.querySelector(".lower-display");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumber(button.textContent));
});
operandButtons.forEach((button) => {
  button.addEventListener("click", () => addOperand(button.textContent));
});
operateButton.addEventListener("click", () => {
  handleValues();
  operate(operand, val1, val2);
});
clearButton.addEventListener("click", clear, false);
backspaceButton.addEventListener("click", backspace, false);
decimalButton.addEventListener("click", addDecimal, false);
document.addEventListener("keydown", keyboardInput, false);

function addition(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  if (num1 === 0 && num2 === 0) {
    return "!nice try";
  } else {
    return num1 / num2;
  }
}

function multiply(num1, num2) {
  return num1 * num2;
}

function remainder(num1, num2) {
  if (num1 == 0 && num2 == 0) {
    lowDisplay.textContent = "!nice try";
  } else {
    return num1 % num2;
  }
}

function operate(string, num1, num2) {
  console.log(string, num1, num2);
  switch (string) {
    case "+":
      operand = "";
      setResult(addition(+num1, +num2));
      break;
    case "-":
      operand = "";
      setResult(subtract(+num1, +num2));
      break;
    case "÷":
      operand = "";
      setResult(divide(+num1, +num2));
      break;
    case "x":
      operand = "";
      setResult(multiply(+num1, +num2));
      break;
    case "%":
      operand = "";
      setResult(remainder(+num1, +num2));
      break;
    default:
      break;
  }
}

function addNumber(number) {
  numValArr.push(number);
  lowDisplay.textContent = numValArr.join("");
  updateUpperDisplay(number);
}

function addOperand(clickedOperand) {
  if (lowDisplay.textContent !== 0) {
    if (operand === "") {
      operand = clickedOperand;
      updateUpperDisplay(operand);
    } else {
      handleValues();
      operate(operand, val1, val2);
      operand = clickedOperand;
      updateUpperDisplay(operand);
    }
  }
  handleValues();
}

function addDecimal() {
  if (!numValArr.includes(".")) {
    numValArr.push(".");
    lowDisplay.textContent = numValArr.join("");
    upperDisplay.textContent += ".";
  }
}

function clear() {
  val1 = 0;
  val2 = 0;
  numValArr = [];
  operand = "";
  lowDisplay.textContent = "0";
  upperDisplay.textContent = "";
}

function backspace() {
  if (numValArr.length > 0) {
    numValArr.pop();
    lowDisplay.textContent = numValArr.join("");
    upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
  }
  if (numValArr.length === 0) {
    lowDisplay.textContent = 0;
    upperDisplay.textContent = "";
  }
}

function setResult(num) {
  if (String(num).includes(".")) {
    result = parseFloat(num).toFixed(2);
    handleResult();
  } else {
    result = num;
    handleResult();
  }
}

function handleResult() {
  lowDisplay.textContent = result;
  if (result === "!nice try") {
    val1 = 0;
  }
  upperDisplay.textContent = result;
  val1 = result;
  result = 0;
  val2 = 0;
}

function handleValues() {
  if (val1 === 0 && numValArr.length > 0) {
    val1 = numValArr.join("");
    numValArr = [];
  } else if (val1 !== 0) {
    val2 = numValArr.join("");
    numValArr = [];
  }
}

function keyboardInput(event) {
  const { key } = event;
  const operands = ["+", "-", "%"];

  if (key >= 0 && +key <= 9) {
    addNumber(key);
  } else if (key == ".") {
    addDecimal();
  } else if (operands.includes(key)) {
    addOperand(key);
  } else if (key == "*") {
    addOperand("x");
  } else if (key == "/") {
    addOperand("÷");
  } else if (key == "=" || key == "Enter") {
    handleValues();
    operate(prevOperand, val1, val2);
  } else if (key == "Backspace") {
    backspace();
  }
}

function updateUpperDisplay(item) {
  let lastItemIsOperand = false;
  const displayArray = upperDisplay.textContent.split("");
  const operandArray = ["x", "+", "-", "%", "/"];

  if (operandArray.includes(item)) {
    operandArray.forEach((operand) => {
      if (operand == displayArray[displayArray.length - 1]) {
        lastItemIsOperand = true;
      }
    });
  }
  if (!lastItemIsOperand) {
    upperDisplay.textContent += item;
  }
}
