var backGround, backgroundImg,ground;
var run, ninja;
var obs1,obs2,obs3,obs4,obs5, obsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
  backgroundImg = loadImage("background.jpeg");
  run = loadAnimation("image/Run__000.png","image/Run__001.png","image/Run__002.png",
  "image/Run__003.png","image/Run__004.png","image/Run__005.png","image/Run__006.png","image/Run__007.png"
  ,"image/Run__008.png","image/Run__009.png");
  obs1 = loadImage("image/Barrel (1).png");
  obs2 = loadImage("image/Barrel (2).png");
  obs3 = loadImage("image/Box.png");
  obs4 = loadImage("image/Saw.png");
  obs5 = loadImage("image/Spike.png");
}

function setup() {
  createCanvas(1200,400);

  backGround = createSprite(400,200);
  backGround.addImage(backgroundImg);
  backGround.scale=5
  backGround.x= backGround.width/2

  
  ground = createSprite(100,400,100,10);

  ninja = createSprite(100,330,10,10);
  ninja.addAnimation("running",run);
  ninja.scale=0.3;
  score = 0;
  
  obsGroup = createGroup();
}

function draw() {
  console.log(ninja.y);
  
    //play state
  if(gameState===1){
      if(backGround.x < 0){
        backGround.x = backGround.width / 2;
      }
    backGround.velocityX = -(4 + 3 * score / 100);
      score = score + Math.round(getFrameRate()/60);
      if(keyDown("space") && ninja.y>200){
        ninja.velocityY = -20;
    }
    ninja.velocityY = ninja.velocityY + 0.8;
      spawnObstacles();
      if(ninja.isTouching(obsGroup)){
        gameState = 0;
    } 
  }
     //end state
  else if(gameState === 0){
      ninja.velocityY = 0;
      backGround.velocityX = 0;
      obsGroup.setLifetimeEach(-1);
      obsGroup.setVelocityXEach(0);
  }

  ninja.depth=backGround.depth+1;
  obsGroup.depth = backGround.depth + 1;
  
  if(ninja.isTouching(ground)){
    ninja.collide(ground);
  }
  drawSprites();
  textSize(30);
 text("Score: "+ score, 500,50);

}
function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(600,330,10,40);
    obstacle.scale = 0.01
    obstacle.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(obs1);
            obstacle.scale = 0.4
               break;
       case 2: obstacle.addImage(obs2);
            obstacle.scale = 0.4
               break;
       case 3: obstacle.addImage(obs3);
            obstacle.scale = 0.4
               break;
       case 4: obstacle.addImage(obs4);
            obstacle.scale = 0.4
               break;
      case 5: obstacle.addImage(obs5);
               obstacle.scale = 0.4
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     //obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obsGroup.add(obstacle);
  }
 }