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
  background(255, 0, 0);
  imageMode(CENTER);
  image(sausage, windowWidth/2, windowHeight/2);
  textSize(25);
  text(score, windowWidth/2, windowHeight/8)
  rect(windowWidth/1.2, windowHeight/8, 100, 50);
  text(multiplierCost, windowWidth/1.2 + 35, windowHeight/6)
  text("multiplier", windowWidth/1.2, windowHeight/8 - 5)
  rect(windowWidth/1.2, windowHeight/4, 100, 50)
  text(autoClickerCost, windowWidth/1.2 + 28, windowHeight/3.4)
  text("auto click", windowWidth/1.2, windowHeight/4 - 5)
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
  if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
    score += multiplier;
    console.log(score);
    console.log(windowHeight)
    console.log(windowWidth)
    clickCounter += 1;
    console.log(clickCounter)
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
  if (mouseY > windowHeight/4.1 && mouseY < windowHeight/3.4 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){
    console.log("ye")
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
}
function autoClick(){
 
  
  if (round(millis()) >= round(newMillisGoal) - 10  && round(millis()) <= round(newMillisGoal + 10)){
    score += 1 * multiplier;
    newMillisGoal = round(millis() + 1000/autoClickerSpeed);

  } 
  //newMillisGoal = round(millis() + 1000);
 
}
