const gridSizeSlider = document.getElementById('grid-size-slider');
const initialGridSize = document.getElementById('grid-size-slider').value;
const gridSizeText = document.getElementById('grid-size');
const grid = document.getElementById('grid');
const cell = document.createElement('div');

gridSizeSlider.addEventListener('input', fillGrid);
gridSizeSlider.addEventListener('input', getGridSize);

// Clears any drawings from the grid.
// function clearGrid() {

// };

function getGridSize() {
    let gridSize = this.value;
    fillGrid(gridSize, gridSize);
}

function fillGrid(size) {
    removeDivs();
    gridSizeText.textContent = `${size} x ${size} px`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < (size * size); i++) {
        const cell = document.createElement('div');
        const cellClone = cell.cloneNode(true)
        cellClone.classList.add('cell');
        cellClone.addEventListener('mouseover', paintCell);
        cellClone.addEventListener('mousedown', paintCell);
        grid.appendChild(cellClone);
    };
};

// Clicks handling
let clicked = false;

document.body.onmousedown = () => (clicked = true);
document.body.onmouseup = () => (clicked = false);

function paintCell(e) {
    if (clicked === true && e.type === 'mouseover') {
        e.preventDefault();
        e.target.style.backgroundColor = 'black';
    } else if (e.type === 'mousedown') {
        e.preventDefault();
        e.target.style.backgroundColor = 'black';
    };
};

// Clear grid
function removeDivs() {
    const existingCells = document.querySelectorAll('.cell');
    existingCells.forEach(cell => cell.remove());
};

// Start-up
window.addEventListener('load', startPage);

function startPage() { 
    fillGrid(initialGridSize);
};