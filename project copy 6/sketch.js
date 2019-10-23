let mapSize = 25;
let myMap

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

    this.squareLocationX = 25;
    this.squareLocationY = 25;

    this.grid = []

    for (let i = 0; i < mapSize; i++){
      this.squareLocationY += 10;
      this.squareLocationX = 10;
      for (let j = 0; j < mapSize; j++){
        this.grid.push(new tile(this.squareLocationX, this.squareLocationY, 10, 10));
        this.squareLocationX += 10;
      }
    }
  }
  draw(){
    for(let i =0; i < this.grid.length; i++){
      this.grid[i].draw()
    }
  }
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  myMap = new gridGen(10,10)

  drawMap();
}

function drawMap(){
  stroke(0);
  fill('green');
  // for (let i = 0; i < mapSize; i++){
  //   squareLocationY += 150;
  //   squareLocationX = 25;
  //   for (let j = 0; j < mapSize; j++){
  //     rect(squareLocationX, squareLocationY, 150, 150);
  //     squareLocationX += 150;
  //   }
  // }
}

function draw(){
  myMap.draw()
  UI();
}
function windowResized(){
  createCanvas(windowWidth, windowHeight);
  // squareLocationX = 25;
  // squareLocationY = 25;
  drawMap();
  UI();
}
function UI(){

}
function mousePressed() {
  for (let i = 0; i < mapSize; i++){
    for (let j = 0; j < mapSize; j++){
      if(myMap.grid[i]){

      }
    }
  }
}
