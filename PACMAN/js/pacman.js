//Total 3 lives for Pacman
var total_life = 3;
//Initial game state
var gameStatus = "Started";
var isPlaying = false;

Crafty.c('Pacman', {
    //Number of ghosts pacman has eaten. If its 4, then Pacman Wins
    ghostEaten: 0,
    //Total number lives with pacman
    life: total_life,
    //Number of dots pacman has eaten. If it has eaten all dots, 
    //then Pacman Wins
    totalDotsEaten: 0,

    init: function() {
    this.requires('Actor, spr_pacman, Fourway, Collision,SpriteAnimation')
    .attr({direction: 'NONE',initx:0,inity:0})
    .fourway(4)
    .stopOnSolids()
    .onHit('Dots', this.visitDots)
    .onHit('LargeDots', this.visitLargeDots)
    .onHit('Wallh', this.visitWall)
    .onHit('Wallv', this.visitWall)
    .reel('PlayerMovingUp',    400, 10, 3, 2)
    .reel('PlayerMovingRight', 400, 10, 0, 2)
    .reel('PlayerMovingDown',  400, 10, 1, 2)
    .reel('PlayerMovingLeft',  400, 10, 2, 2);
    
    var speed = 1.5;
    var animation_speed = 4;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', -1);
        this.attr({direction: 'RIGHT'})
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', -1);
        this.attr({direction: 'LEFT'})
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', -1);
        this.attr({direction: 'DOWN'})
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', -1);
        this.attr({direction: 'UP'})
      } 
    });
      

         

    //Initial state of game
    Crafty.e("life_bar").each(function(){this.update();});
    gameStatus="Started";
    Crafty.e("status_bar").each(function(){this.update();});

    this.bind('EnterFrame', function () {
       if (this.direction === 'UP'){
            this.fourway(0);
            this.y -= speed ;
            if (this._movement) {
				this.fourway(4);
				if(this.direction === 'DOWN') {
                    this.fourway(0);
					this.y += speed;
                }
                this.fourway(4)
                if(this.direction === 'UP') {
                    this.fourway(0);
					this.y = this.y -speed + 3;
                }
            }
       }
              
       if (this.direction === 'DOWN'){
            this.fourway(0);
            this.y += speed ;
            if (this._movement) {
                this.fourway(4);
                if(this.direction === 'UP') {
                    this.fourway(0);
                    this.y -= speed;
                }
                this.fourway(4)
                if(this.direction === 'DOWN') {
                    this.fourway(0);
                    this.y = this.y +speed - 3;
                }
            }
        }
              
              if (this.direction === 'RIGHT'){
              this.fourway(0);
              this.x += speed ;
              if (this._movement) {
              this.fourway(4);
              if(this.direction === 'LEFT') {
              this.fourway(0);
              this.x -= speed;
              }this.fourway(4)
              if(this.direction === 'RIGHT') {
              this.fourway(0);
              this.x = this.x +speed - 3;
              }
              }
              }
              
              if (this.direction === 'LEFT'){
              this.fourway(0);
              this.x -= speed ;
              if (this._movement) {
              this.fourway(4);
              if(this.direction === 'RIGHT') {
              this.fourway(0);
              this.x += speed;
              }this.fourway(4)
              if(this.direction === 'LEFT') {
              this.fourway(0);
              this.x = this.x -speed + 3;
              }
              }
              }
              
              if (this.direction === 'UP'){
              this.fourway(0);
              this.y -= speed;
              }
              
        if (this.direction === 'DOWN'){
		this.fourway(0);
            this.y += speed;
        }
        if (this.direction === 'LEFT'){
		this.fourway(0);
             this.x -= speed;
        }
        if (this.direction === 'RIGHT'){
		this.fourway(0);
            this.x += speed;
        }
    });


  },
 
//Set the initial position 
setInitPos: function() {
	this.initx = this.x;
	this.inity = this.y;
},

stopOnSolids: function(){
    this.onHit('Solid', this.stopMovement);
    return this;
    },
stopMovement: function(){
    this._speed = 0;
    if(this._movement){
    this.x -= this._movement.x;
    this.y -= this._movement.y;
    } 
	this.fourway(4);
},
visitDots: function(data) {
         if ((isPlaying === false) && (this._movement)) {
         isPlaying = true;
         Crafty.audio.play('eat');
         }
    dots = data[0].obj;
    dots.collect();

    //Increment number of dots eaten by pacman
    this.totalDotsEaten++;
    
    //If all dots are eaten by Pacman, then Game won. Restart new game in 5sec
    if (this.totalDotsEaten == totalDots)
        this.resetGame("You Won!: Starting next stage . . .");
  },
visitLargeDots: function(data){
    largeDots = data[0].obj;
    largeDots.collect();

    //Increment number of dots eaten by pacman
    this.totalDotsEaten++;

    //If all dots are eaten by Pacman, then Game won. Restart new game in 5sec
    if (this.totalDotsEaten == totalDots)
        this.resetGame("You Won!: Starting next stage . . .");


    //Make the ghosts vulnerable and animate them as blue ghosts for 10secs
    Crafty.trigger("PelletEaten");
    
},

    

visitWall: function(data) {
    Crafty.audio.stop('eat');
    isPlaying = false;
    this.pauseAnimation();
    this.direction = "NONE";
    this.at(Math.round(this.at().y),Math.round(this.at().x));
},

//Update the life count of pacman
updateLife: function() {
    Crafty.audio.stop('eat');
    isPlaying = false;
    pacman_alive = true;
    this.life--;
    total_life = this.life;
    Crafty("life_bar").each(function(){this.update();});
    
},

//Reset position of pacman. This will be done when pacman dies
//and still has lives. So, the new pacman will come in this 
//position
resetPos: function() {
	this.attr({
	    x: this.initx,
	    y: this.inity,
	});
},
        
//Reset positions of all ghosts and pacman to original stored
//co-oordinates. This will be done when pacman dies and still
//has lives. SO, the new pacman will come in that co-ordinate
resetGhosts: function() {

    Crafty.pause();
	setTimeout(function(){
	Crafty.pause()},2000);
         
    	Crafty("Speedy").each(
        function() {
                this.resetPos();
                }
        );
            
        Crafty("Bashful").each(
        function() {
                this.resetPos();
                }
        );

        Crafty("Pokey").each(
        function() {
                this.resetPos();
                }
        );

        Crafty("Shadow").each(
        function() {
                this.resetPos();
                }
        );

	Crafty("Pacman").each(
        function() {
                this.resetPos();
                }
        );
},

//Increment the count of ghosts eaten by pacman
//If it has eaten all 4 ghosts, then game won...restart new game in 5secs
destroyGhost: function() {
	this.ghostEaten++;
	if (this.ghostEaten == 4)
	    this.resetGame("You Won!: Starting next stage . . .");
},


//restart game. thos will be called for both Game Won and Lost
//The "msg" will be updated in the Status bar as appropriate
//And a new game will be started after 5 sec delay
resetGame: function(msg) {
    Crafty.audio.stop('eat');
    isPlaying = false;
	scorestart = 0;
	total_life = 3;
	total_score = 0;
    pacman_alive = true;
 	//totalDots = 0;
	gameStatus=msg;
	Crafty("status_bar").each(function(){this.update();});
    
    //freeze everything until 5 secs
    Crafty.pause();
    
	//5 sec delay and start new game
	setTimeout(function(){

        //unfreeze and restart
               Crafty.pause();
               Crafty.scene('Game');
               Crafty.pause();
               Crafty.audio.play('intro');
               setTimeout(function(){
                          Crafty.pause();},5000);
               },5000);
         
    
},

});


//Bar at the top showing remaining lives of pacman
Crafty.c("life_bar", {
    init:function(){
        this.requires("DOM, 2D, Text");
        this.attr({x:210, y:-3, z:10, w:100});
        this.textColor("#ffffff");
        this.textFont({ size: '20px', weight: 'bold'});
        this.text("Score: " + total_life.toString());
        
    },

    update:function(){
        this.text("Lives: " + total_life.toString());

    } });


//Bar at the bottom showing Game Status
Crafty.c("status_bar", {
    init:function(){
        this.requires("DOM, 2D, Text");
        this.attr({x:20, y:465, z:500, w:500});
        this.textColor("#ffffff");
        this.textFont({ size: '20px', weight: 'bold'});
        this.text("Status: " + gameStatus);
    },

    update:function(){
        this.text("Status: " + gameStatus);

    } });
