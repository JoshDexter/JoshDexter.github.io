//creating variables
let bet;
let dealerA;
let dealerB;
let yourHandA;
let yourHandB;
let yourHandT = 0;
let answer;
let playerTurn;
let dealerT;
let yourHandT1;
let yourHandC = 0;
let dealerC = 0;
let dealerT1;
let endRound = false;

function setup(){
  //create the canvas
  createCanvas(windowWidth, windowHeight);
  resetDeal();
}

function resetDeal() {
  //set up the scene
  background(255, 255, 255);
  bet = prompt("bet");
  textSize(25);
  dealerA = round(random(1, 11));
  dealerB = round(random(1, 11));
  yourHandA = round(random(1, 11));
  yourHandB =  round(random(1, 11));
  yourHandC = 0;
  playerTurn = false;
  rect(40, 30, 35, 30);
  rect(750, 700, 35, 30);
  if (yourHandA === 11 && yourHandB === 11){
    yourHandB = 1;
  }
  if (dealerA === 1){
    dealerA = 11;
  }
  yourHandT1 = yourHandA + yourHandB + yourHandC;
  text(yourHandT1, 750, 725);
  dealerT1 = dealerA;
  rect(40, 30, 35, 30);
  text(dealerT1, 50, 50);
  rect(1500, 20, 85, 40)
  text("Restart", 1500, 48)
}

function draw(){
  //more set up
  text(bet, 750, 50);
  rect(50, 700, 400, 40);
  text(answer, 50, 725); 
  if (playerTurn === true && endRound === false){
    hitorstand();
  }
  playerTurn = true; 
}

function mouseClicked(){
  //checks to see if mouse is clicked on the restart button if so, it refreshs the page
  if ((mouseX >= 1500 && mouseX <= 1585) && (mouseY >=20 && mouseY <= 68)){
    location.reload();
  }
}

function hitorstand(){
  //asks for input from the user to hit or stand
  answer = prompt("Hit or stand"); 
  if (answer === "hit"){
    //increases your hands total by a number5 between 1 - 11
    rect(750, 700, 35, 30);
    yourHandC = yourHandC + round(random(1, 11));
    yourHandT = yourHandA + yourHandB + yourHandC;     
    text(yourHandT, 750, 725); 
    if (yourHandT > 21){
      //checks if you went over 21, if so ends the game
      text("Lose", windowWidth/2, windowHeight/2);
      playerTurn = false;
      endRound = true;
    }
  }
  if (answer === "stand"){
    //increases the dealers hands total until it has reached at least 17
    playerTurn = false;
    rect(40, 30, 35, 30);  
    dealerT = dealerA + dealerB + dealerC;
    text(dealerT, 50, 50);
   
  while (dealerT <= 17){
    rect(40, 30, 35, 30);
    dealerC = dealerC + round(random(1, 11));
    dealerT = dealerA + dealerB + dealerC; 
    text(dealerT, 50, 50);  
    text(dealerT, 50, 50);
  }   
    
  //Checks to see who won the game, or if it was a tie
  if ( yourHandT > dealerT && yourHandT <=21){    
    text("Win", windowWidth/2, windowHeight/2)
    playerTurn = false;
    endRound = true;
  }
  else if (dealerT > 21){    
    text("Win", windowWidth/2, windowHeight/2)
    playerTurn = false;   
    endRound = true;
  }
  else if (dealerT > yourHandT && dealerT <= 21){    
    text("Lose", windowWidth/2, windowHeight/2)
    playerTurn = false;
    endRound = true;
  }
  else if (dealerT === yourHandT){  
    playerTurn = false;
    text("Push", windowWidth/2, windowHeight/2)
    endRound = true;
  }
}
}
