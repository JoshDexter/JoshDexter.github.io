let mapSize = 25;
let myMap;
let yChange = 0;
let xChange = 0;
let displayBuildMenu = false; 
let buttons = []
let buttonDistanceX = 50;
let buttonDistanceY = 50;
let testColor = "grey";
let house;
let textures = []

class tile{
  constructor(x1, y1, w1, h1, cl){
    this.x = x1;
    this.y = y1;

    this.w = w1;
    this.h = h1;

    this.colour = cl;


    this.xMove = this.x + xChange;
    this.yMove = this.y + yChange;

  }
  draw(){
    this.xMove = this.x + xChange;
    this.yMove = this.y + yChange;

    push()
    fill(this.colour)
    rect(this.xMove, this.yMove, this.w, this.h);

    pop()
  }
  mouseOnTile(){
        if (mouseX > this.xMove && mouseX < this.xMove + this.w && mouseY > this.yMove && mouseY < this.yMove + this.h){
          console.log("works");
          return true;
        }else return false;
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
      this.squareLocationY += 50;
      this.squareLocationX = 50;
      for (let j = 0; j < mapSize; j++){
        this.grid.push(new tile(this.squareLocationX, this.squareLocationY, 50, 50, "green"));
        this.squareLocationX += 50;
      }
    }
  }
  draw(){
    for(let i =0; i < this.grid.length; i++){
      this.grid[i].draw()
    }
  }
  mouseOnTile(){
    for(let i =0; i < this.grid.length; i++){
      if(this.grid[i].mouseOnTile()){
        console.log(i)
        image(house, 10, 10)
      }
    }
  }
}
class Texture {
  constructor(xloc, yloc, ww, hh, textureSelected){
    this.xLoc = xloc;
    this.yLoc = yloc;

    this.width = ww;
    this.height = hh;

    this.texture = textureSelected;

   

  }
}

class Button{
  constructor(xSize, ySize, wSize, hSize){
    this.buttonX = xSize;
    this.buttonY = ySize;

    this.buttonW = wSize;
    this.buttonH = hSize;


  }
  draw(){
    rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH)
  }
  mouseOnButton(){
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonW && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonH){
      return true
    }else return false
  }
  
}
function preload(){
  house = loadImage("assets/clipart-home-garden-13.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  myMap = new gridGen(10,10)
  for (let i = 0; i < 3; i++){
    buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49));  
    buttonDistanceX += 50;  
  
  }
  textures.push(new Texture(50, 50, 50, 50, house))
  

  drawMap();
}

function drawMap(){
  stroke(0);
  fill('green');

}

function draw(){
  
  background(255)
  myMap.draw()
  UI();
  move();
  
 
  
  // if(mouseIsPressed){
  //   myMap.mouseOnTile()
  // }
  
}
function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
  drawMap();
  UI();
}
function UI(){
  if (displayBuildMenu){
    push()
    fill(255, 255, 255, 100)
    rect(0, 0, 200, windowHeight/2)
    for(let i = 0; i < 3; i++){
      buttons[i].draw();
    }
    pop()
  
  }
}
function mousePressed() {
  myMap.mouseOnTile()
  if (displayBuildMenu){
    if(buttons[0].mouseOnButton()){
      console.log("yo");
      testColor = "blue"
    }
    if(buttons[1].mouseOnButton()){
      console.log("yoyo")
      testColor = "red"
    }
    if(buttons[2].mouseOnButton()){
      console.log("yoyoyo")
      testColor = "grey"
    }
  }
}
function move(){
  if (keyIsDown(65)){ //d
    xChange += 5;
  }
  if (keyIsDown(68)){ //a
    xChange -= 5;
  }
  if (keyIsDown(83)){ //s
    yChange -= 5;
  }
  if (keyIsDown(87)){ //w
    yChange += 5;
  }
}

function keyTyped(){
  if (keyCode === 69){
    displayBuildMenu = !displayBuildMenu;
  }
}