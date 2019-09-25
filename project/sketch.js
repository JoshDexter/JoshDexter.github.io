
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
let changeScene = false;
let endRound = false;


function setup(){
  createCanvas(windowWidth, windowHeight);
  resetDeal();
}

function resetDeal() {

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
  text(bet, 750, 50);
  rect(50, 700, 400, 40);
  //rect(40, 30, 35, 30);
  text(answer, 50, 725);
  //text(dealerT, 50, 50);
  //console.log(yourHandT)
  if (playerTurn === true && endRound === false){
    hitorstand();
  }
  playerTurn = true; 
}
function mouseClicked(){
  if ((mouseX >= 1500 && mouseX <= 1585) && (mouseY >=20 && mouseY <= 68)){
    location.reload();
  }
}
function hitorstand(){
 
  answer = prompt("Hit or stand");
  
  if (answer === "hit"){
    rect(750, 700, 35, 30);
    yourHandC = yourHandC + round(random(1, 11));
    yourHandT = yourHandA + yourHandB + yourHandC; 
    console.log(yourHandT)
    text(yourHandT, 750, 725); 
    if (yourHandT > 21){
      console.log("you lose");
      text("Lose", windowWidth/2, windowHeight/2);
      playerTurn = false;
      endRound = true;
    }

  }
  if (answer === "stand"){
    playerTurn = false;
    rect(40, 30, 35, 30);
    
    
    dealerT = dealerA + dealerB + dealerC;
    text(dealerT, 50, 50);
    
   
    console.log(dealerT)

    console.log(dealerT)
  while (dealerT <= 17){
    rect(40, 30, 35, 30);
    dealerC = dealerC + round(random(1, 11));
    dealerT = dealerA + dealerB + dealerC; 
    text(dealerT, 50, 50);
    console.log(dealerT);
    text(dealerT, 50, 50);
  }
    
    

  if ( yourHandT > dealerT && yourHandT <=21){
    console.log("you win");
    text("Win", windowWidth/2, windowHeight/2)
    playerTurn = false;
    endRound = true;
    //console.log(playerTurn)
    

    
  
  }
  else if (dealerT > 21){
    console.log("you win");
    text("Win", windowWidth/2, windowHeight/2)
    playerTurn = false;
    console.log(playerTurn)
    endRound = true;
   
 
  }
  else if (dealerT > yourHandT && dealerT <= 21){
    console.log("you lose")
    text("Lose", windowWidth/2, windowHeight/2)
    playerTurn = false;
    //console.log(playerTurn)
    endRound = true;
 
    
  }
  else if (dealerT === yourHandT){
    console.log("Push")
    playerTurn = false;
    text("Push", windowWidth/2, windowHeight/2)
    //console.log(playerTurn)
    endRound = true;
  }
    
  

}

}
