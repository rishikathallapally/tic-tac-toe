
// Get HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

// Game variables
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
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

// Handle cell click
function handleCellClick(event) {

    const clickedCell = event.target;
    const clickedIndex = Number(clickedCell.dataset.index);

    // Check if cell is already filled or game is over
    if (gameBoard[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Add current player's mark
    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.disabled = true;

    // Check for winner
    checkWinner();
}

// Check winner
function checkWinner() {

    let roundWon = false;

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            gameBoard[a] !== "" &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // Check draw
    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Restart game
function restartGame() {

    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o");
    });
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
