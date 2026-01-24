// Pong Game Implementation

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const BALL_RADIUS = 10;

const PLAYER_X = 20;
const AI_X = canvas.width - PLAYER_X - PADDLE_WIDTH;

let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
let aiY = (canvas.height - PADDLE_HEIGHT) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);

function drawRect(x, y, w, h, color='#fff') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color='#fff') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = '#fff3';
    ctx.lineWidth = 4;
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, y);
        ctx.lineTo(canvas.width / 2, y + 18);
        ctx.stroke();
    }
}

function draw() {
    // Clear
    drawRect(0, 0, canvas.width, canvas.height, '#111');

    // Net
    drawNet();

    // Paddles
    drawRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT, '#0ff');
    drawRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT, '#f40');

    // Ball
    drawCircle(ballX, ballY, BALL_RADIUS, '#fff');
}


function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    // Randomize serve direction
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision
    if (ballY - BALL_RADIUS < 0) {
        ballY = BALL_RADIUS;
        ballSpeedY = -ballSpeedY;
    } else if (ballY + BALL_RADIUS > canvas.height) {
        ballY = canvas.height - BALL_RADIUS;
        ballSpeedY = -ballSpeedY;
    }

    // Left paddle collision
    if (
        ballX - BALL_RADIUS < PLAYER_X + PADDLE_WIDTH &&
        ballY > playerY &&
        ballY < playerY + PADDLE_HEIGHT
    ) {
        ballX = PLAYER_X + PADDLE_WIDTH + BALL_RADIUS;
        ballSpeedX = -ballSpeedX;
        // Add some "english" depending on where the ball hit the paddle
        let collidePoint = ballY - (playerY + PADDLE_HEIGHT / 2);
        ballSpeedY = collidePoint * 0.25;
    }

    // Right paddle collision (AI)
    if (
        ballX + BALL_RADIUS > AI_X &&
        ballY > aiY &&
        ballY < aiY + PADDLE_HEIGHT
    ) {
        ballX = AI_X - BALL_RADIUS;
        ballSpeedX = -ballSpeedX;
        let collidePoint = ballY - (aiY + PADDLE_HEIGHT / 2);
        ballSpeedY = collidePoint * 0.25;
    }

    // Score (reset ball)
    if (ballX - BALL_RADIUS < 0 || ballX + BALL_RADIUS > canvas.width) {
        resetBall();
    }

    // Simple AI movement
    let aiCenter = aiY + PADDLE_HEIGHT / 2;
    if (aiCenter < ballY - 15) {
        aiY += 5;
    } else if (aiCenter > ballY + 15) {
        aiY -= 5;
    }
    // Clamp AI paddle
    if (aiY < 0) aiY = 0;
    if (aiY + PADDLE_HEIGHT > canvas.height) aiY = canvas.height - PADDLE_HEIGHT;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Mouse control for player paddle
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    playerY = mouseY - PADDLE_HEIGHT / 2;
    // Clamp paddle within canvas
    if (playerY < 0) playerY = 0;
    if (playerY + PADDLE_HEIGHT > canvas.height) playerY = canvas.height - PADDLE_HEIGHT;
});

gameLoop();