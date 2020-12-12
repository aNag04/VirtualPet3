class Food{
    constructor(){
        this.foodStock =0
        this.lastFeed;
        this.image = loadImage("Milk.png")

    }
    updateFoodStock(fs){
        this.foodStock = fs
    }
    getFeedTime(lastFeed){this.lastFeed = lastFeed}
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1
        }
    }
    getFoodStock(){
        return this.foodStock
    }
    
    display(){
    background(46,139,87)
    textSize(15)
    if(lastFeed>=12){
        text("LAST FEED :"+lastFeed%12+"pm",50,30)
    }
    else if(lastFeed===0){
        text("LAST FEED : 12 AM",50,30)
    }
    else{ text("LAST FEED :"+lastFeed+"am",50,30)

    }
    var x = 70
    var y = 100 
    imageMode(CENTER)
    if(this.foodStock!=0){
        for(var i = 0; i<this.foodStock; i++){
            if(i%10==0){
                x=70
                y=y+50
            }
            image(this.image,x,y,50,50);
            x=x+30
        }
    }   
       
         } 
         bedroom(){
             background(bedroom,550,500)
             
         }
         garden(){
            background(garden,550,500)
            
        }
        washroom(){
            background(washoom,550,500)
            
        }
         
           
}