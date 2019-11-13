// credit to Nick Schneider for his ideas for the grid and detecting mouse on tiles/buttons.

// create variables

let mapSize = 25;
let myMap;
let yChange = 0;
let xChange = 0;

let displayBuildMenu = false; 
let buttons = [];
let buttonDistanceX = 50;
let buttonDistanceY = 100;

let house;
let farm;
let remove;
let road;
let selectedImage;

let happiness = 0;
let money = 0;
let farmCount = 0;
let houseCount = 0;
let oldHouseCount = 0;
let oldFarmCount = 0;

let populateMillisGoal;
let population = [];

let jobsAvailable = 0;
let workablePopulation = 0;
let jobs = 0;
let possibleWorkers = 0;
let housesAvailable = 0;
let occupiedProperty =0;

let taxMillisGoal = 0;
let newMillisGoal = 0;

let atWork = 0;
let isWorking = 0;

class Human{ // creates a human object with an age life expectancy (not used yet), job status, and happiness  
    constructor(age1, lifeExpectany1, hasJob, isHappy){
        this.age = age1;
        this.lifeExpectancy = lifeExpectany1;

        this.ageAlreadyChecked = false;
        this.job = hasJob;
        this.happy = isHappy;

   
    }
   
 
    ageCheck(){ // checks to see if the person is elligable to work based on age
        if (this.age > 18 ){
            this.ageAlreadyChecked = true;
            return true;
            
        }
        else{
            
            return false;
        }
        
    }
    jobsCheck(){ // checks to see if it should hire a new person into a job, if so returns true and sets jobsAvailable based on the amount of people currently working and the total jobs
        
         if (jobs != workablePopulation && this.ageAlreadyChecked){
            
            this.job = true;
            jobsAvailable = jobs - isWorking
            return true;

        }
        else{
            
            return false;
        }
    }
}

class Tile{ // creates a tile object for each square on the grid

  constructor(x1, y1, w1, h1, cl){
    this.x = x1;
    this.y = y1;

    this.w = w1;
    this.h = h1;

    this.colour = cl;


    this.xMove = this.x + xChange;
    this.yMove = this.y + yChange;

    this.image = null;
  }
  draw(){ // sets up the tiles for the grid

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
  mouseOnTile(){ // checks to see which tile you mouse was on when you clicked
        if (mouseX > this.xMove && mouseX < this.xMove + this.w && mouseY > this.yMove && mouseY < this.yMove + this.h && displayBuildMenu === false){

          
          return true;
        }else return false;
      }
  
}

class GridGen{ //generates and deals with most things that have to do with updating the grid
  constructor(sizeX1, sizeY1){
    this.sizeX = sizeX1;
    this.sizeY = sizeY1;

    this.squareLocationX = 25;
    this.squareLocationY = 25;

    this.grid = [] 

    for (let i = 0; i < mapSize; i++){ // creates the tiles for the grid 
      this.squareLocationY += 50;
      this.squareLocationX = 50;
      for (let j = 0; j < mapSize; j++){
        this.grid.push(new Tile(this.squareLocationX, this.squareLocationY, 50, 50, "green"));
        this.squareLocationX += 50;
      }
    }
  }
  draw(){
    for(let i =0; i < this.grid.length; i++){ // draws the grid
      this.grid[i].draw()
    }
  
  }
  mouseOnTile(){
    for(let i =0; i < this.grid.length; i++){
      if(this.grid[i].mouseOnTile()){
        
        if (this.grid[i].image === null && selectedImage != null){ // checks for sufficient funds (money), sets the image on the grid to be a new image, updates the population.
          if (selectedImage === house){
            if (money >=1000){
              money -= 1000 
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
            }
          }
          if (selectedImage === farm){ // checks for sufficient funds (money), sets the image on the grid to be a new image, updates the population.
            if (money >= 1500){
              money -= 1500 
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
              
              
            }
          }
          if (selectedImage === road){ // checks for sufficient funds (money), sets the image on the grid to be a new image, updates the population.
            if (money >= 50){
              money -= 50
              this.grid[i].image = selectedImage;
              myMap.updatePopulation();
            }
          }
        
        }
        else if(selectedImage === null){ // sets the image on the grid to be a new image, updates the population.
          this.grid[i].image = selectedImage;
          myMap.updatePopulation();
        }
        else{
          
          myMap.updatePopulation();
        }
      }
    }
  }
  updatePopulation(){ // updates the population of your city/town
  
    happiness = 0;
    for (let m = 0; m < this.grid.length; m++){ // looks through the array and if a house is on that tile adds one to house count
      if (this.grid[m].image === house){
        
        houseCount += 1;       
        
      }
      if (this.grid[m].image === farm){ // looks through the array and if a farm is on that tile adds one to farm count
        
        farmCount += 1;
  
      }

     
    }
    
    if (oldHouseCount > houseCount){ // removes population if a house was removed from the grid
      for (let q = 0; q < 4; q++){
        population.pop();
      }
      checkAge();
    }
    jobs = farmCount * 4; // sets the amount of jobs available

    // checks old house and old farm counts used for removing 
    oldFarmCount = farmCount;
    oldHouseCount = houseCount;

    // sets the amount of rooms available in a house
    housesAvailable =  (houseCount * 4) - population.length;

    // creates new millis goals
    newMillisGoal = millis() + 5000;
    taxMillisGoal = millis() + 10000;

    // resets counters so it doesnt keep adding onto old counts
    houseCount = 0;
    farmCount = 0;
    

  }
}

class Button{ // class for buttons

  constructor(xSize, ySize, wSize, hSize, buttonImage, itemCost){ 
    this.buttonX = xSize;
    this.buttonY = ySize;

    this.buttonW = wSize;
    this.buttonH = hSize;

    this.image = buttonImage;

    this.cost = itemCost;


  }
  draw(){
    rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH); //button outline
    image(this.image, this.buttonX, this.buttonY, this.buttonW, this.buttonH); // image to be displayed on button

    if (this.cost > 0){  // text for the cost of the button, if statement used for remover so a price doesnt show up under it

      push();

      textSize(15);
      fill(0);
      text(this.cost, this.buttonX, this.buttonY + 65);

      pop();

    }
  }
  //checks to see which button your mouse was on when you clicked // credit to Nick Schneider 
  mouseOnButton(){
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonW && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonH){
      return true
    }else return false
  }
  
}
function preload(){ // preloads textures

  house = loadImage("assets/clipart-home-garden-13.png");
  farm = loadImage("assets/farm.jpg");
  remove = loadImage("assets/x.png");
  road = loadImage("assets/road.jpg");

}

function setup(){ // sets up scenario
  
  money = 10000; // gives you a starting sum of money

  createCanvas(windowWidth, windowHeight); 

  myMap = new GridGen(10,10) // creates a grid called myMap

  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, house, 1000)); // pushes various buttons into an array

  buttonDistanceX += 50; // changes the distance between each button for the menu that is created later

  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, farm, 1500)); 

  buttonDistanceX += 50;

  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, remove, 0)); 

  buttonDistanceX -= 100;
  buttonDistanceY += 75; 

  buttons.push(new Button(buttonDistanceX -25, buttonDistanceY, 49, 49, road, 50));

  drawMap(); // calls draw map. see line 310
}

function drawMap(){ // sets stroke and fill
  stroke(0);
  fill('green');

}

function draw(){

if (oldHouseCount >= 1 || oldFarmCount >= 1){    // checks to see if youre elligable for income tax
    
    incomeTax(); // runs income tax fucntion. see line 490
    
}
  //draws background and draws grid. draws grid at line 144
  background(255)
  myMap.draw()
  
  UI();// calls ui function. see line 359

  move(); // calls move function. see line 405
  
  if (housesAvailable >= 1){ // checks to see if you are able to populate and calls populate function. see line 429
      populate();
      incomeTax();
  }

  if(workablePopulation > 0 && jobs > 0){ // checks if the program should look to fill jobs
      checkJob() // calls checkJob function at line 509
  }
  // allows you to hold the mouse button and drag a road instead of having to click on each tile
  if(mouseIsPressed && selectedImage === road){
    myMap.mouseOnTile()
  }

  // doesnt allow jobsAvailable to go below 0, shouldnt break anything, just for astetic reasons
  if (jobsAvailable <= 0){
    jobsAvailable = 0;
  }
  
}

function windowResized(){ // runs when window is resized 
  createCanvas(windowWidth, windowHeight);
  
  drawMap();
  UI();
  
}

function UI(){ // creates the ui for the game

  if (displayBuildMenu){ //displays build menu if displayBuildMenu is true
    push()
    fill(255, 255, 255, 100)
    rect(0, 75, 200, windowHeight/2)
    for(let i = 0; i < 4; i++){
      buttons[i].draw();
    }
    pop()
  }
  //creates counters at the top of the screen to keep track of your city/town
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
  //runs when mouse is pressed
  myMap.mouseOnTile() // checks which tile you are clicking on in the grid

  if (displayBuildMenu){ // checks which button in the menu you are clicking on and sets selectedImage to said item.
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
  //moves around the grid so you can see your town/city
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
  // displays the build menu when the e button is pressed
  if (keyCode === 69){
    displayBuildMenu = !displayBuildMenu;
  }

}

function populate(){
    // populates your world every 10 seconds as long as there is free space in your town/city
    if (round(millis()) >= round(newMillisGoal) - 500 && round(millis()) <= round(newMillisGoal + 500) && housesAvailable >= 0){
        housesAvailable -= occupiedProperty;
        
        newMillisGoal = millis() + 5000;
        //pushes a new human into the population array 
        population.push(new Human(random(1, 50), random(50, 100), false, false))
        //updates the population
        myMap.updatePopulation();
        occupiedProperty += 1;
     
        
        // checks age of person. see line 462
        checkAge();
        //checks if the person gets hired into a job. see line 509
        checkJob();
        
          
        
             
    }
    if (millis() > newMillisGoal + 600){
        console.log("no")
        newMillisGoal = millis() + 5000;       
    }
    else{
      return false;
    }
    
    
    
}
function checkAge(){
  // checks the age of each person in the array
    for (let l = 0; l < population.length; l++){
      // if population[l].ageCheck() returns true then add one to possible workers
        if(population[l].ageCheck()){
            possibleWorkers += 1;
        }

    }
    // save the possible working as workablePopulation and resets possibleWorkers so that the function doesnt add onto the old possibleWorkers
    workablePopulation = possibleWorkers;
    possibleWorkers = 0
}

function statusOfCounters(){
  // feature has not been implemented yet
  if (jobsAvailable < 1 ){
    oldHappiness = happiness;
    happiness -= 1;
    console.log(happiness)
    
  }
  if (jobsAvailable <= 0) {
    jobsAvailable = 0;
    happiness++;
  }
}

function incomeTax(){
  // uses millis to give you revenue every 10 seconds
  if (round(millis()) >= round(taxMillisGoal) - 500 && round(millis()) <= round(taxMillisGoal + 500) && housesAvailable >= 0){
    // gives player money based on the amount of houses and farms on the grid
    money += oldHouseCount * 100;
    money += oldFarmCount * 250;
    // sets a new millisGoal
    taxMillisGoal = millis() + 10000;
  }

}

function loseMoney(){
  // feature has not been implemented yet
  if (round(millis()) >= round(taxMillisGoal) - 500 && round(millis()) <= round(taxMillisGoal + 500) && housesAvailable >= 0){
    money -= 1000
    taxMillisGoal = millis() + 10000;
  }
}
function checkJob(){
  // looks through the population array and adds 1 to atWork if population[l].jobsCheck() returns true
    for (let l = 0; l < population.length; l++){
        if(population[l].jobsCheck()){
            atWork += 1;
        }

    }
   // saves a copy of atWork as isWorking and resets atWork so that next time it counts it doesnt add onto the old atWork
    isWorking = atWork; 
    atWork = 0
}
