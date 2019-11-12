let mapSize = 25;
let myMap;
let yChange = 0;
let xChange = 0;
let displayBuildMenu = false; 
let buttons = [];
let buttonDistanceX = 50;
let buttonDistanceY = 100;
let testColor = "grey";
let house;
let selectedImage;
let farm;
let houseCount = 0;
let jobsAvailable = 0;
let workablePopulation = 0;
let happiness = 0;
let money = 0;
let farmCount = 0;
let alreadyDealtWith = false;
let populateMillisGoal;
let population = [];
let newMillisGoal = 0;
let create = true;
let housesAvailable = 0;
let occupiedProperty =0;
let oldHouseCount = 0;
let jobs = 0;
let possibleWorkers = 0;
let taxMillisGoal = 0;
let oldFarmCount = 0;
let remove;
let road;
let x;
let y;
let w;
let h;

class Human{
    constructor(age1, lifeExpectany1){
        this.age = age1;
        this.lifeExpectancy = lifeExpectany1;

        this.ageAlreadyChecked = false;

        
    }
 
    ageCheck(){
        if (this.age > 18 ){
            this.ageAlreadyChecked = true;
            return true;
            
        }
        else{
            
            return false;
        }
        
    }
}

class Tile{
  constructor(x1, y1, w1, h1, cl){
    this.x = x1;
    this.y = y1;

    this.w = w1;
    this.h = h1;

    this.colour = cl;

    x = this.x
    y = this.y
    w = this.w
    h = this.h

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
        if (mouseX > this.xMove && mouseX < this.xMove + this.w && mouseY > this.yMove && mouseY < this.yMove + this.h && displayBuildMenu === false){

          
          return true;
        }else return false;
      }
  
}

class GridGen{
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
        this.grid.push(new Tile(this.squareLocationX, this.squareLocationY, 50, 50, "green"));
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
        
        if (this.grid[i].image === null && selectedImage != null){
          if (selectedImage === house){
            if (money >=1000){
              money -= 1000 
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
            }
          }
          if (selectedImage === farm){
            if (money >= 1500){
              money -= 1500 
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
            }
          }
          if (selectedImage === road){
            if (money >= 50){
              money -= 50
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
            }
          }
        
        }
        else if(selectedImage === null){
          this.grid[i].image = selectedImage;
          myMap.updatePopulation();
        }
        else{
          //this.grid[i].image = selectedImage;
          myMap.updatePopulation();
        }
      }
    }
  }
  updatePopulation(){
  
    happiness = 0;
    for (let m = 0; m < this.grid.length; m++){
      if (this.grid[m].image === house){
        
        houseCount += 1;       
        
      }
      if (this.grid[m].image === farm){
        
        farmCount += 1;
  
      }

     
    }
    if(workablePopulation < jobsAvailable){
      console.log("YAYAYYAYA")
      happiness += 2
    } 
    
    if (oldHouseCount > houseCount){
      for (let q = 0; q < 4; q++){
        population.pop();
      }
      checkAge();
    }
    jobs = farmCount * 4;
    jobsAvailable = jobs - workablePopulation;
    if (jobsAvailable <= 0){
      jobsAvailable = 0;
    }
    oldFarmCount = farmCount;
    oldHouseCount = houseCount
    housesAvailable =  (houseCount * 4) - population.length;
    newMillisGoal = millis() + 1000;
    taxMillisGoal = millis() + 1000;
    houseCount = 0;
    farmCount = 0;
    // return oldHouseCount;

  }
}

class Button{
  constructor(xSize, ySize, wSize, hSize, buttonImage, itemCost){
    this.buttonX = xSize;
    this.buttonY = ySize;

    this.buttonW = wSize;
    this.buttonH = hSize;

    this.image = buttonImage;

    this.cost = itemCost;


  }
  draw(){
    rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH);
    image(this.image, this.buttonX, this.buttonY, this.buttonW, this.buttonH);
    if (this.cost > 0){
      push();
      textSize(15);
      fill(0);
      text(this.cost, this.buttonX, this.buttonY + 65);
      pop();
    }
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
  remove = loadImage("assets/x.png");
  road = loadImage("assets/road.jpg");
}
function setup(){
  frameRate(15);
  money = 10000;
  createCanvas(windowWidth, windowHeight);
  myMap = new GridGen(10,10)
  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, house, 1000));
  buttonDistanceX += 50;  
  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, farm, 1500)); 
  buttonDistanceX += 50;  
  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, remove, 0)); 
  buttonDistanceX -= 100;
  buttonDistanceY += 75; 
  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, road, 50));
  
  
  
  

  drawMap();
}

function drawMap(){
  stroke(0);
  fill('green');

}

function draw(){

if (oldHouseCount >= 1 || oldFarmCount >= 1){   
    
    incomeTax();
    
}

  background(255)
  myMap.draw()
  UI();
  move();
  if (housesAvailable >= 1){
      populate();
      incomeTax();
  }

  
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
    rect(0, 75, 200, windowHeight/2)
    for(let i = 0; i < 4; i++){
      buttons[i].draw();
    }
    pop()
  }
  
  push()
  fill(255, 255, 255, 100)
  rect(0, 0, windowWidth, 50)
  pop()
  textSize(25)
  text("$" + money, 750, 30)
  text("Happiness " + happiness, 15, 30)
  text("Jobs " + jobsAvailable, 200, 30)
  text("Working People " + workablePopulation, 300, 30)
  text("Population " + population.length, 550, 30)
}
function mousePressed() {
  
 
  myMap.mouseOnTile()
  if (displayBuildMenu){
    if(buttons[0].mouseOnButton()){
      selectedImage = house;
    }
    if(buttons[1].mouseOnButton()){
      selectedImage = farm
    }
    if(buttons[2].mouseOnButton()){
      selectedImage = null;
    }
    if(buttons[3].mouseOnButton()){
      selectedImage = road;
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

function populate(){
 
    if (round(millis()) >= round(newMillisGoal) - 500 && round(millis()) <= round(newMillisGoal + 500) && housesAvailable >= 0){
        housesAvailable -= occupiedProperty;
        
        newMillisGoal = millis() + 1000;
        
        population.push(new Human(random(1, 50), random(50, 100)))
        myMap.updatePopulation();
        occupiedProperty += 1;
        
     
        checkAge();
        
          
        
             
    }
    if (millis() > newMillisGoal + 600){
        console.log("no")
        newMillisGoal = millis() + 1000;       
    }
    else{
      return false;
    }
    
    
    
}
function checkAge(){
    for (let l = 0; l < population.length; l++){
        if(population[l].ageCheck()){
            possibleWorkers += 1;
        }

    }
    workablePopulation = possibleWorkers;
    possibleWorkers = 0
}
function statusOfCounters(){
  if (jobsAvailable < 1 ){
    oldHappiness = happiness;
    happiness -= 1;
    console.log(happiness)
    // alreadyDealtWith = true;
  }
  if (jobsAvailable <= 0) {
    jobsAvailable = 0;
    happiness++;
  }

}
function incomeTax(){
  
  if (round(millis()) >= round(taxMillisGoal) - 500 && round(millis()) <= round(taxMillisGoal + 500) && housesAvailable >= 0){
    console.log("yes")
    // myMap.updatePopulation();
    money += oldHouseCount * 100;
    money += oldFarmCount * 250;
    taxMillisGoal = millis() + 1000;
  }
  // if (millis() > taxMillisGoal + 600){
  //   console.log("no")
  //   newMillisGoal = millis() + 1000;       
  // }
}
function loseMoneyCuck(){
  if (round(millis()) >= round(taxMillisGoal) - 500 && round(millis()) <= round(taxMillisGoal + 500) && housesAvailable >= 0){
    money -= 1000
    taxMillisGoal = millis() + 1000;
  }
}
