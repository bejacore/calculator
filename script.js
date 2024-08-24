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

let calculator = {
    displayValue: '',
    firstNumber: null,
    secondNumber: null,
    operator: null,
    operatorWaiter: false,
};

const keys = document.querySelectorAll('.num');
keys.forEach(key => {
    key.addEventListener('click', () => {
        calculator.displayValue += key.textContent;
        display.textContent = +calculator.displayValue;
    });
});

const operations = document.querySelectorAll('.operation');
operations.forEach(op => {
    op.addEventListener('click', () => {
        calculator.operator = op.textContent;
        if (calculator.operatorWaiter === false) {
            calculator.operatorWaiter = true;
            calculator.firstNumber = display.textContent;
        } else {
            calculator.secondNumber = calculator.displayValue;
            calculator.firstNumber = operate(
                calculator.operator,
                +calculator.firstNumber,
                +calculator.secondNumber,
            );
            display.textContent = calculator.firstNumber;
        }
        calculator.displayValue = '';
    });
});

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (!calculator.operator) {
        display.textContent = 0;
    } else {
        calculator.operatorWaiter = false;
        calculator.secondNumber = calculator.displayValue;
        calculator.firstNumber = operate(
        calculator.operator, 
        +calculator.firstNumber, 
        +calculator.secondNumber
        );
        display.textContent = calculator.firstNumber;
    }
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.operator = null;
    calculator.operatorWaiter = false;
    calculator.displayValue = 0;
    display.textContent = calculator.displayValue;
});

const display = document.querySelector('.display');