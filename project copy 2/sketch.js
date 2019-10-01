let score = 0;
let multiplier = 1;
let autoClicker = false;
let autoClickerSpeed = 0;
let sausage;
//let sausageLocationX = windowWidth/2;
//let sausageLocationY = windowHeight/2;
let buffer;
let multiplierCost = 20;
let newMillisGoal = 0;

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
  text(multiplierCost, windowWidth/1.2 + 35, windowHeight/6)
  text("multiplier", windowWidth/1.2, windowHeight/8 - 5)
  rect(windowWidth/1.2, windowHeight/5, 100, 50)
}
function draw(){
  UI();  
  if (autoClicker === true){
    autoClick();
  }
}
function mousePressed(){
  if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
    score += multiplier;
    console.log(score);
    console.log(windowHeight)
    console.log(windowWidth)
    UI();  
  }
  if (mouseY > windowHeight/8 && mouseY < windowHeight/5.7 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
    console.log("AUTO")
    buffer = score;
    if (buffer - multiplierCost >= 0){
      score -= multiplierCost;
      multiplier += 1;
      multiplierCost *= multiplier;
    }
  }
  if (mouseY > windowHeight/5 && mouseY < windowHeight/4 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
    console.log("ye")
    autoClicker = true;
    autoClickerSpeed += 1;
    if (autoClicker === true){
      autoClick();
    }
  }
}
function autoClick(){
  //console.log(newMillisGoal)
  //console.log(millis())
  newMillisGoal = round(millis() + 1000);
  if (round(millis()) >= round(newMillisGoal - 10 && round(millis()) <= round(newMillisGoal + 10))){
    score += 1 * multiplier;
    newMillisGoal = round(millis() + 1000);
    console.log(round(newMillisGoal));
    console.log(round(millis()))
  } 
  newMillisGoal = round(millis() + 1000);
}
