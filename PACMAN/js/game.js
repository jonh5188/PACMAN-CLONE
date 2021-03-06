var data =  [
                 
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
        [9,8,1,1,1,1,1,1,1,1,8,1,1,1,1,1,1,1,1,8,9],
        [9,8,1,0,0,1,0,0,0,1,8,1,0,0,0,1,0,0,1,8,9],
        [9,8,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,8,9],
        [9,8,1,0,0,1,8,1,0,0,0,0,0,1,8,1,0,0,1,8,9],
        [9,8,1,1,1,1,8,1,1,1,8,1,1,1,8,1,1,1,1,8,9],
        [9,8,0,0,0,1,8,0,0,2,8,2,0,0,8,1,0,0,0,8,9],
        [9,2,2,2,8,1,8,2,2,2,2,2,2,2,8,1,8,2,2,2,9],  
        [9,0,0,0,8,1,8,2,0,0,4,0,0,2,8,1,8,0,0,0,9],
        [9,2,2,2,8,1,8,2,2,13,6,7,2,2,8,1,8,2,2,2,9],  
        [9,0,0,0,8,1,8,2,0,0,0,0,0,2,8,1,8,0,0,0,9],
        [9,2,2,2,8,1,8,2,2,2,2,2,2,2,8,1,8,2,2,2,9],
        [9,0,0,0,0,1,8,2,0,0,0,0,0,2,8,1,0,0,0,0,9],
        [9,8,1,1,1,1,1,1,1,1,8,1,1,1,1,1,1,1,1,8,9],
        [9,8,1,0,0,1,0,0,0,1,8,1,0,0,0,1,0,0,1,8,9],
        [9,8,3,1,8,1,1,1,1,1,5,1,1,1,1,1,8,1,3,8,9],
        [9,0,0,1,8,1,8,1,0,0,0,0,0,1,8,1,8,1,0,8,9],
        [9,8,1,1,1,1,8,1,1,1,8,1,1,1,8,1,1,1,1,8,9],
        [9,8,1,0,0,0,0,0,0,1,8,1,0,0,0,0,0,0,1,8,9],
        [9,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,9],
        [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9]]
        ;

Game = {  
  map_grid: {
    width:  '',
    height: '',
    tile: {
      width:  22,
      height: 21
    }
  },
 
  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },
 
  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
 
  // Initialize and start our game
  start: function() {
        
      for (var x= 0; x < data.length; x++){
            //console.log(data.length);
            Game.map_grid.height = data.length;
         // console.log( Game.map_grid.height);
            var each_x = data[x];
          for (var y = 0; y < each_x.length; y++){
           //     console.log(each_x.length);
                Game.map_grid.width = each_x.length; 
             // console.log(Game.map_grid.width)
              }
      }
  
    //Extra 40 height is needed to display the Game Status Bar
    //at the bottom
    Crafty.init(Game.width(), Game.height()+40);
      console.log(Game.width());
      console.log(Game.height()+20);
    Crafty.background('rgb(0, 0, 0)');
    
      // Simply start the "Game" scene to get things going
    //Crafty.scene('Game');
    Crafty.scene('Loading');
 
  }
}
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' } 
