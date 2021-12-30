var Square ,squareImage;
var blocker, blockerImage;
var score = 0;
var ranNum = 0; 
var sqNum = 1;
var giver , giverImage;

function preload(){
    squareImage = loadImage("Character.png");
    giverImage = loadImage("life.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    Square = createSprite(windowWidth/2,windowHeight-100,100,100,"0");
    Square.addImage(squareImage);
    Square.scale  = 1;

    //spawnGiver();
    //giver.addImage(giverImage);
} 

function draw() {

    background("white");

    Square.x = World.mouseX;

    if (World.frameCount % 160 == 0){
        spawnBlocker();
    }

    if (Square.isTouching(blocker)){
        blocker.velocityY = 0;
        if(World.frameCount% 2 == 0){
            sqNum = sqNum - 1;
            score = score + 1;
            blocker.destroy();
        }
    }

    if (World.frameCount % Math.round(random(100,200)) == 0){
        spawnGiver();
    }

    if (Square.isTouching(giver)){
        giver.velocityY = 0;
        if(World.frameCount % 11 == 0){
            sqNum = sqNum  + 1;
            giver.destroy();
        }
    }

    if (sqNum < 0){
        GameOver();
    }

    console.log(frameCount);
    
    fill("black");
    textSize(17.5);
    text("Score:" + score,5,25);
    text("Lives:" + sqNum,5,50)
 drawSprites();
}

function spawnBlocker(){
    blocker = createSprite(Math.round(random(50,windowWidth-50)),windowHeight-710,100,100);
    blocker.scale  = 1;
    blocker.velocityY=6;
    if(blocker.y > windowHeight + 100){
        blocker.destroy();
    }
    blocker.lifetime = 100;
}

function spawnGiver(){
    giver = createSprite(Math.round(random(50,windowWidth-50)),windowHeight-710,100,100);
    
    giver.scale = 0.5;
    giver.velocityY = 6;
    giver.lifetime = 50;
    if (giver.y > windowHeight + 100){
        giver.destroy();
    }
    giver.lifetime = 100;
}

function GameOver(){
    blocker.velocityY = 0;
    giver.velocityY = 0;
    blocker.lifetime += 1;
    giver.lifetime += 1;
    gameOver.visable = true;
    restartButton.visable = true;
}