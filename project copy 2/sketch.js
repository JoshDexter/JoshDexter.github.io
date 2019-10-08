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
let hat;
let hatState = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  UI();
  soundFormats('ogg');
}
function preload(){
  sausage = loadImage("assets/sausage.png");
  bg = loadImage("assets/oktoberfest.jpg")
  hat = loadImage("assets/hat.png")
  clickSound = loadSound('assets/3pops/pop1.ogg')
}
function windowResized(){
  UI();
}
function UI(){
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
    image(hat, windowWidth/0.37, windowHeight/0.33);
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
  
  if (mouseY < windowHeight/1.7 && mouseY > windowHeight/2.3 && mouseX < windowWidth/1.5 && mouseX > windowWidth/3.1){
    clickSound.play();
    score += multiplier;
    // console.log(score);
    // console.log(windowHeight)
    // console.log(windowWidth)
    clickCounter += 1;
    // console.log(clickCounter)
    hatState = true;
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
  if (mouseY > windowHeight/2.75 && mouseY < windowHeight/2 && mouseX > windowWidth/1.2 && mouseX < windowWidth/1.05){  
    console.log("ye")
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

