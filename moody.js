let dots;

function setup() {
  createCanvas(1000, 1000);
  // create and start the audio
  dots = new p5.AudioIn();
  dots.start();
}

function draw(){
  stroke(random(350),random(222),random(222))
  fill(random(255),random(225),random(255), 40)
  strokeWeight(random (100))
  
  
  
  let diameter = dots.getLevel()*30000
  circle(random(width),random(height),diameter)
  

}