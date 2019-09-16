let input;
let bet;
let dealerA;
let dealerB;
let yourHandA;
let yourHandB;
let yourHandT;
let answer;
let playerTurn;
let T;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  bet = prompt("enter bet");
  textSize(25);
  dealerA = round(random(1, 11));
  dealerB = round(random(1, 11));
  yourHandA = round(random(1, 11));
  yourHandB =  round(random(1, 11));
  //playerTurn = true;
  rect(750, 700, 33, 30);
}
function draw(){
  yourHandT = yourHandA + yourHandB;
  if (dealerA === 1){
    dealerA = 11;
  }
  text(yourHandT, 750, 725);
  text(bet, 750, 50);
  rect(50, 700, 400, 40);
  text(answer, 50, 725);
  text(dealerA, 50, 50);
  if (playerTurn === true){
    hitorstand();
  }
  playerTurn = true; 
}
function hitorstand(){
  answer = prompt("Hit or stand");
  if (answer === "hit"){
    rect(750, 700, 33, 30);
    yourHandA = yourHandA + round(random(1, 11));
    console.log(yourHandT);
    playerTurn = false;
  }
  else if (answer === "stand"){
    playerTurn = false;
  }
  if (playerTurn === false){
    draw()
  }
}