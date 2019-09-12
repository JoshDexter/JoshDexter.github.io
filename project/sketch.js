let input;

function setup(){
  createCanvas(windowWidth, windowHeight)
  background(255, 255, 255);
  input = prompt("Hit or stand?");
}
function draw(){
  rect(35, 700, 400, 40);
  text(input, 40, 725, 30, 30);
}
