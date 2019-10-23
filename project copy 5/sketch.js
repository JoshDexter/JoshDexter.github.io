let cannonX ;
let cannonY ;
let cannonWidth ;
let cannonLength ;
let cannonAngle;
let bullets = [];

function setup(){
  createCanvas(windowWidth, windowHeight)

   cannonX = 75;
   cannonY = height - 150;
   cannonWidth = 50;
   cannonLength = 125;
   cannonAngle = 0;
}

function draw() {
  background(220);

  displayCannon()
  updateBullets();
  for(i = 0; i < 10; i++){
    fire()

  }
  for (let i = bullets.length - 1; i > 0; i--) { 
    if (bullets[i].x > windowWidth || bullets[i].x < 0 || bullets[i].y > windowHeight || bullets[i].y < 0 ){
     bullets.splice(i, 1)
    }
  }
}

function displayCannon(){
  push();
  translate(cannonX, cannonY);
  cannonAngle = atan2(mouseY - cannonY, mouseX - cannonX);
  rotate(cannonAngle);
  rect(0, -cannonWidth/2, cannonLength, cannonWidth)
  circle(0, 0, cannonWidth)
  pop();
}
function mouseClicked() {
  fire();
}
function fire() {
  let bullet = {
    x: cannonX,
    y: cannonY,
    radius: cannonWidth,
    angle: random(1, 360),
    speed: 5,
    r: random(1, 255),
    g: random(1, 255),
    b: random(1, 255)
  };
  bullets.push(bullet);
}
function updateBullets() {
  for (let bullet of bullets) {
    bullet.x += bullet.speed * cos(bullet.angle);
    bullet.y += bullet.speed * sin(bullet.angle);
    fill(bullet.r, bullet.g, bullet.b)
    circle(bullet.x, bullet.y, bullet.radius);
    fill(255)

  }
}