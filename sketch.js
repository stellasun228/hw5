var fX = 300;
var fY = 403;

var ufoX = 200;
var ufoY = -100;
var ufoSpeed = 1;
var beamSpeed = 0;

var cowX = 200;
var cowY = 460;
var cowLives = 2;

var shootX = 200;
var shootY = 0;

var lives = 3;
var score = 0;
var highscore = 0;
var onboarding = 0;

var moo;
var pew;
var ufoHit;
var farmerHit;
var gameOver;
var resetSound;

function preload() {
  soundFormats('mp3', 'wav');
  moo = loadSound("moo.mp3");
  pew = loadSound("shoot.wav");
  ufoHit = loadSound("ufo_hit.wav");
  farmerHit = loadSound("farmer_hit.wav");
  gameOver = loadSound("gameover.wav");
  resetSound = loadSound("restart.wav");
}

function setup() {
  createCanvas(400, 500); 
}

function draw() {
  background(35, 69, 125);
  noStroke();  
  fill(99, 112, 56);
  ellipse(120, 450, 370, 200);
  fill(110, 112, 56);
  ellipse(350, 480, 400, 200);
  fill(84, 112, 56);
  ellipse(60, 520, 300, 200);
  fill(80, 133, 56);
  rect(0, 480, width, 20);
  fill(99, 65, 29);
  rect(270, 430, 80, 10);
  fill(138, 33, 1);
  rect(350, 320, 50, 160, 30, 0, 0, 0);  
  fill(255);
  rect(350, 400, 10, 30, 0, 5, 0, 0);  
  if (lives >= 1 && ufoSpeed != 0) {
    textSize(12);
    text("Score: " + score, 310, 50);
    text("Lives: " + lives, 310, 30);
    text("Cows: " + cowLives, 20, 470);
  }
  if (highscore > 0 && lives >= 1) {
    text("Highscore: " + highscore, 310, 70);
  }
  instructions();
  farmer();
  shoot();
  ufo();
  cow();
  checkGameOver();
}

function instructions() {
  if(onboarding === 0) {
    textSize(40);
    text("Holy Cow!", 50, 160);
    textSize(12);
    text("Stella Sun  CP1", 50, 100);
    text("How to Play:", 50, 200);
    text("ARROW KEYS: Moves farmer", 50, 220);
    text("[SPACE]: Shoot at the UFOs", 50, 240);
    text("Mission:", 50, 280);
    text("Protect your cow!", 50, 300);
    text("PRESS [ENTER] TO START", 50, 340);
    ufoSpeed = 0;
    if (keyIsDown(ENTER)) {
      onboarding = 1;
      ufoSpeed = 1;
      moo.play();
      resetSound.play();
    }
  }
}

function farmer() {
  fill(138, 33, 1);
  rect(fX-8, fY+2, 16, 14, 5);
  rect(fX-11, fY+12, 7, 7, 2);
  rect(fX+4, fY+12, 7, 7, 2);
  fill(255);
  ellipse(fX, fY, 10);
  rect(fX-8, fY-2, 16, 3, 5);
  rect(fX-5, fY+5, 10, 15, 3);
  rect(fX-5, fY+17, 3, 10, 5);
  rect(fX+2, fY+17, 3, 10, 5);
  rect(fX-11, fY+6, 9, 3, 5);
  rect(fX+2, fY+6, 9, 3, 5);
  if (lives>=1 && keyIsDown(LEFT_ARROW) && cowLives >=1) {
    fX -= 4;
  }
  if (lives>=1 && keyIsDown(RIGHT_ARROW) && cowLives >=1) {
    fX += 4;
  }
  if (lives>=1 && keyIsDown(UP_ARROW) && cowLives >=1) {
    fY -= 4;
  }
  if (lives>=1 && keyIsDown(DOWN_ARROW) && cowLives >=1) {
    fY += 4;
  }
  if (fX >= width) {
    fX = width;
  }
  if (fX <= 0) {
    fX = 0;
  }
  if (fY >= height-97) {
    fY = height-97;
  }
  if (fY <= height/2) {
    fY = height/2;
  }
}

function shoot() {
  ellipse(shootX, shootY, 10);
  shootY = shootY - 4;
}
function keyTyped() {
  if (key === ' ') {
    pew.play();
    shootX = fX;
    shootY = fY;
  }
}

function ufo() {
  fill(255, 242, 102, 100);
  rect(ufoX, ufoY+20, 20, beamSpeed, 0, 0, 5, 5);
  fill(255);
  rect(ufoX, ufoY, 20, 20, 30, 30, 0, 0); 
  rect(ufoX-8, ufoY+12, 36, 8, 30); 
  stroke(255);
  strokeWeight(2);
  line(ufoX+4, ufoY+1, ufoX+1, ufoY-3);
  line(ufoX+19, ufoY-3, ufoX+16, ufoY+1);
  noStroke();
  ufoY = ufoY + ufoSpeed;
  if (random(10) > 9) {
    ufoX += (random(-15, 15)); 
  }
  if (ufoX <= 0) {
    ufoX = 0;
  }
  if (ufoX >= width-40) {
    ufoX = width-40;
  }
  //if player shoots ufo, ufo gets "killed"
  if (ufoSpeed > 0 && dist(shootX, shootY, ufoX+15, ufoY+10) < 20) {
    ufoHit.play();
    resetUfo();
    shootY = -100;
    score++;
    ufoSpeed = ufoSpeed + 0.3;
  }
  //if player touches ufo, player loses health
  if (ufoSpeed > 0 && dist(fX, fY, ufoX+15, ufoY+10) < 25) {
    farmerHit.play();
    fX = 300;
    fY = 403;
    resetUfo();
    lives--;
  }
  //if ufo reaches cow...
  if (ufoY > height-90 && beamSpeed < 60) {
    if (ufoSpeed != 0) {
      moo.play();
    }
    ufoX = cowX + 5;
    ufoSpeed = 0;
    beamSpeed = beamSpeed + 4;
    if (beamSpeed >= 60) {
      beamSpeed = 60;
    }  
  }
  if (beamSpeed == 60) {
    ufoX = cowX + 5;
    ufoSpeed = - 4;
    cowY = cowY - 4;
    if (ufoY < -100) {
      cowY = 460;
      beamSpeed = 0;
      if (cowLives >= 1) {
      ufoSpeed = 1;
      resetUfo();
      cowLives--;
      }
    }
  }
}

function resetUfo() {
  ufoX = random(width-30);
  ufoY = -100;
}

function cow() {
  stroke(255);
  strokeWeight(3);
  line(cowX+2, cowY+10, cowX+5, cowY+25);
  line(cowX+28, cowY+10, cowX+25, cowY+25);
  line(cowX+29, cowY+9, cowX+32, cowY+15);
  stroke(150);
  line(cowX+10, cowY+10, cowX+10, cowY+25);
  line(cowX+20, cowY+10, cowX+20, cowY+25);
  line(cowX-5, cowY-6, cowX-8, cowY-9);
  line(cowX+4, cowY-6, cowX+7, cowY-9);
  noStroke();
  rect(cowX, cowY, 30, 20, 20, 20, 20, 20);
  ellipse(cowX, cowY, 15, 18);
  fill(150);
  ellipse(cowX+22, cowY+9, 5);
  ellipse(cowX+19, cowY+12, 6);
  ellipse(cowX+13, cowY+4, 3);
  fill(255);
  if (random(15) > 14) {
    cowX += random(-3, 3);
    if (random(10) > 9) {
      cowX += random(-4, 4);
    }
  }
}
  
function checkGameOver() {
  if(lives <= 0 || cowLives <= 0) {
    if (ufoSpeed > 0) {
      gameOver.play();
    }
    if (cowLives <= 0) {
      cowX = 450;
      text("No more cows  :(",75, 210);
    }
    if (lives <= 0) {
      text("No more lives  :(",75, 210);
    }
    ufoSpeed = 0;
    textSize(40);
    text("Game Over",75, 180);
    textSize(15);
    text("Score: " + score,75, 250);
    text("PRESS [ENTER] TO REPLAY",75, 300);
    if (keyIsDown(ENTER)) {
      resetSound.play();
      reset();
    }
  }
}

function reset() {
  lives = 3;
  cowLives = 2;
  cowX = 200;
  if(score > highscore) {
    highscore = score;
  }
  score = 0;
  fX = 300;
  fY = 403;
  ufoY = -100;
  ufoSpeed = 1;
}
