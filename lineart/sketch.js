// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let card;
let sizeW = 20;
let sizeH = 30;

function preload(){
  card = loadImage("assets/playingcard.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 255);
  imageMode(CENTER)
  image(card, mouseX, mouseY, sizeW, sizeH);
  if (keyIsDown(38)){ 
    sizeW += 10;
    sizeH += 15; 
  }
  if (keyIsDown(40)){ 
    sizeW -= 10;
    sizeH -= 15; 
  }
}




