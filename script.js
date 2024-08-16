const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const message = document.getElementById('message');

let isJumping = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    if (isJumping) return;
    
    isJumping = true;
    let upInterval = setInterval(() => {
        if (parseInt(window.getComputedStyle(dino).bottom) >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (parseInt(window.getComputedStyle(dino).bottom) <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dino.style.bottom = parseInt(window.getComputedStyle(dino).bottom) - 5 + 'px';
                }
            }, 20);
        } else {
            dino.style.bottom = parseInt(window.getComputedStyle(dino).bottom) + 5 + 'px';
        }
    }, 20);
}

function checkCollision() {
    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    const dinoLeft = parseInt(window.getComputedStyle(dino).left);
    const cactusLeft = parseInt(window.getComputedStyle(cactus).right);

    if (cactusLeft < (dinoLeft + 40) && cactusLeft > (dinoLeft - 20) && dinoBottom <= 40) {
        message.textContent = 'Game Over';
        cactus.style.animation = 'none';
        cactus.style.right = cactusLeft + 'px';
        clearInterval(collisionInterval);
    }
}

const collisionInterval = setInterval(checkCollision, 10);
