'use strict';

const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

// Перемінні картинок + картинки
let bird = new Image(),
    bg = new Image(),
    fg = new Image(),
    pipeUp = new Image(),
    pipeBottom = new Image();


bird.src = 'img/flappy_bird_bird.png';
bg.src = 'img/flappy_bird_bg.png';
fg.src = 'img/flappy_bird_fg.png';
pipeUp.src = 'img/flappy_bird_pipeUp.png';
pipeBottom.src = 'img/flappy_bird_pipeBottom.png';

// Перемінні аудіо + аудіо
let fly = new Audio(),
    scoreAudio = new Audio();

fly.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';

// Перемінна відступу
let gap = 90;

// Функція для пересування героя
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 35;
    fly.play();
}

// Блоки
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;

// Позиція героя
let xPos = 10,
    yPos = 150,
    grav = 1.5;


function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 105) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Слідкуємо за торканнями
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка сторінки
        }

        if (pipe[i].x == 5) {
            score++;
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;