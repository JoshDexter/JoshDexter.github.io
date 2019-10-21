let score = 0;
let multiplier = 1;
let autoClicker = false;
let autoClickerSpeed = 0;
let sausage;
let buffer;
let multiplierCost = 20;
let newMillisGoal = 0;
let autoClickerCost = 100;
let clickCounter = 0;
let bg;
let clickSound;
let hatState = false;
let menuState = "game";
let someHat = [];
let hatSelected;

//Sets up the canvas and loads the sound format
function setup() {
  createCanvas(windowWidth, windowHeight);
  UI();

  soundFormats('ogg');
}

//loads images and sounds into game then pushes the hats into an array
function preload(){
  sausage = loadImage("assets/sausage.png");
  bg = loadImage("assets/oktoberfest.jpg")
  som = loadImage("assets/hat.png")
  fedora = loadImage("assets/fedora.png")
  cowboy = loadImage("assets/cowboy.png")

  clickSound = loadSound('assets/3pops/pop1.ogg')

  someHat.push(som);
  someHat.push(fedora);
  someHat.push (cowboy);
}
//Scales UI when the window is resized
function windowResized(){
  UI();
}
//Creates all of the UI
function UI(){
  //Game Screen
  if (menuState === "game"){
    //Sets up scene
    createCanvas(windowWidth, windowHeight);
    background(255, 0, 0);
    //Displays the background image and sausage icon
    imageMode(CENTER);
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    image(sausage, windowWidth/2, windowHeight/2);
    //Creates the buttons
    fill(255)
    rect(windowWidth/1.2, windowHeight/8, 100, 50);  
    fill(255)
    rect(windowWidth/1.2, windowHeight/4, 100, 50)
    rect(windowWidth/1.2, windowHeight/2.75, 100, 50)
    fill(0)
    //Displays the Text
    textSize(50);
    stroke(255, 0, 0)
    fill("red");
    text(score, windowWidth/2, windowHeight/8)
    textSize(25)
    stroke(0); 
    text("multiplier", windowWidth/1.2, windowHeight/8 - 5)
    text("Hats", windowWidth/1.2 + 20, windowHeight/2.75 - 5)
    text("auto click", windowWidth/1.2, windowHeight/4 - 5)
    fill(0);
    text(autoClickerCost, windowWidth/1.2 + 28, windowHeight/3.4)
    text(round(multiplierCost), windowWidth/1.2 + 35, windowHeight/6) 

    //Displays hats if hatState is true
    if (hatState === true){
      scale(0.15)

      if (hatSelected === someHat[1]){
        image(hatSelected, windowWidth/0.36, windowHeight/0.34, 298*2, 246*2);
      }

      else if (hatSelected === someHat[0] || hatSelected === someHat[2]) {
        image(hatSelected, windowWidth/0.36, windowHeight/0.34);
      } 

    }
  }
  //Hat selector screen 
  else if (menuState === "hat"){
    //Sets background
    background(255);
    //Creates the buttons for hats
    fill(255);
    rect(windowWidth/7.5, windowHeight/8, 100, 50)
    rect(windowWidth/7.5 + 150, windowHeight/8, 100, 50)
    rect(windowWidth/7.5 + 300, windowHeight/8, 100, 50)
    rect(windowWidth/7.5 + 450, windowHeight/8, 100, 50)
    rect(windowWidth/7.5 + 600, windowHeight/8, 100, 50)
    //Displays the hat on the correct button
    image(som, windowWidth/7.5, windowHeight/8, 1286/18, 1002/18);
    image(fedora, windowWidth/7.5 + 150, windowHeight/8, 298/5, 246/5);
    image(cowboy, windowWidth/7.5 + 300, windowHeight/8, 913/15, 720/15);
    image(sausage, windowWidth/7.5 + 499, windowHeight/8 + 25, 417/6, 190/6)
    //Creates a back button
    fill(0);
    text("Back", windowWidth/7.5 + 620, windowHeight/8 + 35)
    fill(255);
  }
}
function draw(){
  //Calls the UI function
  UI(); 
  //Calls the autoClick function if autoClicker is true
  if (autoClicker === true){
    autoClick();
  }
  //Increases multiplier if you have clicked the sausage 1000 times
  if (clickCounter === 1000){
    clickCounter = 0;
    multiplier = multiplier + 1 * 250;
  }
}
function mousePressed(){
  //Detects if mouse is clicked on an object in game screen
  if (menuState === "game"){
    //Detects clicks on sausage and increases score
    if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
      clickSound.play();
      score += multiplier;
      clickCounter += 1;
     
      UI();  
    }
    //Detects click on multiplier button and adds multipliers
    if (mouseY > windowHeight/8 && mouseY < windowHeight/5.7 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
      buffer = score;
      //Checks for sufficient funds
      if (buffer - round(multiplierCost) >= 0){
        if (multiplier > 7){
          multiplier += 2;
        }
        //Increases cost of next sausage multiplier
        score -= round(multiplierCost);
        //Increases multiplier
        multiplier += 1;
        multiplierCost *= multiplier/1.5;
      }
    }
    //Detects click on auto clicker button and adds auto clickers
    if (mouseY > windowHeight/4.1 && mouseY < windowHeight/3.4 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
      buffer = score;
      //Checks for sufficient funds
      if (buffer - autoClickerCost >= 0){
        autoClicker = true;
        autoClickerSpeed += 1;
        score -= autoClickerCost;
        //Increases cost for auto clicker
        autoClickerCost *= autoClickerSpeed;
        //Checks for autoClicker true, if true creates a system which checks the time and gives sausage based on lots of variables
        if (autoClicker === true){
          newMillisGoal = round(millis() + 1000);
          autoClick();
        }

      } 

    }
    //Detects clicks on the hat button then changes the menu and the hatState to true
    if (mouseY > windowHeight/2.755 && mouseY < windowHeight/2.35 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){ 
      menuState = "hat"; 
      hatState = true;
    }
}
  //If the hat state is true it will change the menu to the hat selection
  if (menuState === "hat"){
    //Selects which hat to apply
    if (mouseY > windowHeight/8 && mouseY < windowHeight/8 + 50 && mouseX > windowWidth/7.5 && mouseX < windowWidth/7.5 + 100){
      hatSelected = someHat[0];
    }

    if (mouseY > windowHeight/8 && mouseY < windowHeight/8 + 50 && mouseX > windowWidth/7.5 + 150 && mouseX < windowWidth/7.5 + 100 + 150){
      hatSelected = someHat[1];
    }

    if (mouseY > windowHeight/8 && mouseY < windowHeight/8 + 50 && mouseX > windowWidth/7.5 + 300 && mouseX < windowWidth/7.5 + 100 + 300){
      hatSelected = someHat[2];
    }
    //No hat
    if (mouseY > windowHeight/8 && mouseY < windowHeight/8 + 50 && mouseX > windowWidth/7.5 + 450 && mouseX < windowWidth/7.5 + 100 + 450){
      hatState = false;
      UI();
    }
    //Back button returns to game with selected hat
    if (mouseY > windowHeight/8 && mouseY < windowHeight/8 + 50 && mouseX > windowWidth/7.5 + 600 && mouseX < windowWidth/7.5 + 100 + 600){
      menuState = "game";
    }

  }

}
//Creates an autoclicker
function autoClick(){
  //Checks if the current millis is within 10 of the new millis goal, if true adds score and sets another new millis goal
  if (round(millis()) >= round(newMillisGoal) - 10  && round(millis()) <= round(newMillisGoal + 10)){
    score += 1 * multiplier;
    newMillisGoal = round(millis() + 1000/autoClickerSpeed);
  }
  //Checks if the millis have gone over the goal without setting a new goal if so sets a new goal
  if (round(millis() > newMillisGoal + 11)){
    newMillisGoal = round(millis() + 1000/autoClickerSpeed);
  }

}