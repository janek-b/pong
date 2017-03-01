// Back-End
function Field(width, height, ctx) {
  this.width = width;
  this.height = height;
  this.player = new Paddle(this);
  this.ball = new Ball();
  this.ctx = ctx
};

Field.prototype.draw = function() {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
  this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height)
}

Field.prototype.movePaddleDown = function() {
  if (this.player.y + this.player.height > this.height - 5) {
    this.player.y = this.height - this.player.height;
  } else {
    this.player.y += 5;
  };
  this.draw();
};

Field.prototype.movePaddleUp = function() {
  if (this.player.y < 5) {
    this.player.y = 0;
  } else {
    this.player.y -= 5;
  };
  this.draw();
};

function Paddle(field) {
  this.width = 10;
  this.height = field.height/5;
  this.x = 5;
  this.y = field.height/2 - this.height/2;
};

function Ball() {
  this.width = 10;
  this.height = 10;
  this.x = 50;
  this.y = 50;
  this.speed = 7;
};

Ball.prototype.move = function() {
  this.x = this.x - this.speed;
}



// Front-End
$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;

  var field = new Field(width, height, ctx);
  canvas.addEventListener("mousedown", moveball, false);

  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
      field.movePaddleUp();
    } else if (event.keyCode === 40) {
      field.movePaddleDown();
    };
  }, false);

  function moveball() {
    field.ball.move();
    field.draw(ctx);
  }

  field.draw(ctx);
})
