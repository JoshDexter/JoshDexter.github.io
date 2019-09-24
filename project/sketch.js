
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
}
function windowResized(){
  setup();
}

function draw(){
  
  text(bet, 750, 50);
  rect(50, 700, 400, 40);
  //rect(40, 30, 35, 30);
  text(answer, 50, 725);
  //text(dealerT, 50, 50);
  //console.log(yourHandT)
  if (playerTurn === true){
    hitorstand();
  }
  playerTurn = true; 
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
      resetDeal();
    }

  }
  if (answer === "stand"){
    playerTurn = false;
    rect(40, 30, 35, 30);
    fill(0);
    rect(width/2, height/2, 400, 400);
    
    //console.log("here it is")
    dealerT = dealerA + dealerB + dealerC;
    text(dealerT, 50, 50);
    
    //console.log(dealerA);
    //console.log(dealerB);    
    console.log(dealerT)
    
    if (changeScene === true){
      dealerTurn()
    }
    changeScene = !changeScene;
    
  

}
function dealerTurn(){
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
    playerTurn = false;
    //console.log(playerTurn)
    resetDeal();
    
    
  
  }
  else if (dealerT > 21){
    console.log("you win");
    playerTurn = false;
    console.log(playerTurn)
    resetDeal();
       
  }
  else if (dealerT > yourHandT && dealerT <= 21){
    console.log("you lose")
    playerTurn = false;
    //console.log(playerTurn)
    resetDeal();
   
    
  }
  else if (dealerT === yourHandT){
    console.log("Push")
    playerTurn = false;
    //console.log(playerTurn)
    resetDeal();
    
    
  }

}
}
