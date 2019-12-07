let oneHundredDollarBills = 0;
let fiftyDolarBills = 0;
let twentyDolarBills = 0;
let tenDollarBills = 0;
let fiveDollarBills = 0;
let toonies = 0;
let loonies = 0;
let quarters = 0;
let dimes = 0;
let nickels = 0;
let rolledToonies = 0;
let rolledLoonies = 0;
let rolledQuarters = 0;
let rolledDimes = 0;
let rolledNickles = 0;
let currencyType = [];
let clickedOnTextBox = false;
let maxCharacterLimit = 6
let answer = 0;
let button;
let calculateYes = false;
let calculated = false;
let posReport = 0;

class OkButton{
  constructor(x1, y1, w1, h1, text1){
    this.x1 = x1;
    this.y1 = y1;
    this.w1 = w1;
    this.h1 = h1;
    this.text1 = text1;
  }
  draw(){
    push();
    fill(255);
    stroke(0);
    rect(this.x1, this.y1, this.w1, this.h1)
    pop();
    push();
    fill(0);
    text(this.text1, this.x1 + 38, this.y1 + 30);
    pop();
  }
  mouseOver(){
    if(mouseX > this.x1 && mouseX < this.x1 + this.w1 && mouseY > this.y1 && mouseY < this.y1 + this.h1){
      return true; 
    }
  }
}
class TextBox{
  constructor(x1, y1, w1, h1, type1, clicked, amount1){
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.textData= amount1;
    
    this.type = type1;
    
    this.clickedOn = clicked;
    
  }
  draw(){
    push()
    fill(255);
    rect(this.x, this.y, this.w, this.h)
    push()
    fill(0);
    
    text(this.type, this.x, this.y - 5)
    textAlign(CENTER)
    text(this.textData, this.x + 60, this.y + 35)
   
    pop()
  }
  inputTextName(inputText){
    
    if (this.textData.length < maxCharacterLimit){

      this.textData += inputText;
    }
      
      
    
    
  
  }
  deleteText(line){
    if (currencyType[line].clickedOn){
      currencyType[line].textData = currencyType[line].textData.slice(0, -1);
      currencyType[line].draw();
    }
  }
  mouseOn(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      return true; 
    }
  }
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  textSize(30);
  button = new OkButton(windowWidth/3, windowHeight/10 + 550, 120, 50, "GO");
  currencyType.push(new TextBox(windowWidth/7, windowHeight/10, 120, 50, "$100", false, "0"));
  currencyType.push(new TextBox(windowWidth/7, windowHeight/10 + 100, 120, 50, "$50", false, "0"));
  currencyType.push(new TextBox(windowWidth/7, windowHeight/10 + 200, 120, 50, "$20", false, "0"));
  currencyType.push(new TextBox(windowWidth/7, windowHeight/10 + 300, 120, 50, "$10", false, "0"));
  currencyType.push(new TextBox(windowWidth/7, windowHeight/10 + 400, 120, 50, "$5", false, "0"));
  currencyType.push(new TextBox(windowWidth/3, windowHeight/10, 120, 50, "$2", false, "0"));
  currencyType.push(new TextBox(windowWidth/3, windowHeight/10 + 100, 120, 50, "$1", false, "0"));
  currencyType.push(new TextBox(windowWidth/3, windowHeight/10 + 200, 120, 50, "$0.25", false, "0"));
  currencyType.push(new TextBox(windowWidth/3, windowHeight/10 + 300, 120, 50, "$0.10", false, "0"));
  currencyType.push(new TextBox(windowWidth/3, windowHeight/10 + 400, 120, 50, "$0.05", false, "0"));
  currencyType.push(new TextBox(windowWidth/2, windowHeight/10, 120, 50, "rolled toonies", false, "0"));
  currencyType.push(new TextBox(windowWidth/2, windowHeight/10 + 100, 120, 50, "rolled loonies", false, "0"));
  currencyType.push(new TextBox(windowWidth/2, windowHeight/10 + 200, 120, 50, "rolled quarters", false, "0"));
  currencyType.push(new TextBox(windowWidth/2, windowHeight/10 + 300, 120, 50, "rolled dimes", false, "0"));
  currencyType.push(new TextBox(windowWidth/2, windowHeight/10 + 400, 120, 50, "rolled nickles", false, "0")); 
  currencyType.push(new TextBox(windowWidth/1.5, windowHeight/10 + 200, 120, 50, "POS Cash Report", false, "0")); 
  
}

function mousePressed(){
  for (let i = 0; i < currencyType.length; i++){
    currencyType[i].clickedOn = false;
    if(currencyType[i].mouseOn()){
      console.log("click")
      currencyType[i].clickedOn = true;
    }
  }
  if (button.mouseOver()){
    
    calculateYes = true;
    calculated = false;
  }
}
function keyTyped(){
  console.log("yes")
  for (let i = 0; i < currencyType.length; i++){
    if (currencyType[i].clickedOn){
      currencyType[i].inputTextName(key);
    }
  }

}
function keyPressed(){
  if (keyCode === BACKSPACE){
    console.log("delete")
    for (let j = 0; j < currencyType.length; j++){
      currencyType[j].deleteText(j);
    }  
  }
}
function calculate(){
  if (calculated === false){
    
    for(let i = 0; i < currencyType.length - 1; i++){
      answer += parseFloat(currencyType[i].textData)
      
    }
    posReport = parseFloat(currencyType[15].textData);
    calculated = true;
    posReport = Number(posReport);
  }
  fill(0)
  text("total cash: " + answer.toFixed(2), windowWidth/2, windowHeight/1.5);
  
  text("actual cash: " + Number(answer - 400).toFixed(2), windowWidth/2, windowHeight/1.5 + 50);

  text("Over/Under: " + Number((answer - 400) - posReport).toFixed(2), windowWidth/2, windowHeight/1.5 + 100);
  console.log(Number(answer - 400 - posReport))
  //answer = 0;
}
  




function draw(){
  background(255);

  for (let i = 0; i < currencyType.length; i++){
    currencyType[i].draw();
  }
  button.draw();
  if (calculateYes){
    calculate();
  }
}


