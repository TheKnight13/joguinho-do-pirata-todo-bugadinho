const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = []
var balls = [];
var boats = [];
var boatAnimation = [];
var boatSpritedata, brokenBoatSpritesheet;
var isGameOver = false 




let engine;
let world;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("./assets/boatbo/at.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png");
  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 440, 310);
  cannon = new Cannon(180, 110, 110, 50, angle);
  boat = new Boat(width, height - 100, 200, 200, -100);
  var boatFrames = boatSpritedata.frames;
for(var i = 0; i < boatFrames.lenght; i++){
var pos = boatFrames[i].position;
var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
boatAnimation.push(img);
}

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

 

  Engine.update(engine);
  ground.display();

 //for para percorrer a matriz balls

for(var i = 0; i < balls.length; i++ ){
  showCannonBalls(balls[i], i) 
 for(var j = 0; j < boats.lenght; j++ ){
   if(balls[i] !== undefined && boats[j] !== undefined){
    var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
    if(collision.collided) {
    boats[j].remove(j);
    Matter.World.remove(world, balls[i].body)
    balls.splice(i, 1);
    i--;
    }
   }
 }
}
  //crie um laço de repetição
  showBoats()           
  cannon.display();
  tower.display();

  
}

//crie uma função de acionamento de tecla

function keyPressed() {
  if(keyCode == DOWN_ARROW) {
    //cannonBall.shoot();
    //criar bola de canhão
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
    //console.log(balls)
  }
}

//crie uma função para exibir a bala

function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}


function showCannonBalls(ball, index) {
  ball.display()
  //criar if para remover bolas já lançadas
  if(ball.body.position.x >= width  || ball.body.position.y >= height  -50) {
    Matter.World.remove(world, ball.body);//removendo do mundo
    balls.splice(index, 1);
  }
}
function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );
 
 
      boats.push(boat);
    }
 
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });
      
      boats[i].display();
      boats[i].animate();
     var collision = Matter.SAT.collides(tower.body, boats[i].body)
     if(collision.collided && !boats[i].isBroken){
      isGameOver = true;
      gameOver();
     }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}
cannon.display();
tower.display();


 var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
 function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if(isConfirm) {
        location.reload();
      }
    }
  );
}


