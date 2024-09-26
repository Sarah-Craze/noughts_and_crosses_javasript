const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const player1 = 'X';
const player2 = 'O';
let playerTurn = player1;
let board = Array(9).fill(null);  // To track the state of the board

// Attach click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => playGame(e, index), { once: true });
});

// Handle the click event for each cell
function playGame(e, index) {
    e.target.innerHTML = playerTurn;  // Place X or O in the cell
    board[index] = playerTurn;        // Update the board state
    if (checkWin(playerTurn)) {
        updateGameStatus(playerTurn === player1 ? 'winsX' : 'winsO');
        endGame();  // Call endGame when someone wins
    } else if (board.every(cell => cell !== null)) {
        updateGameStatus('draw');  // Check for draw
        endGame();  // Call endGame when it's a draw
    } else {
        updateGameStatus(playerTurn);  // Update status to show the next player
        playerTurn = playerTurn === player1 ? player2 : player1;  // Switch turn
    }
}

// Update the game status text
function updateGameStatus(statusPlayer) {
    let statusText;
    switch (statusPlayer) {
        case 'X':
            statusText = 'Au tour du joueur 2 (O) !';
            break;
        case 'O':
            statusText = 'Au tour du joueur 1 (X) !';
            break;
        case 'winsX':
            statusText = 'Le joueur 1 (X) a gagné !';
            break;
        case 'winsO':
            statusText = 'Le joueur 2 (O) a gagné !';
            break;
        case 'draw':
            statusText = 'Égalité ! Pas de gagnant !';
            break;
    }
    gameStatus.innerHTML = statusText;      // Update status on the game board
    endGameStatus.innerHTML = statusText;   // Show the final status if the game ends
}

// Display the game end overlay
function endGame() { 
    document.getElementById('gameEnd').style.display = 'block'; 
}

// Reload the game
function reloadGame() { 
    window.location.reload(); 
}

// Check for win conditions
function checkWin(currentPlayer) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}
