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
let som;
let fedora;
let cowboy;
let hatState = false;
let menuState = "game";
let someHat = [som, fedora, cowboy]
let hatSelected;
  



function setup() {
  createCanvas(windowWidth, windowHeight);
  UI();
  soundFormats('ogg');
  hatSelected = som;
}
function preload(){
  sausage = loadImage("assets/sausage.png");
  bg = loadImage("assets/oktoberfest.jpg")
  som = loadImage("assets/hat.png")
  clickSound = loadSound('assets/3pops/pop1.ogg')
}
function windowResized(){
  UI();
}
function UI(){
  if (menuState === "game"){
    background(255, 0, 0);
    imageMode(CENTER);
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    image(sausage, windowWidth/2, windowHeight/2);
    textSize(50);
    stroke(255, 0, 0)
    fill("red");
    text(score, windowWidth/2, windowHeight/8)
    textSize(25)
    stroke(0);
    fill(255)
    rect(windowWidth/1.2, windowHeight/8, 100, 50);
    fill(0)
    text(multiplierCost, windowWidth/1.2 + 35, windowHeight/6)
    fill(255, 0, 0)
    text("multiplier", windowWidth/1.2, windowHeight/8 - 5)
    fill(255)
    rect(windowWidth/1.2, windowHeight/4, 100, 50)
    rect(windowWidth/1.2, windowHeight/2.75, 100, 50)
    fill(0)
    text(autoClickerCost, windowWidth/1.2 + 28, windowHeight/3.4)
    fill(255, 0, 0)
    text("auto click", windowWidth/1.2, windowHeight/4 - 5)
    fill(0)
    if (hatState){
      scale(0.15);
      image(hatSelected, width/0.37, height/0.33);
    }
  }
  else if (menuState === "hat"){
    background(255);
    fill(255);
    rect(width/7.5, height/8, 100, 50)
    rect(width/7.5 + 150, height/8, 100, 50)
    rect(width/7.5 + 300, height/8, 100, 50)
    rect(width/7.5 + 450, height/8, 100, 50)
    rect(width/7.5 + 600, height/8, 100, 50)
  }
}
function draw(){
  UI();  
  if (autoClicker === true){
    autoClick();
  }
  if (clickCounter === 1000){
    clickCounter = 0;
    multiplier = multiplier + 1 * 250;
  }
}
function mousePressed(){
  if (menuState === "game"){
    if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
      clickSound.play();
      score += multiplier;
      // console.log(score);
      // console.log(windowHeight)
      // console.log(windowWidth)
      clickCounter += 1;
      // console.log(clickCounter)
      
      UI();  
    }
    if (mouseY > windowHeight/8 && mouseY < windowHeight/5.7 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
      // console.log("AUTO")
      buffer = score;
      if (buffer - multiplierCost >= 0){
        score -= multiplierCost;
        multiplier += 1;
        multiplierCost *= multiplier;
      }
    }
    if (mouseY > windowHeight/4.1 && mouseY < windowHeight/3.4 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
      // console.log("ye")
      buffer = score;
      if (buffer - autoClickerCost >= 0){
        autoClicker = true;
        autoClickerSpeed += 1;
        score -= autoClickerCost;
        autoClickerCost *= autoClickerSpeed;
        if (autoClicker === true){
          newMillisGoal = round(millis() + 1000);
          autoClick();
        }
      } 
    }
    if (mouseY > height/2.755 && mouseY < height/2.35 && mouseX > width/1.2 && mouseX < width/1.05){ 
      menuState = "hat"; 
      hatState = true;
    }
}
  if (menuState === "hat"){
    if (mouseY > height/8 && mouseY < height/8 + 50 && mouseX > width/7.5 && mouseX < width/7.5 + 100){
      hatSelected = someHat[0];
    }
    if (mouseY > height/8 && mouseY < height/8 + 50 && mouseX > width/7.5 + 150 && mouseX < width/7.5 + 100 + 150){
      hatSelected = someHat[1];
    }
    if (mouseY > height/8 && mouseY < height/8 + 50 && mouseX > width/7.5 + 300 && mouseX < width/7.5 + 100 + 300){
      hatSelected = someHat[2];
    }
    if (mouseY > height/8 && mouseY < height/8 + 50 && mouseX > width/7.5 + 450 && mouseX < width/7.5 + 100 + 450){
      hatSelected = someHat[3];
    }
    if (mouseY > height/8 && mouseY < height/8 + 50 && mouseX > width/7.5 + 600 && mouseX < width/7.5 + 100 + 600){
      menuState = "game";
    }
  }
}
function autoClick(){
  if (round(millis()) >= round(newMillisGoal) - 10  && round(millis()) <= round(newMillisGoal + 10)){
    score += 1 * multiplier;
    newMillisGoal = round(millis() + 1000/autoClickerSpeed);
  }
  if (round(millis() > newMillisGoal + 11)){
    newMillisGoal = round(millis() + 1000/autoClickerSpeed);
  }
}

