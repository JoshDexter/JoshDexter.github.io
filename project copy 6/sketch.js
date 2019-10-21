let mapSize = 25;
let squareLocationX = 25;
let squareLocationY = 25;

function setup(){
  createCanvas(windowWidth, windowHeight);


  drawMap();
}

function drawMap(){
  stroke(0);
  fill('green');
  for (let i = 0; i < mapSize; i++){
    squareLocationY += 150;
    squareLocationX = 25;
    for (let j = 0; j < mapSize; j++){
      rect(squareLocationX, squareLocationY, 150, 150);
      squareLocationX += 150;
    }
  }
}

function draw(){
  UI();
}
function windowResized(){
  createCanvas(windowWidth, windowHeight);
  squareLocationX = 25;
  squareLocationY = 25;
  drawMap();
  UI();
}
function UI(){

}
class tile{
  constructor(x1, y1, w1, h1){
    this.x = x1;
    this.y = y1;

    this.w = w1;
    this.h = h1;
  }
  draw(){
    rect(this.x, this.y, this.w, this.h);

  }
}
class gridGen{
  constructor(sizeX1, sizeY1){
    this.sizeX = sizeX1;
    this.sizeY = sizeY1;
  }
}
