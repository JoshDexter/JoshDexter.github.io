// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight)
  grid = created2dArray(20, 20);
}
function draw() {
  background(220);
  displayGrid(grid);
}
function displayGrid(theGrid){
  for (let y = 0; y < theGrid[0].length; y++){
    for (let x = 0; x < theGrid[0].length; x++) {
      if (theGrid[y][x] === 0) { 
        fill(255);
      }
      else {
        fill(0);
      }
      let cellSize = width/theGrid[0].length;
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

}
function created2dArray(cols, rows) {
  let someArray = [];
  for (let i = 0; i < cols; i++) {
    someArray.push([]);
    for (let j=0; j<rows; j++) {
      if (random(100) < 50) {
        someArray[i].push(1);

      }
      else {
        someArray[i].push(0);
      }
    }
  }
  return someArray;
}

