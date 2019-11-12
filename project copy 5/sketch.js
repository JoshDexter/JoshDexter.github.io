  
// OOP Bullet

let theFireWorks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = theFireWorks.length - 1 ; i >= 0; i--) {
    theFireWorks[i].move();
    if(theFireWorks[i].isDone()){
      theFireWorks.splice(i, 1);
    }
    else{

      theFireWorks[i].display();
    }
  }


}

function mousePressed() {
  for (let i = 0; i <= 75; i++){
    
    // fill(random(1, 255), random(1, 255), random(1, 255));
    
    let myBullet = new Bullet(mouseX, mouseY, random(-3,3), random(-3, 3), 10, random(1, 255), random(1, 255), random(1, 255));
    
    theFireWorks.push(myBullet);
  }
}

class Bullet {
  constructor(x, y, dx, dy, radius, col1, col2, col3) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.alpha = 255;
    this.colour1 = col1;
    this.colour2 = col2;
    this.colour3 = col3;
    this.gravity = 0.06;
  }

  display() {
    noStroke();
    fill(this.colour1, this.colour2, this.colour3, this.alpha);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 2;
  }
  isDone() {
    return this.alpha <= 0;
  }
  
  
  
}