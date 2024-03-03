function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function substract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {    
    if (num2 == 0) return "Oops!";
    return Number(num1) / Number(num2);
}

let displayValue;
let firstNumber;
let secondNumber;
let operator;
let eq;
let last = 0;
let next;

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            displayValue = add(num1, num2);   
            return displayValue;
        case '-':
            displayValue = substract(num1, num2);
            return displayValue;
        case '*':
            displayValue = multiply(num1, num2);
            return displayValue;
        case '/':
            displayValue =  divide(num1, num2);
            return displayValue;
    }    
}

const display = document.querySelector('.results');

const numButtons = document.querySelectorAll('.number');

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (last == 0) {
            display.textContent = '' + button.textContent;
        } else if (last == operator || last == eq) {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
        
        last = button.textContent;
    });
});

function handleNumbers(num) {
    if (!firstNumber) {
        firstNumber = num;
        return firstNumber;
    } else {
        secondNumber = num;
        return secondNumber;
    }
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    display.textContent = 0;
    last = 0;
    firstNumber = null;
    secondNumber = null;
    operator = null;
})

const oper = document.querySelectorAll('.operator');

oper.forEach((oper) => {
    oper.addEventListener('click', () => {
        if (!operator) {
            operator = oper.textContent;
            last = operator;
        } else {
            next = oper.textContent;
            last = next;
        }
        
        handleNumbers(Number(display.textContent));
        if (firstNumber && secondNumber && operator) {
            display.textContent = operate(operator, firstNumber, secondNumber);
            firstNumber = display.textContent;
            operator = next;
            secondNumber = null;
        }
    })
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    eq = equal.textContent;
    
    secondNumber = handleNumbers(Number(display.textContent));
    if (firstNumber && secondNumber && operator && last != operator) {
        display.textContent = operate(operator, firstNumber, secondNumber);
        firstNumber = display.textContent;
        secondNumber = null;
    } else {
        firstNumber = Number(display.textContent);
        secondNumber = null;
    }    
    last = eq;
})

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
})

const sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (display.textContent[0] == "-") {
        display.textContent = display.textContent.slice(1,display.textContent.length);
    } else {
        display.textContent = "-" + display.textContent;
    }
})


