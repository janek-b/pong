// Back-End
function Field(width, height) {
  this.width = width;
  this.height = height;
};

function Paddle(field) {
  this.height = field.height/5;
  this.width = 10;
  this.x = 5;
  this.y = field.height/2 - this.height/2;
};

Paddle.prototype.moveUp = function() {
  this.y -= 5;
}

Paddle.prototype.moveDown = function() {
  this.y += 5;
}

Paddle.prototype.draw = function(ctx) {
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

function Ball() {

};



// Front-End
$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;

  var field = new Field(width, height);
  var player1 = new Paddle(field);

  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
      player1.moveUp();
      drawGame();
    } else if (event.keyCode === 40) {
      player1.moveDown();
      drawGame();
    };
  }, false);


  function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    player1.draw(ctx);
  }

  drawGame();
  // ctx.fillRect(5, ((height/2) - (player1.height/2)), 10, player1.height);
  // console.log(player1.getPos(field));
})
