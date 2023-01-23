//Game States
var PLAY=1;
var END=0;
var gameState= PLAY;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monster, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh, knifeSwooshSound;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");  
  gameOverSound = loadSound("gameover.mp3"); 
  knifeSwooshSound = loadSound("knifeSwoosh.mp3"); 
}



function setup() {
  createCanvas(600, 600);
  
  //crear cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;  
  
  //establecer el colisionador para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //variables Score y grupos
  score=0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    //Llamar a las funciones fruits y Monster 
    fruits();
    Monster();

    //Mover el cuchillo con el mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;    
  
    //Aumentar la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){

      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      
      score=score+2;   

    } else if(monsterGroup.isTouching(knife)){
      gameState=END;
    }


  //Cambiar a estado end si el cuchillo toca al enemigo
  } else if(gameState===END){
        //sonido de gameover
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();

        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Cambiar la animación del cuchillo a gameover y reiniciar su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    
    
    //Mostrar la puntuación
  textSize(25);
  text("Puntuación : " + score,250,50);

  drawSprites();
}

function Monster(){
  if(frameCount% 200 === 0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(frameCount % 80 === 0){ 
    
    position = Math.round(random(1,2)); 
    fruit=createSprite(400,200,20,20);
    
  //Aumentar la velocidad de la fruta después de que la puntuación llegue a 4 

  if(position === 1){
    fruit.x=600;
    fruit.velocityX=-(7+(score/4));
  } else{
    fruit.x=0;
    fruit.velocityX= (7+(score/4));
  }   
       
     
    fruit.scale=0.2;
    fruit.debug=true;

    var r = Math.round(random(1,4));
    
    switch(r){
      case 1: 
        fruit.addImage(fruit1);
        break;
      case 2:
        fruit.addImage(fruit2);
        break; 
      case 3: 
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
        break; 
      default: 
        break; 
    }

  /*
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }*/
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
