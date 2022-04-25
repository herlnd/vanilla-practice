const gridSizeSlider = document.getElementById('grid-size-slider');
const initialGridSize = document.getElementById('grid-size-slider').value;
const gridSizeText = document.getElementById('grid-size');
const grid = document.getElementById('grid');
const cell = document.createElement('div');
const clearGridButton = document.getElementById('clear-grid-button');
const eraserButton = document.getElementById('eraser-button');
const brushButton = document.getElementById('brush-button');
const colorPickerButton = document.getElementById('color-picker-button'); 


// Default values.
const gridColor = '#fff';
let brushColor = '#000';
let currentMode = 'brush';

// Event listeners.
gridSizeSlider.addEventListener('input', fillGrid);
gridSizeSlider.addEventListener('input', getGridSize);
clearGridButton.addEventListener('click', clearGrid);
brushButton.onclick = () => setMode('brush');
eraserButton.onclick = () => setMode('eraser');
colorPickerButton.addEventListener('input', getBrushColor);

// Gets brush color from color picker.

function getBrushColor(e) {
    brushColor = e.target.value;
};

// Clears any drawings from the grid.
function clearGrid() {
    const existingCells = document.querySelectorAll('.cell');
    existingCells.forEach(cell => cell.style.backgroundColor = `${gridColor}`);
};

// Gets the size of the grid from the slider. 
function getGridSize() {
    let gridSize = this.value;
    fillGrid(gridSize, gridSize);
}

// Fills the grid dynamically with divs.
function fillGrid(size) {
    removeDivs();
    gridSizeText.textContent = `${size} x ${size}`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < (size * size); i++) {
        const cell = document.createElement('div');
        const cellClone = cell.cloneNode(true)
        cellClone.classList.add('cell');
        cellClone.style.backgroundColor = `${gridColor}`;
        cellClone.addEventListener('mouseover', paintCell);
        cellClone.addEventListener('mousedown', paintCell);
        grid.appendChild(cellClone);
    };
};

// Clicks handling
let clicked = false;

document.body.onmousedown = () => (clicked = true);
document.body.onmouseup = () => (clicked = false);


// Set drawing mode.

function setMode(mode) {
    switch (mode) {
        case 'brush':
            brushButton.disabled = true;
            eraserButton.disabled = false;
            colorPickerButton.disabled = false;
            currentMode  = 'brush';
            break;
        case 'eraser':
            eraserButton.disabled = true;
            brushButton.disabled = false;
            colorPickerButton.disabled = true;
            currentMode = 'eraser';
            break;
    };
};

function paintCell(e) {
    switch (currentMode) {
        case 'brush':
            if ((clicked === true && e.type === 'mouseover') || e.type === 'mousedown') {
                e.preventDefault();
                e.target.style.backgroundColor = brushColor;
            };
            break;
        case 'eraser':
            if ((clicked === true && e.type === 'mouseover') || e.type === 'mousedown') {
                e.preventDefault();
                e.target.style.backgroundColor = gridColor;
            };
            break;
    };
};

// Removes divs from grid
function removeDivs() {
    const existingCells = document.querySelectorAll('.cell');
    existingCells.forEach(cell => cell.remove());
};

// Start-up
window.addEventListener('load', startPage);

function startPage() { 
    fillGrid(initialGridSize);
};