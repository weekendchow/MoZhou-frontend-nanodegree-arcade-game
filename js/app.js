// //constant
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var PLAYER_START_X = 202;
var PLAYER_START_Y = 415;
var BOX_WIDTH = 101;
var BOX_HEIGHT = 83;
var NUM_ENENIES = 4;




// Enemies our player must avoid
var Enemy = function(initX,initY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // var obj = obj.create(Enemy.prototype);

    //set init location (initX,initY)
    this.x = initX;
    this.y = initY;
    //set a random speed from 100-300
    this.speed = Math.floor((Math.random() * 100) + 200);;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //reset enemy position when it go off canvas
    if (this.x > CANVAS_WIDTH) {
        this.x = -300;
    }else {
      this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reset enemy
Enemy.prototype.reset = function() {
		allEnemies = [];
    placeEnemiesOnCanvas();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    //set player init location and speed
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    // The image/char-boy.png for our player
    this.sprite = 'images/char-boy.png';
};

//update player's location
Player.prototype.update = function(){
    if (this.y <= 0) {
      console.log("You Win!!!");
      this.reset();
  }
};

//Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle the keyboard input
Player.prototype.handleInput = function(key){

    switch(key) {
      case 'left': // x cannot be smaller than 0
          var leftPos = this.x - BOX_WIDTH;
          if (leftPos >= 0) {
              this.x = leftPos;
          };
          break;
      case 'up': // y cannot be smaller than -40
          var upPos = this.y - BOX_HEIGHT;
          if (upPos >= -40) {
              this.y = upPos;
          };
          break;
      case 'right': // x cannot be bigger than 404
          var rightPos = this.x + BOX_WIDTH;
          if (rightPos <= 404) {
              this.x = rightPos;
          };
          break;
      case 'down': // y cannot be bigger than 415
          var downPos = this.y + BOX_HEIGHT;
          if (downPos <= 415) {
              this.y = downPos;
          };
          break;
      default:
          console.log("wrong key input");
  }
  console.log("Player position: ", this.x, this.y);
};

//reset player to the start position
Player.prototype.reset = function() {
		this.x = PLAYER_START_X;
		this.y = PLAYER_START_Y;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies;
var yArray = [60,140,220];
function placeEnemiesOnCanvas(){
    allEnemies = [];
    for (var i=0; i < NUM_ENENIES; i++) {
        var initX = -(Math.floor((Math.random() * 5) + 1) * BOX_WIDTH);
        if(allEnemies.length == 0){
          var initY = yArray[0];
        } else if(allEnemies.length == 1){
          var initY = yArray[1];
        } else if(allEnemies.length == 2){
          var initY = yArray[2];
        } else{
          var initY = yArray[(Math.floor((Math.random() * 3) + 1))-1];
        }

        allEnemies.push(new Enemy(initX,initY));
    }
}
//place enemies on the canvas
placeEnemiesOnCanvas();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
