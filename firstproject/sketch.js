// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redAmount = 0;

let redChangeAmount = 1;

let brushSize = 200 ;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
}

function draw() {
  if (WheelEvent.deltaY > 0){
    brushSize = brushSize - 1 ;
  }
  if (WheelEvent.deltaY < 0){
    brushSize = brushSize + 1 ;
  }
  if (mouseIsPressed){
    if (mouseButton === LEFT)
      fill(redAmount, 0, 250);
      noStroke()
      ellipse(mouseX, mouseY, brushSize, brushSize);
      redAmount += redChangeAmount;

      if (redAmount >= 255){
        redChangeAmount *= -1;
      }
      if (redAmount <= 0){
        redChangeAmount *= -1;
      }
    } 
    if (mouseButton === RIGHT){
      fill(255, 255, 255);
      noStroke()
      ellipse(mouseX, mouseY, brushSize, brushSize);
    }
}

