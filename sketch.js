var jet, jetImage;
var earth, earthImage;
var asteroid, astImage;
var bullets, bulletsImage;
var missile, missileImage;
var space, backgroundImage;
var ufo, ufoImage;
var ss, ssImage;
var go, goImage;
var gm, gmImage;
var mf, mfSound;
var mf2, mfSound2;
var airM, airMImg;
var alienSS, alienSSImg;
var mip, mipImg;
var alert1, alertImage;
var mp;
var je2;
var PLAY = 1;
var WON = 2;
var END = 0;
var gameState=PLAY;
var score=0;

function preload(){
  je2 = loadImage("images/jet2.png");
  mp = loadSound("sound/mission_passed.mp3");
  mfSound = loadSound("sound/fail.mp3");
  alertImage = loadImage("images/alert.png");
  mipImg = loadImage("images/mp.png");
  alienSSImg = loadImage("images/alien.png");
  airMImg = loadImage("images/air-missile.png");
  mfSound2 = loadSound("sound/mission_failed.mp3");
  earthImage = loadImage("images/earth2.png"); 
  ssImage = loadImage("images/ufo1.png");
  missileImage = loadImage("images/missile.png");
  jetImage = loadImage("images/JetImage.png");
  bulletsImage = loadImage("images/missile4.png")
  backgroundImage = loadImage("images/spaceBg.png");
  astImage = loadImage("images/missile2.png");
  ufoImage = loadImage("images/spaceship.png");
  aImage = loadImage("images/a_in_p.png");
  goImage = loadImage("images/restart.png");
  gmImage = loadImage("images/mf.png");
  mf2 = loadSound("sound/laser_realistic.mp3");
}

function setup() {
  createCanvas(1300,400);
  space = createSprite(650,200,20,20);
  // space.addImage(backgroundImage);
  space.scale = 1.1; 
  earth = createSprite(-95, 200, 50, 50);
  earth.scale = 0.8;
  earth.addImage(earthImage);
  earth.debug = false;
  earth.setCollider("circle",0,0,150)
  jet = createSprite(170, 200, 50, 50);
  jet.scale = .1;
  jet.addImage("jet",jetImage);
  jet.addImage("jet2",je2);
  ufo = createSprite(1220,200,50,50);
  ufo.addImage(ufoImage);
  ufo.scale = 0.8;
  go = createSprite(650,250,50,50);
  go.addImage(goImage);
  go.scale = .5;
  go.debug = false;
  go.setCollider("rectangle",10,10,355,350);
  gm = createSprite(700,100,50,50);
  gm.addImage(gmImage);
  alienSS = createSprite(51270,200,50,50);
  alienSS.addImage(alienSSImg);
  mip = createSprite(650,100,50,50);
  mip.addImage(mipImg);
  alert1 = createSprite(48270,200,50,50);
  alert1.addImage(alertImage);
  alert1.scale = 0.08
  bulletsGroup= new Group();
  missileGroup = new Group();
  asteroidGroup = new Group();
  ufoGroup = new Group();
  mGroup = new Group();
  edges = createEdgeSprites();
}

function draw() {
  background("black");
  if(gameState==PLAY){
    alienSS.velocityX = -30;
    alert1.velocityX = -30;
    mip.visible = false;
    gm.visible = false;
    go.visible = false;
    earth.visible = true;
    jet.visible = true;
    ufo.visible = true;
    asteroid1();
    ufo2();
    if(mGroup.isTouching(alienSS)){
      alienSS.destroy();
      alienSS.velocityX = 0;
      gameState = WON;
      fill("white");
      text("Mission Passed - WE SAVED EARTH", 650, 200);
    }
    if(gameState === WON){
      mp.play();
      mip.visible = true;
      mGroup.setVelocityEach(0);
      mGroup.destroyEach();
      asteroidGroup.setVelocityEach(0);
      asteroidGroup.destroyEach();
      ufoGroup.setVelocityEach(0);
      ufoGroup.destroyEach();
      jet.visible = true;
      earth.visible = true;
      ufo.velocityX = 5;
      jet.velocityX = -3;
      jet.changeImage("jet2",je2);
      jet.lifetime = 50;
    }
    if(bulletsGroup.isTouching(asteroidGroup)){
        asteroidGroup.destroyEach();
        bulletsGroup.destroyEach();
        score = score+5;
    }
    if(missileGroup.isTouching(ufoGroup)){
        missileGroup.destroyEach();
        ufoGroup.destroyEach();
        score = score+10;
  }
    if(keyDown("up_arrow")){
        jet.y += -(15 + score/100);
    }  
    if(keyDown("down_arrow")){
        jet.y -= -(15 + score/100);
    }
    if(keyDown("space")){
      mf2.play();
      createBullets();
    }
    if(keyDown("right_arrow")){
      mf2.play();
      createMissiles();
    }
    if(keyDown("b")){
    createAirMissile();
    }
    
    fill("white");
    text("Score: "+ score, 650,50);
  }
    if(asteroidGroup.isTouching(earth) || ufoGroup.isTouching(earth)){
      gameState = END;
      mfSound.play();
      mfSound2.play();
    }
    if(gameState === END){
      gm.visible = true;
      go.visible = true;
      asteroidGroup.setVelocityEach(0);
      asteroidGroup.destroyEach();
      ufoGroup.setVelocityEach(0);
      ufoGroup.destroyEach();
      jet.visible = false;
      earth.visible = false;
      ufo.visible = false;
      if(mousePressedOver(go)){
        reset();
      }
    }
    jet.collide(edges);
    drawSprites();
}
function createBullets() {
  var bullets= createSprite(100, 100, 60, 10);
  bullets.addImage(bulletsImage);
  bullets.x = 200;
  bullets.y=jet.y;
  bullets.velocityX = 10;
  bullets.lifetime = 100;
  bullets.scale = .11;
  // bullets.debug = true
  // bullets.setCollider("rectangle",0,0,100,10)
  bulletsGroup.add(bullets);
  
}
function createMissiles() {
  var missile= createSprite(100, 100, 60, 10);
  missile.addImage(missileImage);
  missile.x = 200;
  missile.y=jet.y;
  missile.velocityX = 10;
  missile.lifetime = 100;
  missile.scale = .08;
  missileGroup.add(missile);
  missile.debug = false;
}
function asteroid1(){
  if (frameCount % 30 ==0 ){
    asteroid = createSprite(1100,random(20,380),40,40);
    asteroid.addImage(astImage);
    asteroid.debug = false;
    asteroid.velocityX = -(15 + score/30);
    asteroid.scale = 0.2;
    asteroidGroup.add(asteroid);
  }
}
function ufo2(){
  if (frameCount % 100 ==0 ){
    ss = createSprite(1100,random(20,380),40,40);
    ss.addImage(ssImage);
    ss.debug = false;
    ss.velocityX = -(15 + score/100);;
    ss.scale = 0.3;
    ss.depth +=5 ;

    ufoGroup.add(ss);
  }
}
function reset(){
  gameState = PLAY;
  score=0;
  alienSS.x = 51270;
 }
function createAirMissile(){
  airM = createSprite(100,100,60,60);
  airM.addImage(airMImg);
  airM.x = 200;
  airM.y = jet.y;
  airM.velocityX = 10;
  airM.lifetime = 10;
  airM.scale = .4;
  mGroup.add(airM);
}