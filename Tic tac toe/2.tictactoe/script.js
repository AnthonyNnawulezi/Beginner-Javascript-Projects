const board = document.querySelector(".board");
const restartButton = document.querySelector(".restart-button");
const message = document.querySelector(".message");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let player = "X";
let gameOver = false;

function createBoards() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 9; i++) {
    const square = document.createElement("span");
    square.classList.add("square");
    fragment.append(square);
  }
  ticTacToe.appendChild(fragment);

  const squares = Array.from(ticTacToe.children);
  //   const squares = [...ticTacToe.children];
  //   const squares = ticTacToe.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent !== "" || gameOver) return;
      square.textContent = player;

      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          squares[a].textContent === player &&
          squares[b].textContent === player &&
          squares[c].textContent === player
        ) {
          message.textContent = `Game Over. Player ${player} wins! Please restart`;
          gameOver = true;
          return;
        }
      }

      let filledSquares = 0;

      for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent !== "") {
          filledSquares++;
        }
      }

      if (filledSquares === 9) {
        message.textContent = "Tie, try again";
        gameOver = true;
        return;
      }

      if (player === "X") {
        player = "O";
        message.textContent = `${player} turn`;
      } else {
        player = "X";
        message.textContent = `${player} turn`;
      }
      //   player = player === "X" ? "O" : "X";
    });
  });

  //   ticTacToe.addEventListener("click", () => {
  //     for (let i = 0; i < squares.length; i++) {
  //       winningCombinations.forEach(([a, b, c]) => {
  //         if ([a, b, c] === player) {
  //           message.textContent = `${player} wins`;
  //         }
  //         if (squares.length !== "") {
  //           message.textContent = "Tie, try again";
  //         }
  //       });
  //     }
  //   });

  restartButton.addEventListener("click", () => {
    squares.forEach((square) => {
      square.textContent = "";
    });
    player = "X"; // else it only chooses which player last won
    gameOver = false;
    message.textContent = `${player} turn`;
  });
}

createBoards();

// Select the game board.
const boardElement = document.querySelector(".tic-tac-toe");

// Select the Restart button.
const restartButton = document.querySelector(".restart-button");

// Select the game status message.
const statusMessage = document.querySelector(".message");

// A Tic-Tac-Toe board has three rows and three columns.
const BOARD_SIZE = 3;

// Calculate the total number of squares.
const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

// All eight possible winning combinations.
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Store all nine moves in a JavaScript array.
// An empty string means the square is available.
let boardState = Array(TOTAL_SQUARES).fill("");

// X always starts a new game.
let currentPlayer = "X";

// Track whether the game has finished.
let isGameOver = false;

/**
 * Create an accessible label for each square.
 *
 * index: Position of the square in the board.
 * symbol: The symbol occupying the square, if any.
 */
function getSquareLabel(index, symbol = "") {
  const row = Math.floor(index / BOARD_SIZE) + 1;

  const column = (index % BOARD_SIZE) + 1;

  return `Row ${row}, column ${column}: ${symbol || "empty"}`;
}

/**
 * Create the nine square buttons.
 */
function createBoard() {
  // Hold the elements before adding them to the board.
  const fragment = document.createDocumentFragment();

  // Create one button for each board position.
  for (let index = 0; index < TOTAL_SQUARES; index++) {
    const square = document.createElement("button");

    // Prevent accidental form submission.
    square.type = "button";

    // Add the CSS class.
    square.classList.add("square");

    // Store the square's position in a data attribute.
    square.dataset.index = String(index);

    // Give each square an accessible name.
    square.setAttribute("aria-label", getSquareLabel(index));

    // Add the button to the fragment.
    fragment.appendChild(square);
  }

  // Replace any existing squares with the new board.
  boardElement.replaceChildren(fragment);
}

/**
 * Check whether the current player has won.
 *
 * Returns a winning combination if one exists.
 * Otherwise, returns undefined.
 */
function findWinningCombination(player) {
  return WINNING_COMBINATIONS.find(([first, second, third]) => {
    return (
      boardState[first] === player &&
      boardState[second] === player &&
      boardState[third] === player
    );
  });
}

/**
 * Handle a square being clicked.
 */
function handleBoardClick(event) {
  // Find the square that was clicked.
  const selectedSquare = event.target.closest(".square");

  // Ignore clicks outside the squares or after the game ends.
  if (!selectedSquare || !boardElement.contains(selectedSquare) || isGameOver) {
    return;
  }

  // Get the index of the selected square.
  const squareIndex = Number(selectedSquare.dataset.index);

  // Prevent overwriting a square that is already occupied.
  if (boardState[squareIndex] !== "") {
    return;
  }

  // Store the player's move in the game state.
  boardState[squareIndex] = currentPlayer;

  // Display the player's symbol in the selected square.
  selectedSquare.textContent = currentPlayer;

  // Update the accessible description of the square.
  selectedSquare.setAttribute(
    "aria-label",
    getSquareLabel(squareIndex, currentPlayer),
  );

  // Check whether the current player has won.
  const winningCombination = findWinningCombination(currentPlayer);

  if (winningCombination) {
    // Mark the game as finished.
    isGameOver = true;

    // Display the winner.
    statusMessage.textContent = `${currentPlayer} wins!`;

    // Highlight the three winning squares.
    winningCombination.forEach((index) => {
      squares[index].classList.add("winning-square");
    });

    // Stop here; don't check for a tie or switch players.
    return;
  }

  // Check whether every square has been occupied.
  const isBoardFull = boardState.every((square) => square !== "");

  if (isBoardFull) {
    // No winner and no empty squares means a tie.
    isGameOver = true;

    statusMessage.textContent = "It's a tie!";

    return;
  }

  // Switch to the other player.
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Display whose turn comes next.
  statusMessage.textContent = `${currentPlayer}'s turn`;
}

/**
 * Reset the game without recreating the board elements.
 */
function restartGame() {
  // Remove all recorded moves.
  boardState.fill("");

  // Reset the current player.
  currentPlayer = "X";

  // Allow players to make moves again.
  isGameOver = false;

  // Clear all square buttons.
  squares.forEach((square, index) => {
    // Remove X or O.
    square.textContent = "";

    // Remove any winning highlight.
    square.classList.remove("winning-square");

    // Reset the square's accessible label.
    square.setAttribute("aria-label", getSquareLabel(index));
  });

  // Reset the status message.
  statusMessage.textContent = `${currentPlayer}'s turn`;
}

// Create the board once.
createBoard();

// Store references to the nine square elements.
const squares = Array.from(boardElement.children);

// Use one event listener to handle clicks on the board.
boardElement.addEventListener("click", handleBoardClick);

// Register the Restart button listener once.
restartButton.addEventListener("click", restartGame);
