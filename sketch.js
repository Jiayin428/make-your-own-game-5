
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "kill";

var bg, bgImg

var monster_1Group
var monster_1, monster_1Img, splatImg
var monster_2Group
var monster_2, monster_2Img, orbImg

var hero, heroImg

var bulletGroup
var bullet = 70;
var bulletImg

var life = 5;

var full_life,fifth_life,fourth_life,third_life,second_life,no_life
var full_lifeImg,fifth_lifeImg,fourth_lifeImg,third_lifeImg,second_lifeImg,no_lifeImg

var score = 0;

function preload(){
	bgImg = loadImage("/assets/forest.png");
	monster_1Img = loadImage("/assets/monster_1.png");
	monster_2Img = loadImage("/assets/monster_2.png");
	splatImg = loadImage("/assets/splat.png")
	orbImg = loadImage("/assets/orb.png")

	heroImg = loadImage("/assets/Hero.png")

	bulletImg = loadImage("/assets/bullet.png")

	full_lifeImg = loadImage("/assets/full_life.png")
	fifth_lifeImg = loadImage("/assets/5:6_life.png")
	fourth_lifeImg = loadImage("/assets/4:6_life.png")
	third_lifeImg = loadImage("/assets/3:6_life.png")
	second_lifeImg = loadImage("/assets/2:6_life.png")
	no_lifeImg = loadImage("/assets/no_life.png")
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	engine = Engine.create();
	world = engine.world;

	//create background
	bg = createSprite(displayWidth/2,displayHeight/2-40,20,2)
	bg.scale = 2.1;
	bg.addImage(bgImg);

	//create lives
	full_life = createSprite(displayWidth-1300,40,20,20);
	full_life.addImage(full_lifeImg);
	full_life.scale = 0.25;

	fifth_life = createSprite(displayWidth-1300,40,20,20);
	fifth_life.addImage(fifth_lifeImg);
	fifth_life.scale = 0.25;
	fifth_life.visible = false;

	fourth_life = createSprite(displayWidth-1300,40,20,20);
	fourth_life.addImage(fourth_lifeImg);
	fourth_life.scale = 0.25;
	fourth_life.visible = false;

	third_life = createSprite(displayWidth-1300,40,20,20);
	third_life.addImage(third_lifeImg);
	third_life.scale = 0.25;
	third_life.visible = false;

	second_life = createSprite(displayWidth-1300,40,20,20);
	second_life.addImage(second_lifeImg);
	second_life.scale = 0.25;
	second_life.visible = false;

	no_life = createSprite(displayWidth-1300,40,20,20);
	no_life.addImage(no_lifeImg);
	no_life.scale = 0.25;
	no_life.visible = false;

	//create hero
	hero = createSprite(displayWidth-1150,displayHeight-300,50,50);
	hero.addImage(heroImg);
	hero.scale = 0.4;
	hero.debug = true;
    hero.setCollider("rectangle",0,0,260,260);


	//create groups
	monster_1Group = new Group();
	monster_2Group = new Group();

	bulletGroup = new Group();


	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(190);

	if(gameState == "kill"){

	//displays lives remaining
	if(life == 5){
		full_life.visible = true;
		fifth_life.visible = false;
		fourth_life.visible = false;
		third_life.visible = false;
		second_life.visible = false;
		no_life.visible = false;
	}
	if(life == 4){
		full_life.visible = false;
		fifth_life.visible = true;
		fourth_life.visible = false;
		third_life.visible = false;
		second_life.visible = false;
		no_life.visible = false;
	}
	if(life == 3){
		full_life.visible = false;
		fifth_life.visible = false;
		fourth_life.visible = true;
		third_life.visible = false;
		second_life.visible = false;
		no_life.visible = false;
	}
	if(life == 2){
		full_life.visible = false;
		fifth_life.visible = false;
		fourth_life.visible = false;
		third_life.visible = true;
		second_life.visible = false;
		no_life.visible = false;
	}
	if(life == 1){
		full_life.visible = false;
		fifth_life.visible = false;
		fourth_life.visible = false;
		third_life.visible = false;
		second_life.visible = true;
		no_life.visible = false;
	}
	if(life == 0){
		full_life.visible = false;
		fifth_life.visible = false;
		fourth_life.visible = false;
		third_life.visible = false;
		second_life.visible = false;
		no_life.visible = true;
	}
	

	//gameState to "lost"
	if(life == 0){
		gameState = "lost"; 
	}
	
	//gameState to "won"
	if(score == 100){
		gameState = "won";
	}
	
	//create hero moving
	if(keyDown("UP_ARROW")){
		hero.y = hero.y - 20;
	}
	if(keyDown("DOWN_ARROW")){
		hero.y = hero.y + 20;
	}
	if(keyDown("RIGHT_ARROW")){
		hero.x = hero.x + 20;
	}
	if(keyDown("LEFT_ARROW")){
		hero.x = hero.x - 20;
	}

	//create bullet
	if(keyWentDown("SPACE")){
		bullet = createSprite(hero.x+65,hero.y-32,20,10);
		bullet.addImage(bulletImg);
		bullet.scale = 0.2;
		bullet.velocityX = 20;
		bulletGroup.add(bullet);
		bullet = bullet-1;
	}
	if(keyWentUp("SPACE")){
		hero.addImage(heroImg);
	}

	//go to gameState "bullet"
	if(bullet == 0){
		gameState = "bullet";
	}

	//destroy monsters and increase scores
	if(monster_1Group.isTouching(bulletGroup)){
		for(m=0;m<monster_1Group.length;m++){
			if(monster_1Group[m].isTouching(bulletGroup)){
				monster_1Group[m].addImage(splatImg);
				monster_1Group[m].destroy();
				bulletGroup.destroyEach();

				score = score+2;
				console.log("score"+score);
			}
		}
	}
	if(monster_2Group.isTouching(bulletGroup)){
		for(i=0;i<monster_2Group.length;i++){
			if(monster_2Group[i].isTouching(bulletGroup)){
				monster_2Group[i].addImage(orbImg);
				monster_2Group[i].destroy();
				bulletGroup.destroyEach();

				score = score+7;
				console.log("score"+score);
			}
		}
	}

	//destroy monsters and hero, reduce lives
	if(monster_1Group.isTouching(hero)){
		for(var i=0; i<monster_1Group.length; i++){
			if(monster_1Group[i].isTouching(hero)){
				monster_1Group[i].destroy();
				life = life -1;
			}
		}
	}
	if(monster_2Group.isTouching(hero)){
		for(var i=0; i<monster_2Group.length; i++){
			if(monster_2Group[i].isTouching(hero)){
				monster_2Group[i].destroy();
				life = life -1;
			}
		}
	}
}



	monsters();

  drawSprites();

  //create texts: score, bullets, lives
  textSize(25);
  fill("white");
  text("score: "+score,displayWidth-210,displayHeight/2-360);
  textSize(20);
  text("bullets: "+bullet,displayWidth-210,displayHeight/2-320);
  text("lives: "+life,displayWidth-210,displayHeight/2-290);

  //creates gameStates and display messages: "lost", "won", "bullet"
  if(gameState == "lost"){
	textSize(100);
	fill('#f71b1b');
	text("You Died",500,400);

	monster_1Group.destroyEach();
	monster_2Group.destroyEach();
	hero.destroy();
	}
  else if(gameState == "won"){
	textSize(100);
	fill('#7cf2a7');
	text("You Won!",500,400);
	
	monster_1Group.destroyEach();
	monster_2Group.destroyEach();
	hero.destroy();
	}
  else if(gameState == "bullet"){
    textSize(100);
    fill('#f2bd7c');
    text("You Ran Out of Bullets",500,400);

    bulletGroup.destroyEach();
    monster_1Group.destroyEach();
	monster_2Group.destroyEach();
    hero.destroy();
    }
}

//create function monsters
function monsters(){
	if(frameCount%50 == 0){
        monster_1 = createSprite(random(900,1500),random(300,700),40,40);
        monster_1.addImage(monster_1Img);
        monster_1.scale = 0.40;
        monster_1.velocityX = -5;
        monster_1Group.add(monster_1);
        monster_1.lifetime = 400;

        monster_1.debug = true;
        monster_1.setCollider("rectangle",0,0,160,140);
		//monster_1.collider.isVisible = false;
		monster_1.collider.visible = false;
    }
	if(frameCount%150 == 0){
        monster_2 = createSprite(random(900,1500),random(300,700),20,20);
        monster_2.addImage(monster_2Img);
        monster_2.scale = 0.15;
        monster_2.velocityX = -10;
        monster_2Group.add(monster_2);
        monster_2.lifetime = 400;

        monster_2.debug = true;
        monster_2.setCollider("rectangle",0,0,100,80);
	}
}