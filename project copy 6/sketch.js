let mapSize = 25;
let myMap;
let yChange = 0;
let xChange = 0;
let displayBuildMenu = false; 
let buttons = [];
let buttonDistanceX = 50;
let buttonDistanceY = 50;
let testColor = "grey";
let house;
let selectedImage;
let farm;
let population = 0;
let houseCount = 0;
let jobsAvailable = 0;
let workablePopulation = 0;
let happiness = 0;
let money = 0;
let oldHouseCount = 0;



class tile{
  constructor(x1, y1, w1, h1, cl){
    this.x = x1;
    this.y = y1;

    this.w = w1;
    this.h = h1;

    this.colour = cl;

    this.oldHouse = false;
    this.oldFarm = false;


    this.xMove = this.x + xChange;
    this.yMove = this.y + yChange;

    this.image = null;
  }
  draw(){
    this.xMove = this.x + xChange;
    this.yMove = this.y + yChange;

    push()
    fill(this.colour)
    rect(this.xMove, this.yMove, this.w, this.h);
    if(this.image != null){
      image(this.image, this.xMove, this.yMove, this.w, this.h)
    }

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
        if (this.grid[i].image === null && selectedImage != null){
          this.grid[i].image = selectedImage;
          myMap.updatePopulation();
          
        }
        else{
          this.grid[i].image = selectedImage;
          myMap.updatePopulation();
        }
      }
    }
  }
  updatePopulation(){
    if(oldHouseCount > houseCount){
      houseCount -= 1;
    }
    
    for (let m = 0; m < this.grid.length; m++){
      if (this.grid[m].image === house){
        if (this.grid[m].oldHouse === false && oldHouseCount <= houseCount){
          houseCount += 1;
          happiness += 1
          this.grid[m].oldHouse = true;
        }
        if(oldHouseCount > houseCount){
          houseCount -= 1;
        }
        
        
      }
      if (this.grid[m].image === farm){
        if(this.grid[m].oldFarm === false){
          jobsAvailable += 1;
          happiness += 2
          this.grid[m].oldFarm = true;
        }
      }
    }
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
  farm = loadImage("assets/farm.jpg");
}
function setup(){
  //frameRate(1);
  createCanvas(windowWidth, windowHeight);
  myMap = new gridGen(10,10)
  for (let i = 0; i < 3; i++){
    buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49));  
    buttonDistanceX += 50;  
  
  }
  
  

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
  workablePopulation = round(houseCount/1.5);
  
 
  
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
      selectedImage = house;
    }
    if(buttons[1].mouseOnButton()){
      console.log("yoyo")
      selectedImage = farm
    }
    if(buttons[2].mouseOnButton()){
      console.log("yoyoyo")
      selectedImage = null;
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