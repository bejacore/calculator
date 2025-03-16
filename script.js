function add(num1, num2) {
    return roundNumber(num1 + num2);
}

function subtract(num1, num2) {
    return roundNumber(num1 - num2);
}

function multiply(num1, num2) {
    return roundNumber(num1 * num2);
}

function divide(num1, num2) {
    return roundNumber(num1 / num2);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            if (num2 === 0) {
                return 'Hmm, nop';
            }
            return divide(num1, num2);
            break;
    }
}

function roundNumber(num) {
    const roundLength = 1000000
    if (!Number.isInteger(num)) {
        return Math.round((num + Number.EPSILON) * roundLength) / roundLength;
    }

    return num;
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
        if (display.textContent === '0' && key.textContent === '0'){
            display.textContent = '0';
        } else {
            calculator.displayValue += key.textContent;
            display.textContent = calculator.displayValue;
        }
    });
});

const operations = document.querySelectorAll('.operation');
operations.forEach(op => {
    op.addEventListener('click', () => {
        if (!calculator.operatorWaiter) {
            calculator.operatorWaiter = true;
            calculator.firstNumber = display.textContent;
            calculator.operator = op.textContent;
        } else {
            calculator.secondNumber = +calculator.displayValue;
            calculator.firstNumber = operate(
                calculator.operator,
                +calculator.firstNumber,
                +calculator.secondNumber,
            );
            calculator.operator = op.textContent;
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
        calculator.secondNumber = +calculator.displayValue;
        calculator.firstNumber = operate(
            calculator.operator, 
            +calculator.firstNumber, 
            +calculator.secondNumber
        );
        calculator.displayValue = '';
        display.textContent = calculator.firstNumber;
    }
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.operator = null;
    calculator.operatorWaiter = false;
    calculator.displayValue = '';
    display.textContent = '0';
});

const percentage = document.querySelector('#percentage');
percentage.addEventListener('click', () => {
    calculator.displayValue = `${+calculator.displayValue/100}`;
    display.textContent = calculator.displayValue;
});

const plusMinus = document.querySelector('#plus-minus');
plusMinus.addEventListener('click', () => {
    calculator.displayValue = -1 * display.textContent;
    display.textContent = calculator.displayValue;
});

const comma = document.querySelector('#comma');
comma.addEventListener('click', () => {
    if (calculator.displayValue.includes('.')) return;
    if (calculator.displayValue === '') {
        calculator.displayValue = '0.';
        display.textContent = calculator.displayValue;
    } else {
        calculator.displayValue += comma.textContent;
        display.textContent = calculator.displayValue;
    }
});

const display = document.querySelector('.display');

document.addEventListener('keyup', event => {
    if (!isNaN(+event.key)) {
        if (display.textContent === '0' && event.key === '0'){
            display.textContent = '0';
        } else {
            calculator.displayValue += event.key;
            display.textContent = calculator.displayValue;
        }
    }

    switch (event.key) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (!calculator.operatorWaiter) {
                calculator.operatorWaiter = true;
                calculator.firstNumber = display.textContent;
                calculator.operator = event.key;
            } else {
                calculator.secondNumber = +calculator.displayValue;
                calculator.firstNumber = operate(
                    calculator.operator,
                    +calculator.firstNumber,
                    +calculator.secondNumber,
                );
                calculator.operator = event.key;
                display.textContent = calculator.firstNumber;
            }
            calculator.displayValue = '';
            break;
        
        case '=':
        case 'Enter':
            if (!calculator.operator) {
                display.textContent = 0;
            } else {
                calculator.operatorWaiter = false;
                calculator.secondNumber = +calculator.displayValue;
                calculator.firstNumber = operate(
                    calculator.operator, 
                    +calculator.firstNumber, 
                    +calculator.secondNumber
                );
                calculator.displayValue = '';
                display.textContent = calculator.firstNumber;
            }
            break;

        case '%':
            calculator.displayValue = `${+calculator.displayValue/100}`;
            display.textContent = calculator.displayValue;

        case '.':
            if (calculator.displayValue.includes('.')) return;
            if (calculator.displayValue === '') {
                calculator.displayValue = '0.';
                display.textContent = calculator.displayValue;
            } else {
                calculator.displayValue += event.key;
                display.textContent = calculator.displayValue;
            }
            break;
        
        case 'Backspace':
            calculator.displayValue  = `${calculator.displayValue}`.slice(0, -1);
            if (calculator.displayValue === '') {
                display.textContent = 0;
                return;
            }
            display.textContent = calculator.displayValue;
            break;
        
        case 'Escape':
            calculator.firstNumber = null;
            calculator.secondNumber = null;
            calculator.operator = null;
            calculator.operatorWaiter = false;
            calculator.displayValue = '';
            display.textContent = '0';
            break;
    }
});