let input;
let bet;
let dealerA;
let dealerB;
let yourHandA;
let yourHandB;
let yourHandT;
let answer;

function setup(){
  createCanvas(windowWidth, windowHeight)
  background(255, 255, 255);
  bet = prompt("enter bet");
  textSize(25);
  dealerA = round(random(1, 11));
  dealerB = round(random(1, 11));
  yourHandA = round(random(1, 11));
  yourHandB =  round(random(1, 11));
  draw();
  hitorstand();
}
function draw(){
  yourHandT = yourHandA + yourHandB
  if (dealerA === 1){
    dealerA = 11;
  }
  text(yourHandT, 750, 725)
  text(bet, 750, 50)
  rect(50, 700, 400, 40);
  text(input, 50, 725);
  text(dealerA, 50, 50);
  
}
function hitorstand(){
  answer = prompt("Hit or stand");
  return answer;
}