const gameContainer = document.getElementById('game');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const size = 10;
const mineCount = 20;
let grid = [];
let isGameOver = false;

function createBoard() {
    grid = [];
    gameContainer.innerHTML = '';
    message.textContent = '';
    isGameOver = false;

    const mines = Array(mineCount).fill('mine').concat(Array(size * size - mineCount).fill('empty'));
    const shuffledMines = mines.sort(() => Math.random() - 0.5);

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-mine', shuffledMines[i * size + j]);
            cell.addEventListener('click', () => handleClick(cell, i, j));
            gameContainer.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}

function handleClick(cell, x, y) {
    if (isGameOver || cell.classList.contains('revealed')) return;

    if (cell.getAttribute('data-mine') === 'mine') {
        gameOver(cell);
    } else {
        revealCell(cell, x, y);
        checkWin();
    }
}

function revealCell(cell, x, y) {
    if (cell.classList.contains('revealed')) return;

    cell.classList.add('revealed');

    const mineCount = countMinesAround(x, y);
    if (mineCount > 0) {
        cell.textContent = mineCount;
    } else {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < size && ny < size) {
                    revealCell(grid[nx][ny], nx, ny);
                }
            }
        }
    }
}

function countMinesAround(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < size && ny < size) {
                if (grid[nx][ny].getAttribute('data-mine') === 'mine') {
                    count++;
                }
            }
        }
    }
    return count;
}

function gameOver(cell) {
    isGameOver = true;
    cell.classList.add('mine');
    message.textContent = 'Game Over!';

    grid.forEach(row => {
        row.forEach(cell => {
            if (cell.getAttribute('data-mine') === 'mine') {
                cell.classList.add('mine');
            }
        });
    });
}

function checkWin() {
    let revealedCount = 0;
    grid.forEach(row => {
        row.forEach(cell => {
            if (cell.classList.contains('revealed')) {
                revealedCount++;
            }
        });
    });

    if (revealedCount === size * size - mineCount) {
        message.textContent = 'You Win!';
        isGameOver = true;
    }
}

restartButton.addEventListener('click', createBoard);

createBoard();
