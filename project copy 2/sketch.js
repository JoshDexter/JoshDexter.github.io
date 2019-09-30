let score = 0;
let multiplier = 1;
let autoClicker = false;
let autoClickerSpeed = 0;
let sausage;
//let sausageLocationX = windowWidth/2;
//let sausageLocationY = windowHeight/2;
let buffer;

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
  rect(windowWidth/1.2, windowHeight/8, 100, 50);
}
function draw(){
  UI();
}
function mousePressed(){
  if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
    score += 1;
    console.log(score);
    console.log(windowHeight)
    console.log(windowWidth)
    UI();  
  }
  if (mouseY > windowHeight/8 && mouseY < windowHeight/5 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
    console.log("AUTO")
  }
}