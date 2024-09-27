let currentPlayer = 'X'; // Start with Player 1 (X)
let player1, player2; // Player names
let board = ['', '', '', '', '', '', '', '', '']; // Board state
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

// Start the game on submit
document.getElementById('submit').addEventListener('click', () => {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.querySelector('.setup').style.display = 'none';
        document.querySelector('.game').style.display = 'block';
        updateMessage();
    }
});

// Handle cell clicks
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = cell.id - 1; // Convert id to index
        if (board[cellIndex] === '' && !checkWinner()) {
            board[cellIndex] = currentPlayer; // Update board
            cell.textContent = currentPlayer === 'X' ? 'X' : 'O'; // Display current player
            if (checkWinner()) {
                document.querySelector('.message').textContent = `${currentPlayer === 'X' ? player1 : player2} congratulations you won!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
                updateMessage();
            }
        }
    });
});

// Update the message on whose turn it is
function updateMessage() {
    document.querySelector('.message').textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
