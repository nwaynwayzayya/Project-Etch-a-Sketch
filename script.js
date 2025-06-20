const container = document.querySelector('.flex-grid');
const input = document.getElementById('grid-size');
const button = document.getElementById('resize-btn');

function createFlexGrid(size) {
  container.innerHTML = '';
  const squareSize = 100 / size; // percent width per square

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.style.width = `${squareSize}%`;
    container.appendChild(square);
  }
}


document.getElementById('resize-btn').addEventListener('click', () => {
  const newSize = parseInt(input.value);
  if (newSize > 0 && newSize <= 100) {
    createFlexGrid(newSize);
  } else {
    alert('Please enter a size between 1 and 100.');
  }
});
