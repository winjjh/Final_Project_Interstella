let dots;

function setup() {
  createCanvas(400, 400);
  // create and start the audio
  dots = new p5.AudioIn();
  dots.start();
}
  
function draw(){
  stroke(random(222),random(222),random(222))
  fill(random(255),random(255),random(255), 30)
  strokeWeight(random (10))
  
  let diameter = dots.getLevel()*1000
  circle(random(width),random(height),diameter)
}