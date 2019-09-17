
let bet;
let dealerA;
let dealerB;
let yourHandA;
let yourHandB;
let yourHandT;
let answer;
let playerTurn;
let dealerT;

function setup(){
  bet = 0;
  dealerA = 0;
  dealerB = 0;
  yourHandA = 0;
  yourHandB = 0;
  yourHandT = 0;
  answer= 0;
  dealerT = 0;
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  bet = prompt("enter bet");
  textSize(25);
  dealerA = round(random(1, 11));
  dealerB = round(random(1, 11));
  yourHandA = round(random(1, 11));
  yourHandB =  round(random(1, 11));
  playerTurn = false;
  rect(40, 30, 35, 30);
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
  if (yourHandT > 21){
    console.log("You're a shitter.")
  }
  
}
function hitorstand(){
 
  answer = prompt("Hit or stand");
  
  if (answer === "hit"){
    rect(750, 700, 35, 30);
    yourHandA = yourHandA + round(random(1, 11));
    console.log(yourHandT);
    playerTurn = false;
    draw()
    
  }
  else if (answer === "stand"){
    playerTurn = false;
    console.log(dealerA);
    console.log(dealerB);
    dealerT = dealerA + dealerB;
    dealerTurn();
  }

}
function dealerTurn(){
  if(yourHandT > 21){
    console.log("you lose");
    playerTurn = false;
    console.log(playerTurn)
    setup(); 
    draw()
  }
  while (dealerT <= 17){
    dealerA = dealerA + round(random(1, 11));
    dealerT = dealerA + dealerB;
    rect(40, 30, 35, 30);
    text(dealerT, 50, 50);
    console.log(dealerT);
  }
  if ( yourHandT > dealerT && yourHandT <=21){
    console.log("you win");
    playerTurn = false;
    console.log(playerTurn)
    setup();
    draw()
    
  
  }
  else if (dealerT > 21){
    console.log("you win");
    playerTurn = false;
    console.log(playerTurn)
    draw() 
       
  }
  else if(dealerT > yourHandT && dealerT <= 21){
    console.log("you lose")
    playerTurn = false;
    console.log(playerTurn)
    setup();
    draw()
    
  }
  else if (dealerT === yourHandT){
    console.log("Push")
    playerTurn = false;
    console.log(playerTurn)
    setup();
    draw()
    
  }
}
