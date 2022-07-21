
 
 let canvas = document.getElementById("myCanvas");
 let ctx = canvas.getContext("2d");
 let ballRadius = 10;
 

 //Defining the ball start with x and y
  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 2;
  let dy = -2;
 // The paddle 
  let paddleHeight = 15;
  let paddleWidth = 80;
  let paddleX = (canvas.width-paddleWidth) / 2;
  //The key functions
  let rightPressed = false;
  let leftPressed = false;
  //The brick variables 
  let brickRowCount = 6;
  let brickColumnCount = 8;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 50;
  let brickOffsetLeft = 40;
  //The scoring variable
  let score = 0;
  //Lives variable
  let lives = 3;

  //Ball Image
  let images = {
  ball: new Image(),
  }
  images.ball.src = 'Photos/Untitled-1.png';

 //Drawing the ball
  function drawBall() {
    ctx.beginPath();
    // ctx.arc(x, y, ballRadius, 0, Math.PI*2); //<--- ball starting pointt
    // draw ball
    ctx.drawImage(images.ball, x, y, 2*ballRadius, 2*ballRadius);
    ctx.fillStyle = "#7a1f3d"; //<--- the ball color
    ctx.fill();
    ctx.closePath();
  }

  
 //Drawing the paddle
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#7a1f3d";
    ctx.fill();
    ctx.closePath();
  }

  //building the  bricks
  function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#7a1f3d";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
  }

  // Creating the bricks
  let bricks = [];
  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  // Drawing all functions to the page
  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //<--- this code clears the trail by refreshing to white after each frame
      drawBall(); //<--- drawing the ball on screen 
      drawPaddle(); //<--- drawing the paddle on screen
      drawBricks(); //<---drawing the bricks
      collisionDetection(); //<--- Activting collison detection
      drawScore(); //<--- The scoreboard
      drawLives(); //<--- drawing the lives counter
      
      x += dx; // x & y now move the ball
      y += dy;
    
      //drawing the bounderies of the ball so it bounces around instead of going off screen
      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if(y + dy < ballRadius) {
        dy = -dy;
      } else if(y + dy > canvas.height-ballRadius) {
          if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
      }
      else { //lives counter
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    // Setting the paddle bounderies 
    if(rightPressed) {
      paddleX += 7;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
      }
    }
    else if(leftPressed) {
      paddleX -= 7;
    if (paddleX < 0){
        paddleX = 0;
      }
    }
    requestAnimationFrame(draw);
  }

 //Key command listners 
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
  }

  // Brick collision
  function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
  }

  // The scoreboard
  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+score, 8, 20);
  } 

  // The liives counter
  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Lives: "+lives, canvas.width-80, 20);
  }

  // Mouse movments
  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
  }

  draw();

