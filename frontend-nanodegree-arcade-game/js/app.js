
//hero class
//constructor
//properties
//methods
// write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Special thanks to Matthew Cranford for his awesome walkthrough
class Hero {
  constructor(){
     this.sprite = 'images/char-boy.png';
     this.step = 101;
     this.jump =83;
     this.startX = this.step * 2;
     this.startY =(this.jump * 4) + 55;
     this.x = this.startX;
     this.y = this.startY;
     this.success = false;

  }
  render(){
     ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
   }
   update(){
      for(let enemy of allEnemies){
        if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)){
          this.y = this.startY;
          this.x = this.startX;

        }

     }
if(this.y === 55){
  this.success = true;
}
   };


  /**update hero's x and y property according to input
  *
  *@param {string} input - direction to travel
  */

handleInput(input){
  switch(input){
    case'left':
    if (this.x > 0){
    this.x -= this.step;
  }
    break;
    case'up':
  if (this.y > 0){
    this.y -= this.jump;
  }
    break;
  case'right':
      if(this.x <this.step * 4){
    this.x += this.step;
  }
    break;
    case'down':
    if (this.y < this.jump * 4){
    this.y += this.jump;
  }
    break;
  }
}
}



 // Enemies our player must avoid
var LadyB = function(x,y, speed){

  this.x = x;
  this.y = y + 55; //center
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPos = -this.step;

};

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
LadyB.prototype.update = function(dt) {

  if(this.x < this.boundary){
    this.x += this.speed * dt;
  }
  else{
    this.x = this.resetPos;
  }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
LadyB.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const allEnemies =[];
const bug1 = new LadyB(-101, 0, 330);
const bug2 = new LadyB(-101, 83, 300);
const bug3 = new LadyB((-101* 2.5),83,300);
const bug4 = new LadyB(-101,0, 290);

allEnemies.push(bug1, bug2, bug3, bug4);

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
// Modal globals
const modal = document.querySelector('.modal_bg');
//const modalButton = document.querySelector('.modal_button');

// modal toggle function
function toggleModal() {
    modal.classList.toggle('hide');
}
toggleModal(); // will open modal
toggleModal(); // will close modal

// "No, Thank you!"/cancel button function
document.querySelector('.cancel').addEventListener('click', function (){
  toggleModal();
});

// "Play Again"/Replay button function
document.querySelector('.replay').addEventListener('click',function () {
console.log('replay');

  player.success = false;
  location.reload();
  win.requestAnimationFrame(main);
  hero.reset();
  toggleModal();
  requestAnimationFrame(main);
});
