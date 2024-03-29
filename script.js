﻿bod = document.querySelector('body');
bod.addEventListener('keydown', (event) => {
    if (isNumeric(event.key)) {
        enterSymbol(event.key);
    } else if (event.key == ".") {
        enterDot();
    } else if (event.key == "=" || event.key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (["+","-","*","/"].includes(event.key)) {

        if (operator === null) {
            operator = event.key;            
        } else {
            firstNumber = calculate();
            secondNumber = null;
            isFirstNumberActive = true;
            operator = event.key;
        }

        manageOperator(operator);

    } else if (event.key == "Backspace") {
        deleteSymbol();
    }
},
    true,
);

function isNumeric(key) {
    return /^[0-9]$/.test(key);
}

const display = document.querySelector('.results');

let firstNumber = null;
let secondNumber = null;
let operator = null;
let isFirstNumberActive = true;
let lastValue = null;

function enterSymbol(symbol) {
    if (display.textContent.length >= 19) {
        display.textContent = display.textContent;
    } else if (!lastValue && display.textContent == "0.") {
        display.textContent += symbol;            
    } else if (lastValue == 0 && display.textContent.length == 1) {
        display.textContent = '' + symbol;            
    } else if (lastValue == "=") {
        clearAll();
        display.textContent = symbol;
    } else if (lastValue == operator || lastValue == "sqrt") {
        display.textContent = symbol;
    } else {
        display.textContent += symbol;
    }

    lastValue = symbol;
}

function enterDot() {

    if (lastValue == operator) {
        display.textContent = 0 + ".";
        lastValue = ".";
    } else if (lastValue == "=" || last == "sqrt") {
        clearAll();
        display.textContent = 0 + ".";
        lastValue = ".";
    } else if (!display.textContent.includes(".")) {
        display.textContent += ".";
        lastValue = ".";
    }       

    lastValue = ".";
}

function manageOperator(operator) {       

    handleNumbers(Number(display.textContent));

    if (display.textContent == "Oops!" || firstNumber === null) {
        clearAll();
    } else if (lastValue == "=" || lastValue == "sqrt") {
        firstNumber = Number(display.textContent);
        secondNumber = null;
    } else if (isFirstNumberActive) {
        isFirstNumberActive = false;
        firstNumber = Number(display.textContent);
    } else {
        isFirstNumberActive = true;
        secondNumber = Number(display.textContent);  
        display.textContent = operate(operator, firstNumber, secondNumber);
            if (display.textContent == "Oops!") {            
                clearAll();
                display.textContent = "Oops!";
            } else {                           
                display.textContent = roundFloat(display.textContent);
                firstNumber = Number(display.textContent);
                secondNumber = null;
                isFirstNumberActive = false;
            } 
    }  
    
    lastValue = operator;
}

function calculate() {

    handleNumbers(Number(display.textContent)); 

    if (firstNumber !== null && secondNumber !== null && operator && lastValue != operator) {
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        display.textContent = operate(operator, firstNumber, secondNumber);
        if (display.textContent == "Oops!") {                                   
            clearAll();
            lastValue = "=";
            return display.textContent = "Oops!";
        } else {
            let result = roundFloat(display.textContent);
            clearAll();
            display.textContent = firstNumber = result;
            isFirstNumberActive = false;
            lastValue = "=";
            return result;
        }
    } else {
        firstNumber = Number(display.textContent);
        isFirstNumberActive = false;
        secondNumber = null;
        lastValue = "=";
    }      
}

function add(firstNumber, secondNumber) {
    return Number(firstNumber) + Number(secondNumber);
}

function substract(firstNumber, secondNumber) {
    return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return Number(firstNumber) * Number(secondNumber);
}

function divide(firstNumber, secondNumber) {    
    return Number(firstNumber) / Number(secondNumber);
}

function takeSquareRoot(number) {    
    return Number(number) ** 0.5;
}

function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            return add(firstNumber, secondNumber);   
        case '-':
            return substract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            if (secondNumber === 0) {
                return display.textContent = 'Oops!';
            } else {
                return divide(firstNumber, secondNumber);
            }            
    }    
}

function operateSquareRoot() {
    let number = Number(display.textContent);
    if (number >= 0) {
        let result = takeSquareRoot(number);
        clearAll();
        display.textContent = firstNumber = result;
    } else {
        clearAll();
        display.textContent = "Oops!";
    }
    lastValue = "sqrt";
}

function clearAll() {
    display.textContent = 0;
    firstNumber = secondNumber = operator = lastValue = null;
    isFirstNumberActive = true;
}

function toggleSign() {
    if (display.textContent == 0) {
        display.textContent = 0;
    } else if (display.textContent[0] == "-") {
        display.textContent = display.textContent.slice(1,display.textContent.length);
    } else {
        display.textContent = "-" + display.textContent;
    }
}

function deleteSymbol() {    
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
    if (display.textContent.length == 0) {
        display.textContent = 0;
    }}

const back = document.querySelector('.back');
back.addEventListener("click", deleteSymbol);

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", enterDot);

const sign = document.querySelector(".sign");
sign.addEventListener("click", toggleSign);

const equal = document.querySelector(".equal");
equal.addEventListener("click", calculate);

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearAll);

const oper = document.querySelectorAll(".operator");
oper.forEach((oper) => {
    oper.addEventListener("click", () => {

        if (operator === null) {
            operator = oper.textContent;            
        } else {
            firstNumber = calculate();
            secondNumber = null;
            isFirstNumberActive = true;
            operator = oper.textContent;
        }

        manageOperator(operator);
    });
});

const sqrt = document.querySelector('.sqrt');
sqrt.addEventListener("click", operateSquareRoot);

const numButtons = document.querySelectorAll(".number");
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        enterSymbol(button.textContent);        
    });
});

// Helper functions
function handleNumbers(number) {
    if (firstNumber === undefined || firstNumber === null) {
        firstNumber = Number(number);
        return firstNumber;
    } else {
        secondNumber = Number(number);
        return secondNumber;
    }
}

function roundFloat(number) {
    return parseFloat(Math.round(number + 'e' + 15) + 'e-' + 15);
}