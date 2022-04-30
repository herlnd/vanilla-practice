const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const clear = document.getElementById('clear-all');
const deleteButton = document.getElementById('delete');

clear.addEventListener('click', clearAll);
numbers.forEach(number => number.addEventListener('click', showOnDisplay));
operators.forEach(operator => operator.addEventListener('click', showOnDisplayOp));
deleteButton.addEventListener('click', deleteChar);


function deleteChar() {
    if (result.textContent.length === 1) {
        result.textContent = '0';
    } else {
        let resultStr = result.textContent;
        result.textContent = resultStr.substring(0, resultStr.length - 1);
    };
};

function showOnDisplay(e) {
    if (result.textContent === '0') {
        result.textContent = '';
    }
    result.textContent += e.target.textContent;
};

function showOnDisplayOp(e) {
    result.textContent += e.target.textContent;
};

function clearAll() {
    operation.textContent = '';
    result.textContent = 0;
};
