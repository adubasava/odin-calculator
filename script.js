const display = document.querySelector('.results');

let firstNumber;
let secondNumber;
let operator;
let last;
let next;

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
    return Number(num1) / Number(num2);
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);   
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 == 0) {
                return display.textContent = 'Oops!';
            } else {
                return divide(num1, num2);
            }            
    }    
}

function handleNumbers(num) {
    if (firstNumber === undefined || firstNumber === null) {
        firstNumber = Number(num);
        return firstNumber;
    } else {
        secondNumber = Number(num);
        return secondNumber;
    }
}

function clearAll() {
    display.textContent = 0;
    last = firstNumber = secondNumber = operator = null;
}

const numButtons = document.querySelectorAll('.number');
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!last && display.textContent == "0.") {
            display.textContent += button.textContent;            
        } else if (last == 0 && display.textContent.length == 1) {
            display.textContent = '' + button.textContent;            
        } 
        else if (last == "=") {
            clearAll();
            display.textContent = button.textContent;
        } else if (last == operator || last == "sqrt") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
        
        last = Number(button.textContent);
    });
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    clearAll();
})

const oper = document.querySelectorAll('.operator');
oper.forEach((oper) => {
    oper.addEventListener('click', () => {
        if (!operator) {
            operator = oper.textContent;
        } else {
            next = oper.textContent;
        }
        
        handleNumbers(Number(display.textContent));

        if (display.textContent == "Oops!") {
            clearAll();
        } else if (last == "=" || last == "sqrt") {
            firstNumber = Number(display.textContent);
            secondNumber = null;
        } else if (secondNumber === undefined) {
            firstNumber = Number(display.textContent);
        } else if (firstNumber !== null && secondNumber !== null) {
            display.textContent = operate(operator, firstNumber, secondNumber);
            if (display.textContent == "Oops!") {            
                firstNumber = null;
            } else {
                firstNumber = Number(display.textContent);
            }             
            operator = next;
            secondNumber = null;
        } 

        last = operator;
    })
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {

    handleNumbers(Number(display.textContent));

    if (firstNumber !== null && secondNumber !== null && operator && last != operator) {
        display.textContent = operate(operator, firstNumber, secondNumber);
        if (display.textContent == "Oops!") {            
            firstNumber = null;
        } else {
            firstNumber = Number(display.textContent);
        }        
        secondNumber = null;
        operator = null;
    } else {
        firstNumber = display.textContent;
        secondNumber = null;
    }    
    last = "=";
})

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
    if (display.textContent.length == 0) {
        display.textContent = 0;
    }
})

const sqrt = document.querySelector('.sqrt');
sqrt.addEventListener('click', () => {    
    let num = Number(display.textContent);
    if (num >= 0) {
        display.textContent = Math.sqrt(num);
        firstNumber = Number(display.textContent);
    } else {
        display.textContent = "Oops!";
        last = firstNumber = secondNumber = operator = null;
    }
        
    secondNumber = null;
    last = "sqrt";
})

const sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (display.textContent == 0) {
        display.textContent = 0;
    } else if (display.textContent[0] == "-") {
        display.textContent = display.textContent.slice(1,display.textContent.length);
    } else {
        display.textContent = "-" + display.textContent;
    }
})

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    
    if (last == operator) {
        firstNumber = Number(display.textContent.slice(0,display.textContent.length));
        display.textContent = 0 + ".";
        last = ".";
    } else if (last == "=" || last == "sqrt") {
        clearAll();
        display.textContent = 0 + ".";
    } else if (!display.textContent.includes(".")) {
        display.textContent += ".";
        last = ".";
    }       
});

