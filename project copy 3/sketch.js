let sa;
let filteredImage;

function setup(){
  createCanvas(windowWidth, windowHeight);
  filteredImage = greyScale(sa);
}
function draw(){
  background(0);

  imageMode(CENTER);
  image(filteredImage, mouseX, mouseY);
}
function preload(){ 
  sa = loadImage("assets/sausage.png");
}
function greyScale(sourceImage){
  let img = createImage(sourceImage.width, sourceImage.height);

  img.loadPixels();
  sourceImage.loadPixels();

  for (let x = 0; x < sourceImage.width; x++){
    for (let y = 0; y < sourceImage.height; y++){
      let p = sourceImage.get(x, y);

      let r = red(p);
      let g = green(p);
      let b = blue(p);

      let average = (r + g + b) / 3;
      
      img.set(x, y, color(average, average, average))
    }
  }
  img.updatePixels();
  return img;
}
