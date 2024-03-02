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

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            displayValue = add(num1, num2);
            console.log(displayValue);
            break;
        case '-':
            displayValue = substract(num1, num2);
            console.log(displayValue);
            break;
        case '*':
            displayValue = multiply(num1, num2);
            console.log(displayValue);
            break;
        case '/':
            displayValue =  divide(num1, num2);
            console.log(displayValue);
            break;
    }    
}


const display = document.querySelector('.results');

const numButtons = document.querySelectorAll('.number');

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (document.querySelector('.results').textContent == 0) {
            document.querySelector('.results').textContent = '';
        }  
        if (operator) {
            secondNumber = document.querySelector('.results').textContent;
            document.querySelector('.results').textContent = '';
            operator = null;
        }
        document.querySelector('.results').textContent += button.textContent;
        console.log(display.textContent);
        });
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    document.querySelector('.results').textContent = 0;
})

const oper = document.querySelectorAll('.operator');

oper.forEach((oper) => {
    oper.addEventListener('click', () => {        
        operator = oper.textContent;
        firstNumber = display.textContent;
        document.querySelector('.results').textContent = firstNumber;
    })
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if (firstNumber && secondNumber && operator) {
        document.querySelector('.results').textContent = operate(operator, firstNumber, secondNumber);
    } else {
        display.textContent = 0;
    }    
})

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
})


