// Keyboard elements
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimal = document.getElementById('decimal');
const plusMinus = document.getElementById('plus-minus');
const clear = document.getElementById('clear-all');
const clearEntry = document.getElementById('clear-entry');
const deleteButton = document.getElementById('delete');
const equal = document.getElementById('equal');

// Operators array
let operatorsArr = [];
operators.forEach(operator => operatorsArr.push(operator.textContent));

// Display elements
let displayTop = document.getElementById('operation');
let displayMain = document.getElementById('result');

// Event listeners
numbers.forEach(number => number.addEventListener('click', showOnDisplay));
operators.forEach(operator => operator.addEventListener('click', showOnDisplay));
decimal.addEventListener('click', showOnDisplay);
clear.addEventListener('click', clearAll);
clearEntry.addEventListener('click', clearTextContent);
deleteButton.addEventListener('click', deleteChar);
plusMinus.addEventListener('click', showOnDisplay);
equal.addEventListener('click', showOnDisplay);

// Check for operators
function containsOperator(str) {
    if (operatorsArr.some(operator => str.indexOf(operator) !== -1)) {
        return true;
    } else return false;
};

function containsDecimal(str) {
    if (str.indexOf(',') !== -1) {
        return true;
    } else return false;
};

// Equation elements
let leftHandSide;
let rightHandSide;
let operatorSymbol;
let operationResult;

function deleteChar() {
    if (displayMain.textContent.length === 1) {
        displayMain.textContent = '0';
    } else {
        let dispStr = displayMain.textContent;
        displayMain.textContent = dispStr.slice(0, dispStr.length - 1);
    };
};

function showOnDisplay(e) {
    if (displayMain.textContent === '0' && (e.target.className !== 'operator' &&
        e.target.id !== 'decimal')) {
        displayMain.textContent = '';
    };

    switch (true) {
        case (e.target.className === 'number'):
            if (!containsOperator(displayTop.textContent)) {
                displayMain.textContent += e.target.textContent;
            };
            break;

        case (e.target.id === 'decimal'):
            if (!containsDecimal(displayMain.textContent)) {
                displayMain.textContent += e.target.textContent;
            };
            break;

        case (e.target.id === 'plus-minus'):
            if (displayMain.textContent.startsWith('-')) {
                displayMain.textContent = displayMain.textContent.slice(1);
            } else {
                displayMain.textContent = `-${displayMain.textContent}`;
            };
            break;

        case (e.target.id === 'equal'):
            console.log('equal');
            break;

        case (e.target.className === 'operator'):
            console.log(e.target.textContent);
            switch (e.target.textContent) {
                case '%':
                    leftHandSide = parseFloat(displayMain.textContent.replace(',', '.')); 
                    operationResult = leftHandSide / 100;
                    displayMain.textContent = operationResult.toString().replace('.', ',');
                    leftHandSide = operationResult;
                    break;

                case '1/x':
                    if (parseFloat(displayMain.textContent.replace(',', '.')) !== 0) {
                        leftHandSide = parseFloat(displayMain.textContent.replace(',', '.')); 
                        operationResult = 1 / leftHandSide;
                        displayMain.textContent = operationResult.toString().replace('.', ',');
                        leftHandSide = operationResult;
                    } else {
                        alert('nope')
                    }
                    break;

                case 'x²':
                    leftHandSide = parseFloat(displayMain.textContent.replace(',', '.'));
                    operationResult = leftHandSide ** 2;
                    displayMain.textContent = operationResult.toString().replace('.', ',');
                    leftHandSide = operationResult; 
                    break;

                case '2√x':
                    if (parseFloat(displayMain.textContent.replace(',', '.')) > 0) {
                        leftHandSide = parseFloat(displayMain.textContent.replace(',', '.'));
                        operationResult = leftHandSide ** (1/2);
                        displayMain.textContent = operationResult.toString().replace('.', ',');
                        leftHandSide = operationResult; 
                    } else {
                        alert('nope');
                    }
                    break;

                default:
                    displayMain.textContent += e.target.textContent;
                    displayTop.textContent = displayMain.textContent;
                    displayMain.textContent = displayMain.textContent.slice(0, 
                    displayMain.textContent.length - e.target.textContent.length);
                    break;
            };
    };
};

// Clears display
function clearAll() {
    displayTop.textContent = '';
    displayMain.textContent = 0;
    console.clear();
};

// Clears last entry
function clearTextContent() {
    displayMain.textContent = 0;
};