const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameBoard = document.querySelector('.game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let player1, player2;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

submitButton.addEventListener('click', () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();
    
    if (player1 && player2) {
        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        submitButton.style.display = 'none';
        gameBoard.style.display = 'block';
        messageDiv.innerText = `${player1}, you're up!`;
    }
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = cell.id - 1;
        if (board[cellIndex] === '' && gameActive) {
            board[cellIndex] = currentPlayer;
            cell.innerText = currentPlayer;
            checkResult();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageDiv.innerText = gameActive ? `${currentPlayer === 'X' ? player1 : player2}, you're up!` : '';
        }
    });
});

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            messageDiv.innerText = `${board[a] === 'X' ? player1 : player2}, congratulations you won!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        messageDiv.innerText = "It's a draw!";
    }
}
