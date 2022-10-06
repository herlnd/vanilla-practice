const topDisplay = document.getElementById('top-display');
const mainDisplay = document.getElementById('main-display');
const plusMinus = document.getElementById('plus-minus');
const decimal = document.getElementById('decimal');
const equal = document.getElementById('equal');

// Initial settings.
let inputExists = false;
let itemArr = [];
let historyArr = [];

// Gets and shows content on display.
const getTopDispContent = () => topDisplay.textContent;
const getMainDispContent = () => mainDisplay.value;
const showOnMainDisp = (str) => mainDisplay.value = str;
const showOnTopDisp = (str) => topDisplay.textContent = str;

// Clear buttons and functions
const clearButtons = document.querySelectorAll('.clear');
clearButtons.forEach(button => button.addEventListener('click', clearX));

function clearX(e) {
    switch (e.target.id) {
        case 'delete':
            let disp = getMainDispContent();
            if (disp.length === 1) {
                showOnMainDisp('0');
            } else {
                showOnMainDisp(disp.slice(0, disp.length - 1)); 
            };
        break;

        case 'clear-entry':
            showOnMainDisp('0');
        break;

        case 'clear-all':
            showOnMainDisp('0');
            showOnTopDisp('');
            itemArr = [];
            historyArr = [];
        break;
    };
};

// Handles number inputs.
const numbers = document.querySelectorAll('.number');
numbers.forEach(num => num.addEventListener('click', addNumber));

function addNumber(e) {
    let newInput = e.target.textContent;

    if (inputExists) {
        mainDisplay.value = newInput;
        inputExists = false;
    } else {
        if (mainDisplay.value === '0') {
            mainDisplay.value = newInput;
        } else {
            if (mainDisplay.value.length < 13) {
                mainDisplay.value = `${mainDisplay.value}${newInput}`;
            }
        };  
    };
};

// Handles decimals
decimal.addEventListener('click', addDecimal);

function addDecimal() {
    let disp = getMainDispContent();
    if (disp.indexOf(',') !== -1) {
        showOnMainDisp(disp);
    } else {
        showOnMainDisp(`${disp},`);
    };
};

// Handles sign changes of the display/input.
plusMinus.addEventListener('click', changeSign);

function changeSign() {
    let disp = getMainDispContent();
    if (disp === '0') {
        showOnMainDisp(disp);
    } else if (disp.startsWith('-')) {
        showOnMainDisp(disp.slice(1)); 
    } else {
        showOnMainDisp(`-${disp}`);
    };
};

// Handles operators.
const operators = document.querySelectorAll('.operator');
operators.forEach(op => op.addEventListener('click', addOperator));

function addOperator(e) {
    // Removes equal sign from top display.
    if (inputExists) {
        topDisplay.textContent = '';
        itemArr = [];
    }

    let newOperator = e.target.textContent;

    // Prepares the equation.
    if (!itemArr.length) {
        itemArr.push(mainDisplay.value, newOperator);
        topDisplay.textContent = `${mainDisplay.value} ${newOperator}`;
        return inputExists = true;
    }

    // Completes the equation.
    if(itemArr.length) {
        itemArr.push(mainDisplay.value); // Adds third element to the array.
        const calcObj = {
            first: parseFloat(itemArr[0]),
            op: itemArr[1],
            second: parseFloat(itemArr[2])
        };

        historyArr.push(calcObj);
        let calcResult = calculateBasics(calcObj);
        mainDisplay.value = calcResult;

        showOnTopDisp(`${calcResult} ${newOperator}`);

        // Starts new equation.
        itemArr = [calcResult, newOperator];
        inputExists = true;
    };
};

// Calculates all operations.
function calculateBasics({first, op, second}) {
    let result;
    switch (op) {
        case '÷':
            second === 0 ? enableModal() : result = (first / second);
            return result;
        case '×':
            result = (first * second);
            return result;
        case '-':
            result = (first - second);
            return result;
        case '+':
            result = (first + second);
            return result;
        case '%':
            result = (first / 100);
            return result;
        case '1/x':
            first === 0 ? enableModal() : result = (1 / first);
            return result;
        case 'x²':
            result = (first ** 2);
            return result;
        case '2√x':
            first < 0 ? enableModal() : result = (first ** (1/2));
            return result;
    };
};

// Handles the equal button.
equal.addEventListener('click', getResult);

function getResult() {
    let newCalcObj;
    if (!itemArr.length) {
        showOnMainDisp(getMainDispContent());
    } else {
        itemArr.push(getMainDispContent());

        newCalcObj = {
            first: parseFloat(itemArr[0]),
            op: itemArr[1],
            second: parseFloat(itemArr[2])
        }

        let calcResult = calculateBasics(newCalcObj);
        showOnTopDisp(`${newCalcObj.first} ${newCalcObj.op} ${newCalcObj.second} =`)
        showOnMainDisp(calcResult);
        
        historyArr.push(newCalcObj);
        inputExists = true;
        itemArr = [];
    };
};

// enableModal
function enableModal() {
    const modal = document.createElement('section');
    const modalImg = document.createElement('img');
    modal.classList.add('modal');
    modalImg.src = './imgs/zerodivision.gif';
    modalImg.classList.add('modal');
    modalImg.classList.add('img');
    modal.appendChild(modalImg);

    const modalButton = document.createElement('button');
    modalButton.innerHTML = 'Sorry 	&#x1F622;';
    modalButton.classList.add('modal-button');
    modalButton.classList.add('modal-button:hover');
    modalButton.addEventListener('click', disableModal);

    document.querySelector('.calculator').appendChild(modalButton);
    document.querySelector('.calculator').appendChild(modal);
};

function disableModal() {
    const modalButton = document.querySelector('.modal-button');
    const modal = document.querySelector('.modal');

    document.querySelector('.calculator').removeChild(modalButton);
    document.querySelector('.calculator').removeChild(modal);
    document.getElementById('clear-all').click();
};