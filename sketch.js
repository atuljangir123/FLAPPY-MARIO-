/*
Game play: https://www.youtube.com/watch?v=fQoJZuBwrkU
*/

let pipes = [];
let bird;
let playing = false;

let birdImg, pipeImg, pipeRevImg, backgroundImg, backgroundSound, backgroundSound1, backgroundSound2;

function preload() {
  birdImg = loadImage('assets/bird.png');
  pipeImg = loadImage('assets/pipes.png');
  pipeRevImg = loadImage('assets/pipes_reverse.png');
  backgroundImg = loadImage('assets/background.png');
  backgroundSound = loadSound("wing.mp3");
  backgroundSound1 = loadSound("hit.mp3");
  backgroundSound2 = loadSound("point.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(40);
  bird = new Bird(width/3, height / 3);
  bird.flap();
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textStyle(BOLDITALIC);
  textSize(50);

}

function draw() {
  background(backgroundImg);
  // drawLine()
  // console.log('Frame rate: ' + frameRate());
  
  textSize(50);
  text("FLAPPY MARIO",windowWidth-350,20)

  if (frameCount % 50 == 0) {
    pipes.push(new Pipe());
    playing = true;
    
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offScreen()) {
      if (pipes[i].pass(bird)) {
        bird.score++;

        backgroundSound2.play();
    backgroundSound2.volume=1;
      }
      pipes.splice(i, 1);
    }
    if (pipes[i].hit(bird)) {
      strokeWeight(8);
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, width - 80, 80);
      fill(0);
      text("Score: " +
        bird.score, width / 2, height / 2);
      playing = false;
      noLoop();
      backgroundSound1.play();
      backgroundSound1.volume=1;
    }
  }
  // draw bird
  bird.show();
  bird.update();
  // show the current score
  if (playing) {
    text(bird.score, width / 2, height / 5);
  }
  if (pipes.length - 1 < 0) {
    text("Let's go", width / 2, height / 3);
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.flap();
    backgroundSound.play();
  backgroundSound.volume=1;
  }
}

function mousePressed(){
  // click inside the canvas
  if(mouseX > 0 && mouseX < width &&
     mouseY > 0 && mouseY < height) {
    bird.flap();
    backgroundSound.play();
  backgroundSound.volume=1;
  }
}


function drawLine() {
  let step = 100;
  stroke(1);
  for (let i = 0; i < height / step; i++) {
    line(0, i * step, width, i * step)
  }
}