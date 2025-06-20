const container = document.querySelector('.flex-grid');
const input = document.getElementById('grid-size');
const resizeButton = document.getElementById('resize-btn');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-btn');
const eraserButton = document.getElementById('eraser-btn');
const rainbowButton = document.getElementById('rainbow-btn');
const shadeButton = document.getElementById('shade-btn');

let currentColor = colorPicker.value;
let isEraserOn = false; 
let rainbowMode = false;
let shadeMode = false;

////////////////////////////////////////////////////////
/**********************Functions***********************/
////////////////////////////////////////////////////////

function createFlexGrid(size) {
  container.innerHTML = '';
  const squareSize = 100 / size; // percent width per square

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.dataset.shade = 0;
    square.style.width = `${squareSize}%`;

    //Add hover effect. Random color on mouseenter and erase if the eraser mode is on
    square.addEventListener('mouseenter', () => {
        if (isEraserOn) {
            square.style.backgroundColor = '#f0f0f0';
            square.dataset.shade = 0;
        } else if (rainbowMode) {
            square.style.backgroundColor = getRandomColor();
            square.dataset.shade = 0;
        } else if (shadeMode) {
            let shade = Number(square.dataset.shade);
            if (shade < 10) shade++;
            square.dataset.shade = shade;

            // Convert currentColor to RGB
            let { r, g, b } = hexToRgb(currentColor);
            square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${shade * 0.1})`;
        } else {
            //square.style.backgroundColor = getRandomColor();
            //use the user's picked color
            square.style.backgroundColor = currentColor;
            square.dataset.shade = 0;
        }
    });


    container.appendChild(square);
  }
}

//get random color function
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


////////////////////////////////////////////////////////
/****************Event Listeners***********************/
////////////////////////////////////////////////////////

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
})

resizeButton.addEventListener('click', () => {
  const newSize = parseInt(input.value);
  if (newSize > 0 && newSize <= 100) {
    createFlexGrid(newSize);
  } else {
    alert('Please enter a size between 1 and 100.');
  }
});

clearButton.addEventListener('click', () => {
    const squares = container.querySelectorAll('div');
    squares.forEach(square => {
        square.style.backgroundColor = '#f0f0f0';
        square.dataset.shade = 0;
    });
});

eraserButton.addEventListener('click', () => {
    isEraserOn = !isEraserOn; //update the state true or false
    eraserButton.textContent = isEraserOn ? "Eraser ON" : "Eraser"; //update the button tesxt
    
    //turn off others if eraser on
    if (isEraserOn) {
        rainbowMode = false;
        shadeMode = false;
        rainbowButton.textContent = "Rainbow Mode";
        shadeButton.textContent = "Shadow Mode";
    }
});

rainbowButton.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    rainbowButton.textContent = rainbowMode ? "Rainbow ON" : "Rainbow Mode";

    //turn off others if rainbow on
    if (rainbowMode) {
        isEraserOn = false;
        shadeMode = false;
        eraserButton.textContent = "Eraser";
        shadeButton.textContent = "Shadow Mode";
    }
});

shadeButton.addEventListener('click', () => {
    shadeMode = !shadeMode;
    shadeButton.textContent = shadeMode ? "Shading ON" : "Shading Mode";

    //turn off others if shademode on
    if (shadeMode) {
        rainbowMode = false;
        isEraserOn = false;
        rainbowButton.textContent = "Rainbow Mode";
        eraserButton.textContent = "Eraser";
    }
});

function hexToRgb(hex) {
  // Remove "#" if present
  hex = hex.replace('#', '');

  // Parse r, g, b
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}
