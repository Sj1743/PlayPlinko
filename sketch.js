//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const engine = Engine.create();
const world = engine.world;

var particle;
var plinkos = [];
//var particle[];
var divisions = [];
var divisionHeight = 300;
var bottomGround, topGround, leftGround, rightGround;
var score = 0;
var turn = 0;
var turnsLeft = 5;
const START = 0;
const PLAY = 1;
const END = 2;
var gameState = START;

function setup() {

  //canvas
  createCanvas(480,800);

  //create divisions
  for(var i = 80; i <= width; i += 80){
    divisions.push(new Division(i, height-divisionHeight/2, 10, divisionHeight));
  }

  //create plinkos
  //row 1
  for(var j = 40; j <= width; j += 50){
    plinkos.push(new Plinko(j, 75));
  }
  //row 2
  for(var j = 15; j <= width-10; j += 50){
    plinkos.push(new Plinko(j, 175));
  }
  //row 3
  for(var j = 40; j <= width; j += 50){
    plinkos.push(new Plinko(j, 275));
  }
  //row 4
  for(var j = 15; j <= width-10; j += 50){
    plinkos.push(new Plinko(j, 375));
  }

  //borders
  bottomGround = new Ground(240, 800, 480, 20);
  topGround = new Ground(240, 0, 480, 20);
  leftGround = new Ground(0, 400, 20, 800);
  rightGround = new Ground(480, 400, 20, 800);

}


function draw() {

  //update engine
  Engine.update(engine);

  //background
  background("black");  

  //increment turn, scoring
  if(gameState === PLAY){
    if(particle.body.position.y > 550){
      if(((particle.body.position.x > 0) && (particle.body.position.x < 80))
      || ((particle.body.position.x > 400) && (particle.body.position.x < 480))){
        score += 500;
      }else if(((particle.body.position.x > 80) && (particle.body.position.x < 160))
      || ((particle.body.position.x > 320) && (particle.body.position.x < 400))){
        score += 300;
      }else if((particle.body.position.x > 160) && (particle.body.position.x < 320)){
        score += 100;
      }
      particle = null;
      gameState = START;
      if(turn >= 5){
        gameState = END;
      }
    }
  }

  //display particle
  if(particle != null){
    particle.display();
  }

  //call functions
  scoring();
  displayGameObjects();
  displayScores();
  endGame();

}

//when space pressed create new particle
function keyPressed(){
  if(keyCode === 32){
    if(gameState === START){
      gameState = PLAY;
      turn++
      turnsLeft--;
      particle = new Particle(random((width/2)-10, (width/2)+10), 50);
    }
  }
}

//display score and turns
function scoring(){ 
  textAlign(CENTER);
  fill("pink");
  textSize(25);
  text("Score : " + score, 80, 45);
  text("Turns left : " +  turnsLeft, 390, 45);
}

//display division, plinkos, grounds
function displayGameObjects(){
  //display divisions
  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }
  //display plinkos
  for(var k = 0; k < plinkos.length; k++){
    plinkos[k].display();
  }
  //display ground 
  leftGround.display();
  rightGround.display();
  topGround.display();
  bottomGround.display();
}

//display respective scores against each division 
function displayScores(){
  textAlign(CENTER);
  fill("pink");
  textSize(20);
  //bucket 1
  text("500", 40, 500);
  //bucket 2
  text("300", 120, 500);
  //bucket 3
  text("100", 200, 500);
  //bucket 4
  text("100", 280, 500);
  //bucket 5
  text("300", 360, 500);
  //bucket 6
  text("500", 440, 500);
}

//end game after 5 turns
function endGame(){
  if(gameState === END){
    textAlign(CENTER);
    fill("pink");
    textSize(30);
    text("GAME OVER", 240, 450);
  }
}



  /*
  //create particles
  if(frameCount%40 === 0){
    particles.push(new Particle(random((width/2)-10, (width/2)+10), 50));
  }
  //display particles
  for(var k = 0; k < particles.length; k++){
    particles[k].display();
  }
  */