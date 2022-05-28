
// Etch-a-Sketch

let xValue = document.querySelector('.x');
let yValue = document.querySelector('.y');
const inputSlider = document.querySelector('[type="range"]');
const colorPicker = document.querySelector('[type="color"]');
const cPickerOverlay = document.querySelector('label');
const clearButton = document.querySelector('.clear');
const eraseButton = document.querySelector('.erase');
const allBoxes = Array.from(document.querySelectorAll('.screen > div'));
let active;

const updateXY = (e) => {
    xValue.textContent = e.target.value;
    yValue.textContent = e.target.value;
}

const changeColor = (e) => {
    cPickerOverlay.style.background = e.target.value;
}

const handleMouseU = (e) => {
    allBoxes.forEach(div => div.removeEventListener('mousemove', handleMouseM));
}

const handleMouseM = (e) => {
    e.target.style.background = window.getComputedStyle(cPickerOverlay).background;
    allBoxes.forEach(div => div.addEventListener('mouseup', handleMouseU));
}

const handleMouseD = (e) => {
    e.preventDefault();
    e.target.style.background = window.getComputedStyle(cPickerOverlay).background;
    allBoxes.forEach(div => div.addEventListener('mousemove', handleMouseM));
}

const handleClear = () => {
    allBoxes.forEach(div => div.style.background = 'none');
}

// const stopErase = (e) => {
//     allBoxes.forEach(div => div.removeEventListener('mousemove', eraseM));
// }

// const eraseM = (e) => {
//     e.target.style.background = 'none';
//     allBoxes.forEach(div => div.addEventListener('mouseup', stopErase));
// }

// const eraseD = (e) => {
//     e.preventDefault();
//     e.target.style.background = 'none';
//     allBoxes.forEach(div => div.addEventListener('mousemove', eraseM));
// }

// const erase = () => {
//     allBoxes.forEach(div => div.addEventListener('mousedown', eraseD));
// }


inputSlider.addEventListener('input', updateXY);
colorPicker.addEventListener('input', changeColor);
clearButton.addEventListener('click', handleClear);
// eraseButton.addEventListener('click', erase);
allBoxes.forEach(div => div.addEventListener('mousedown', handleMouseD));