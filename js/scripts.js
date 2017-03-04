// Back-End
function Field(width, height, ctx) {
  this.width = width;
  this.height = height;
  this.player1 = new Player(this, 5);
  this.player2 = new Player(this, this.width-15)
  this.ball = new Ball(this);
  this.ctx = ctx
};

Field.prototype.draw = function() {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height)
  this.ctx.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height)
  this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height)
}

Field.prototype.movePaddleDown = function(player) {
  if (player.y + player.height > this.height - 4) {
    player.y = this.height - player.height;
  } else {
    player.y += 4;
  };
  this.draw();
};

Field.prototype.movePaddleUp = function(player) {
  if (player.y < 4) {
    player.y = 0;
  } else {
    player.y -= 4;
  };
  this.draw();
};

Field.prototype.player1Collision = function() {
  if (this.ball.x === this.player1.x + this.player1.width) {
    if ((this.ball.y + this.ball.height > this.player1.y) && (this.ball.y < this.player1.y + this.player1.height)) {
      return true;
    };
  };
};

Field.prototype.player2Collision = function() {
  if (this.ball.x + this.ball.width === this.player2.x) {
    if ((this.ball.y + this.ball.height > this.player2.y) && (this.ball.y < this.player2.y + this.player2.height)) {
      return true;
    };
  }
}

Field.prototype.player1CollisionAngle = function() {
  var bally = (this.ball.y) - this.player1.y;
  return ((this.player1.height/2) - bally)/30
}

Field.prototype.player2CollisionAngle = function() {
  var bally = (this.ball.y) - this.player2.y;
  return ((this.player2.height/2) - bally)/30
}

Field.prototype.moveBall = function() {
  if (this.player1Collision()) {
    this.ball.speedY = this.player1CollisionAngle();
    this.ball.speedX -= this.ball.speedX * 2;
    this.ball.move();
  } else if (this.player2Collision()) {
    this.ball.speedY = this.player2CollisionAngle();
    this.ball.speedX -= this.ball.speedX * 2;
    this.ball.move();
  } else if (this.ball.y <= 0) {
    this.ball.speedY -= this.ball.speedY * 2;
    this.ball.move();
  } else if (this.ball.y + this.ball.height >= this.height) {
    this.ball.speedY -= this.ball.speedY * 2;
    this.ball.move();
  } else if (this.ball.x < this.player1.x) {
    this.player2.score ++;
    return true;
  } else if ((this.ball.x + this.ball.width) > this.player2.x) {
    console.log(this.ball.x, this.player2.x);
    this.player1.score ++;
    return true;
  } else {
    this.ball.move();
  }
}

Field.prototype.compTurn = function() {
  if (this.ball.speedX < 0) {
    if (this.ball.x % 6 === 0) {
      var ballMid = this.ball.y + this.ball.height/2;
      var paddleMid = this.player2.y + this.player2.height/2;
      if (ballMid + 10 < paddleMid) {
        this.movePaddleUp(this.player2);
      } else if (ballMid - 10 > paddleMid) {
        this.movePaddleDown(this.player2);
      };

    }
  };
};

function Player(field, x) {
  this.width = 10;
  this.height = field.height/5;
  this.x = x;
  this.y = field.height/2 - this.height/2;
  this.score = 0;
};

function Ball(field) {
  this.field = field;
  this.width = 10;
  this.height = 10;
  this.x = this.field.width/2;
  this.y = this.field.height/2;
  this.speedX = 1;
  this.speedY = 0;
};

Ball.prototype.reset = function() {
  this.x = this.field.width/2;
  this.y = this.field.height/2;
  this.speedX = 1;
  this.speedY = 0;
}

Ball.prototype.move = function() {
  this.x -= this.speedX;
  this.y -= this.speedY;
}



// Front-End
$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;

  var field = new Field(width, height, ctx);
  var rect = canvas.getBoundingClientRect();

  document.addEventListener("mousemove", function(event) {
    var y = event.clientY - rect.top;
    if (y < field.player1.y + field.player1.height/2) {
      field.movePaddleUp(field.player1);
    } else if (y > field.player1.y + field.player1.height/2) {
      field.movePaddleDown(field.player1);
    };
  }, false);

  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
      field.movePaddleUp(field.player1);
    } else if (event.keyCode === 40) {
      field.movePaddleDown(field.player1);
    };
  }, false);

  var startGame;

  $("#start").click(function() {
    field.ball.reset();
    startGame = setInterval(moveball, 1);
  });

  function moveball() {
    if (field.moveBall()) {
      console.log("done");
      clearInterval(startGame);
    };
    field.compTurn();
    field.draw(ctx);
    $("#player1Score").text(field.player1.score);
    $("#player2Score").text(field.player2.score);
  }

  field.draw(ctx);
})
