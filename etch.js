
// Etch-a-Sketch

const inputSlider = document.querySelector('[type="range"]');
const colorPicker = document.querySelector('[type="color"]');
const cPickerOverlay = document.querySelector('label');
const clearButton = document.querySelector('.clear');
const eraseButton = document.querySelector('.erase');
const rgbButton = document.querySelector('.rgb');
let allBoxes = Array.from(document.querySelectorAll('.screen > div'));
let activeBtn = false;
let mousePressed = false;

// ------------------------------------ Top Function Bar

const pushToGrid = (num2push, SCREEN) => {
    for (let z = 0; z < num2push; z++) {
        const newBox = document.createElement('div');
        newBox.style.border = '1px solid gray';
        SCREEN.append(newBox);
        allBoxes.push(newBox);
    }
    allBoxes.forEach(div => div.addEventListener('mousedown', handleMouseD));
    if (rgbButton.classList.contains('active')) {
        allBoxes.forEach(div => div.addEventListener('mousedown', rgbDown));
    }
}

const updateGrid = (num) => {
    const SCREEN = document.querySelector('.screen');
    const num2push = num * num;
    SCREEN.innerHTML = '';
    allBoxes = [];
    SCREEN.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    SCREEN.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    pushToGrid(num2push, SCREEN);
}

const updateXY = (e) => {
    let xValue = document.querySelector('.x');
    let yValue = document.querySelector('.y');
    let num = e.target.value;
    e.preventDefault();
    xValue.textContent = e.target.value;
    yValue.textContent = e.target.value;
    updateGrid(num);
}

// ------------------------------------ Bottom Function Bar

const changeColor = (e) => {
    eraseButton.classList.remove('active');
    rgbButton.classList.remove('active');
    activeBtn = false;
    cPickerOverlay.style.background = e.target.value;
    allBoxes.forEach(div => div.removeEventListener('mousedown', eraseDown));
    allBoxes.forEach(div => div.removeEventListener('mousedown', rgbDown));
}

const handleMouseU = (e) => {
    allBoxes.forEach(div => div.removeEventListener('mousemove', handleMouseM));
}

const handleMouseM = (e) => {
    e.target.style.background = window.getComputedStyle(cPickerOverlay).background;
    allBoxes.forEach(div => div.addEventListener('mouseup', handleMouseU));
}

const handleMouseD = (e) => {
    if (!activeBtn) {
        e.preventDefault();
        e.target.style.background = window.getComputedStyle(cPickerOverlay).background;
        allBoxes.forEach(div => div.addEventListener('mousemove', handleMouseM));
    } else return;
}

const handleClear = () => {
    allBoxes.forEach(div => div.style.background = 'none');
    if (!rgbButton.classList.contains('active')) {
        activeBtn = false;
    }
    eraseButton.classList.remove('active');
    allBoxes.forEach(div => div.removeEventListener('mousedown', eraseDown)); // WORKING HERE
}

const stopEraser = (e) => {
    allBoxes.forEach(div => div.removeEventListener('mousemove', eraseMove));
}

const eraseMove = (e) => {
    e.target.style.background = 'none';
    allBoxes.forEach(div => div.addEventListener('mouseup', stopEraser));
}

const eraseDown = (e) => {
    e.preventDefault();
    e.target.style.background = 'none';
    allBoxes.forEach(div => div.addEventListener('mousemove', eraseMove));
}

const erase = () => {
    if (rgbButton.classList.contains('active')) rgbButton.classList.remove('active');
    allBoxes.forEach(div => div.removeEventListener('mousedown', rgbDown));
    eraseButton.classList.add('active');
    activeBtn = true;
    allBoxes.forEach(div => div.addEventListener('mousedown', eraseDown));
}

const rgbUp = (e) => {
    mousePressed = false;
}

const rgbMove = (e) => {
    let randomNumber1 = Math.floor(Math.random() * 256);
    let randomNumber2 = Math.floor(Math.random() * 256);
    let randomNumber3 = Math.floor(Math.random() * 256);
    if (mousePressed) {
        e.target.style.background = `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
        allBoxes.forEach(div => div.addEventListener('mouseup', rgbUp));
    }
}

const rgbDown = (e) => {
    e.preventDefault();
    let randomNumber1 = Math.floor(Math.random() * 256);
    let randomNumber2 = Math.floor(Math.random() * 256);
    let randomNumber3 = Math.floor(Math.random() * 256);
    e.target.style.background = `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
    mousePressed = true;
    allBoxes.forEach(div => div.addEventListener('mousemove', rgbMove));
}

const rgbDraw = () => {
    if (eraseButton.classList.contains('active')) eraseButton.classList.remove('active');
    allBoxes.forEach(div => div.removeEventListener('mousedown', eraseDown));
    rgbButton.classList.add('active');
    activeBtn = true;
    allBoxes.forEach(div => div.addEventListener('mousedown', rgbDown));
}

// ------------------------------------ Event Listeners

inputSlider.addEventListener('input', updateXY);
colorPicker.addEventListener('input', changeColor);
clearButton.addEventListener('click', handleClear);
eraseButton.addEventListener('click', erase);
rgbButton.addEventListener('click', rgbDraw);
allBoxes.forEach(div => div.addEventListener('mousedown', handleMouseD)); // main draw
