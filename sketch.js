var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage, obstacle, obstacleImage;
var score;
var survivalTime=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstacleGroup = createGroup();
  bananaGroup =  createGroup();

  score = 0;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y >=300) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
      score=  score+1
    }
  
    player.collide(ground);

  }

  drawSprites();
     
     fill("white");
     textSize(20);
     survivalTime=Math.ceil(frameCount/frameRate())
     text("Survival Time: "+ survivalTime, 100, 50);
}


function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,530,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}

