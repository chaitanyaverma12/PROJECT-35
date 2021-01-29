var ballon;
var background;
var database;
var position;

function preload(){
  backgroundImg=loadImage("Hot Air Ballon-01.png")
  ballonImage=loadImage("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  ballon=createSprite(100,140,20,20);
  ballon.addAnimation("ballon",ballonImage);
  ballon.scale=0.4;
var ballonPosition=database.ref('ballon/height');
ballonPosition.on("value",readHeight,showError);
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    ballon.x=ballon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    ballon.x=ballon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    ballon.addAnimation("Hot Air Ballon-02.png")
  //  ballon.y=ballon.y -10;
    ballon.scale=ballon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    ballon.y=ballon.y +10;
  }
  drawSprites();
}

function updateHeight(x,y){
database.ref('ballon/height').set({
  'x':height.x+x,
  'y':height.y+y
})
}
function readHeight(){
 height=database.val();
  ballon.x=height.x;
  ballon.y=height.y;
}
function showError(){
  console.log("ERROR")
}