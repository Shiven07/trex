var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup,cloudImage;
var obstaclesGroup,obstacleImage,obstacle1,obstacle2,
    obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOverImage;
var restartImage;
var gameOver;
var restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOver=loadImage("gameOver.png");
  restart=loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  cloudsGroup= new Group();
  obstaclesGroup= new Group();
  trex = createSprite(50,350,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  score=0;
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -2;
  //restart=createSprite(200,200,50,50);
  //restart.addImage("restart",restartImage);
  //gameOver=createSprite(200,170,50,50);
  //gameOver.addImage("gameOver",gameOverImage);
  invisibleGround = createSprite(200,385,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  background(12);
  
   if (gameState===PLAY)   {
     score=score+Math.round(getFrameRate()/60);
  text("score"+score,500,50);
       if(keyDown("space")) {
    trex.velocityY = -10;
         trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  }
     if (trex.isTouching(obstaclesGroup))    {       
     gameState=END;
   } 
  if (gameState===END)   {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1); 
 

  }
  
  trex.collide(invisibleGround);
  spawnObstacles();
  spawnClouds();
  drawSprites(); 
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
  //  cloud.y = randomNumber(280,320);
    cloud.y=Math.round(random(80,300));
    //cloud.setAnimation("cloud");
cloud.addImage("cloud",cloudImage); 
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    
    
  }
   
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,360,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    //var rand = randomNumber(1,6);
    var rand = Math.round(random(1,6));
    switch (rand){                      
      case 1 : obstacle.addImage(obstacle1);
               break;
     case 2 : obstacle.addImage(obstacle2);
               break;
       case 3 : obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
      case 5 : obstacle.addImage(obstacle5);
               break;
      case 6 : obstacle.addImage(obstacle6);
               break; 
      default:break;
    }  
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}
}