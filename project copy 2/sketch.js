let score = 0;
let multiplier = 1;
let autoClicker = false;
let autoClickerSpeed = 0;
let sausage;
//let sausageLocationX = windowWidth/2;
//let sausageLocationY = windowHeight/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  UI();
}
function preload(){
  sausage = loadImage("assets/sausage.png");
}
function windowResized(){
  UI();
}
function UI(){
  background(255);
  imageMode(CENTER);
  image(sausage, windowWidth/2, windowHeight/2);
  textSize(25);
  text(score, windowWidth/2, windowHeight/8)
}
function draw(){
  UI();
}
function mouseIsPressed(){
  if (mouseX < windowWidth/2.3 && mouseX > windowWidth/1.7 && mouseY < windowWidth/3.1 && mouseY > windowWidth/1.5){
    score += 1;
  }
}