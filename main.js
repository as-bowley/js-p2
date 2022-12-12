const buttons = document.querySelector(".button-container");
const upperDisplay = document.querySelector(".upper-display");
const lowDisplay = document.querySelector(".lower-display");
const add = document.querySelector("#addition");
const sub = document.querySelector("#subtract");
const multi = document.querySelector("#multiply");
const divi = document.querySelector("#divide");
const equals = document.querySelector("#equals");
const clear = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");

buttons.addEventListener("click", input, false);
clear.addEventListener("click", clearFun, false);
backspaceButton.addEventListener("click", backspace, false);
decimalButton.addEventListener("click", decimal, false);
document.addEventListener("keydown", keyInput, false);

let numValArr = [];
let operArr = [];
let prevOperand = "";
let currOperand = "";
let val1 = 0;
let val2 = 0;
let result = 0;

function input(e) {
  if (e.target.className == "num") {
    let clickedItem = e.target.id;
    numValArr.push(clickedItem);
    lowDisplay.textContent = numValArr.join("");
    updateUpperDisplay(clickedItem);
  } else if (e.target.className == "operand") {
    numCheck();
    if (prevOperand === "") {
      let clickedItem = e.target.textContent;
      prevOperand = clickedItem;
      updateUpperDisplay(clickedItem);
    } else if (prevOperand !== "" && currOperand !== "") {
      let clickedItem = e.target.textContent;
      prevOperand = currOperand;
      currOperand = clickedItem;
      updateUpperDisplay(clickedItem);
    } else {
      let clickedItem = e.target.textContent;
      currOperand = clickedItem;
      operate(prevOperand, val1, val2);
      updateUpperDisplay(clickedItem);
    }
  } else if (e.target.className === "operate") {
    numCheck();
    operate(prevOperand, val1, val2);
  }
}

function setOperand() {
  prevOperand = currOperand;
  currOperand = "";
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
  } else {
    val1 = result;
  }
  result = 0;
  val2 = 0;
}

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
    result = num1 % num2;
    handleResult();
  }
}

function numCheck() {
  if (val1 === 0 && numValArr.length > 0) {
    val1 = numValArr.join("");
    numValArr = [];
  } else if (numValArr.length > 0) {
    val2 = numValArr.join("");
    numValArr = [];
  }
}

function operate(string, num1, num2) {
  switch (string) {
    case "+":
      setOperand();
      setResult(addition(+num1, +num2));
      break;
    case "-":
      setOperand();
      setResult(subtract(+num1, +num2));
      break;
    case "÷":
      setOperand();
      setResult(divide(+num1, +num2));
      break;
    case "x":
      setOperand();
      setResult(multiply(+num1, +num2));
      break;
    case "%":
      remainder(+num1, +num2);
      break;
    default:
      break;
  }
}

function clearFun() {
  val1 = 0;
  val2 = 0;
  numValArr = [];
  prevOperand = "";
  currOperand = "";
  lowDisplay.textContent = "0";
  upperDisplay.textContent = "";
}

function backspace() {
  // delete from upper display & prevent another operand from being pressed
  if (numValArr.length > 0) {
    numValArr.pop();
    lowDisplay.textContent = numValArr.join("");
    if (numValArr.length == 0) {
      lowDisplay.textContent = 0;
    }
  }
}

function decimal() {
  if (!numValArr.includes(".")) {
    numValArr.push(".");
    lowDisplay.textContent = numValArr.join("");
  }
}

function keyInput(e) {
  console.log(e.key);
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
