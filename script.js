let currentPlayer = 'X';
let player1, player2;
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('submit').addEventListener('click', () => {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.querySelector('.setup').style.display = 'none';
        document.querySelector('.game').style.display = 'block';
        updateMessage();
    }
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = cell.id - 1;
        if (board[cellIndex] === '' && !checkWinner()) {
            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                document.querySelector('.message').textContent = `${currentPlayer === 'X' ? player1 : player2} congratulations you won!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage();
            }
        }
    });
});

function updateMessage() {
    document.querySelector('.message').textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
