let x;
let y;
let radius = 100;
let dx = 5;
let state = "menu";
let dy = 5;


function setup(){
  createCanvas(windowWidth, windowHeight);

  x = width/2;
  y = height/2;
  dx = random(-15, 15);
  dy = random(-15, 15);
}
function draw(){
  background(255);
  if (state === 'menu') {
    showMenu();
    buttonClicked();
  }
  x += dx;

  if (x > width - radius/2 || x < 0 + radius/2){
    dx *= -1;
  }
  else if (state === 'circle'){
    moveShape();
    displayCircle();
  }
  else if (state === 'rectangle'){
    moveShape();
    displayRectangle();
  }
  fill(0);
  circle(x, y, radius);
  } 
function windowResized() {
  setup();
}
function showMenu() {
  rectMode(CENTER);
  rect(width/2, height/2 - 100, 400, 150);
  rect(width/2, height/2 + 100, 400, 150);
}
function buttonClicked() {
  if (mouseIsPressed){
    if(mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 75 && mouseY < height/2 + 75)
     state = "rectangle";
  }
}
function moveShape() {
  x += dx;
  y += dy;
}