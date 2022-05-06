const topDisplay = document.getElementById('top-display');
const mainDisplay = document.getElementById('main-display');
const clearButtons = document.querySelectorAll('.clear');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const plusMinus = document.getElementById('plus-minus');
const decimal = document.getElementById('decimal');

clearButtons.forEach(button => button.addEventListener('click', clearX));
numbers.forEach(num => num.addEventListener('click', addNumber));
operators.forEach(op => op.addEventListener('click', addOperator));
plusMinus.addEventListener('click', changeSign);
decimal.addEventListener('click', addDecimal);

// Adds a decimal to the display/input
function addDecimal() {
    let disp = getMainDispContent();
    if (disp.indexOf(',') !== -1) {
        showOnMainDisp(disp);
    } else {
        showOnMainDisp(`${disp},`);
    };
};

// Changes the sign of the display/input.
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

// Clear functions.
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
            console.clear();
        break;
    };
};

// Sets display to default values.
const setDisplay = (e) => {
    if (mainDisplay.textContent === '0' && (e.target.className !== 'operator' &&
    e.target.id !== 'decimal')) {
    mainDisplay.textContent = '';
    };
};

// Adds numbers to the main display
function addNumber(e) {
    setDisplay(e);
    let disp = getMainDispContent();
    if (disp.length < 13) {
        mainDisplay.textContent += e.target.textContent;
    };
};

function addNumber2(e) {
    setDisplay(e);
    let disp = getMainDispContent();
    if (disp.length < 13) {
        mainDisplay.textContent += 'tato';
    };
};

// Equation terms
let leftHandSide;
let rightHandSide;
let result;

// Operators array
let auxOpArr = [];
operators.forEach(op => auxOpArr.push(op.textContent));
let opArr = auxOpArr.filter(operator => operator.length === 1 && operator !== '%');

// Check for operators
const containsOp = (str) => opArr.some(op => str.indexOf(op) !== -1 ? true : false);

// Get and show content on display.
const getTopDispContent = () => topDisplay.textContent;
const getMainDispContent = () => mainDisplay.textContent;
const showOnMainDisp = (str) => mainDisplay.textContent = str;
const showOnTopDisp = (str) => topDisplay.textContent = str;

// Adds operator to the top display and saves the previous term in the left-hand side of the equation.
function addOperator(e) {
    let disp = getMainDispContent();
    if (disp === 'overflow' || disp === 'NaN') {
        leftHandSide = 0;
    } else  {
        leftHandSide = parseFloat(disp.replace('.', '').replace(',', '.'));
    };

    if (containsOp(e.target.textContent)) {
        showOnTopDisp(`${leftHandSide} ${e.target.textContent}`);
    } else {
        let calcObj = calculateOthers(leftHandSide, e.target.id);
        showOnMainDisp(`${calcObj.result}`);
        showOnTopDisp(`${calcObj.expression}`);
    };
};

// Calculates %, 1/x, pow and sqrt.
function calculateOthers(leftTerm, operator) {
    switch (operator) {
        case 'percentage':
            result = formatNumber((leftTerm / 100));
            expression = `${leftTerm}%`;
            return {result, expression};
        case 'fraction':
            leftTerm === 0 ? alert('nope') : result = formatNumber(1 / leftTerm);
            expression = `1/${leftTerm}`;
            return {result, expression};
        case 'pow':
            result = formatNumber(leftTerm ** 2);
            expression = `${leftTerm}²`;
            return {result, expression};
        case 'sqrt':
            leftTerm < 0 ? alert('nope') : result = formatNumber((leftTerm ** (1/2)));
            expression = `2√${leftTerm}`;
            return {result, expression};
    };
};

// Formats numbers to local language representation.
const formatNumber = (num) => {
    let expIndex = num.toString().indexOf('e+');
    if (expIndex !== -1) {
        formattedNumber = 'overflow';
    } else if (num.toString().length > 10) {
        let auxNum = num.toLocaleString('es-AR', {maximumFractionDigits: 2, notation: 'scientific'});
        let eIndex = auxNum.indexOf('E0');
        if (eIndex !== -1) {
            formattedNumber = auxNum.slice(0, eIndex);
        } else {
            formattedNumber = auxNum;
        };
    } else {
        formattedNumber = num.toLocaleString('es-AR', {maximumFractionDigits: 2});
    };

    return formattedNumber;
};

// Handles engineering notations.
function handleNotation(num) {
    let notationIndex = num.toString().indexOf('E');
    if (notationIndex !== -1) {
        return num.toString().replace('E', 'exp');
    } else {
        return num;
    };
};