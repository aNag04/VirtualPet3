//Create variables here
var dog, happyDog, sadDog,garden,washroom,bedroom, lastFeed, currentTime, feed, gameState, readState;
var database;
var foodS, foodStock;
var dogImg,happyDogImg
var milkImg, feedTime, addFood,foodObj;
function preload()
{
sadDog = loadImage("dog.png")
happyDog = loadImage("happyDog.png")
garden = loadImage("Garden.png")
washroom = loadImage("Wash Room.png")
bedroom = loadImage("Bed Room.png")

  //load images here
  
}

function setup() {
	createCanvas(400,500);
  database = firebase.database()
  foodObj = new Food()
  foodStock = database.ref("foodStock")
  foodStock.on("value",readStock)
  
  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastFeed = data.val();
  })

readState = database.ref("gameState").on("value", function(data){
  gameState = data.val();
})
  dog = createSprite(200,400,150,150)
  dog.addImage(sadDog)
  dog.scale = 0.5;
 
  feed = createButton("FEED THE DOG");
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("ADD FOOD");
  addFood.position(800,95)
  addFood.mousePressed(addFoods)



}
function readStock(data){
  foods = data.val()
  foodObj.updateFoodStock(foods)

}

function draw() {  
  //background(46,139,87);
  currentTime = hour();
  if(currentTime==(lastFeed+1)){update("PLAYING");
foodObj.garden();
}
else if(currentTime==(lastFeed+2)){
  update("SLEEPING")
  foodObj.bedroom();
}
else if(currentTime>(lastFeed+2)&&currentTime<=(lastFeed+4)){
update("BATHING")
foodObj.washroom();
}
else{
  update("HUNGRY");
  foodObj.display();
}
  if(gameState!="HUNGRY"){
    feed.hide()
    addFood.hide()
    dog.remove()
    }
    else{
      feed.show()
      addFood.show()
      dog.addImage(sadDog)
    }
   
  drawSprites();
  //add styles here

}
function update(x){
  
  
  database.ref('/').update({
    gameState:x
  })
}
function addFoods(){
 foodS++; 
  
  database.ref('/').update({
    Food: foodS
  })
}
function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime : hour(),
    gameState : "HUNGRY"
  })
}
