const mario = document.querySelector('.mario');
const gameBoard = document.querySelector('.game-board');
const scoreText = document.querySelector('.score');
const restartBtn = document.querySelector('#restart');

let score = 0;
let gameOver = false;

// ===================== PULO =====================
const jump = () => {
    if (gameOver) return;
    if (mario.classList.contains('jump')) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 900);
};

document.addEventListener('keydown', jump);

// ===================== CANO =====================
const createPipe = () => {
    if (gameOver) return;

    const pipe = document.createElement('img');
    pipe.src = 'pipe.png';
    pipe.classList.add('pipe');
    gameBoard.appendChild(pipe);

    let scored = false;

    const loop = setInterval(() => {
        if (gameOver) {
            clearInterval(loop);
            return;
        }

        const pipePosition = pipe.offsetLeft;
        const marioBottom = parseInt(
            window.getComputedStyle(mario).bottom
        );

        const marioLeft = mario.offsetLeft;
        const marioWidth = mario.offsetWidth;
        const pipeWidth = pipe.offsetWidth;

        // ===== COLISÃO REAL =====
        if (
            pipePosition < marioLeft + marioWidth - 15 &&
            pipePosition + pipeWidth > marioLeft &&
            marioBottom < 80
        ) {
            gameOver = true;

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.src = 'game-over.png';

            clearInterval(loop);
        }

        // ===== PONTUAÇÃO =====
        if (!scored && pipePosition + pipeWidth < marioLeft) {
            score++;
            scoreText.textContent = `Pontos: ${score}`;
            scored = true;
        }

    }, 10);

    pipe.addEventListener('animationend', () => pipe.remove());

    setTimeout(createPipe, 1800);
};

// ===================== RESTART =====================
restartBtn.addEventListener('click', () => {
    window.location.reload();
});

// ===================== START =====================
createPipe();
