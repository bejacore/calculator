function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '−':
            return subtract(num1, num2);
            break;
        case '×':
            return multiply(num1, num2);
            break;
        case '÷':
            return divide(num1, num2);
            break;
    }
}

function populate() {
    keys.forEach(key => {
        key.addEventListener('click', () => {
            displayValue += key.textContent;
            display.textContent = displayValue;
        });
    });
}

function operation() {
    operations.forEach(op => {
        op.addEventListener('click', () => {
            operator = op.textContent;
            firstNumber = display.textContent;
            displayValue = '';
        });
    });
}

function getResult() {
    equals.addEventListener('click', () => {
        secondNumber = displayValue;
        firstNumber = operate(operator, +firstNumber, +secondNumber);
        display.textContent = firstNumber;
    });
}

let displayValue = '';
let firstNumber;
let secondNumber;
let operator;

const keys = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('#equals');
const display = document.querySelector('.display');

populate();
operation();
getResult();