const ticTacToe = document.querySelector(".tic-tac-toe");
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
          message.textContent = `Game Over. Player ${currentPlayer} wins! Please restart`;
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

// 1. Find the elements we need on the page
const board = document.querySelector(".board");
const messageDisplay = document.querySelector(".message");
const restartButton = document.querySelector(".restart-button");

// 2. Settings that never change (uppercase is the convention for these)
const BOARD_SIZE = 9; // a 3 x 3 board

// Every way to win: each group is three square positions in a line
//  0 | 1 | 2
//  3 | 4 | 5
//  6 | 7 | 8
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

// 3. Things that change while the game is played
const squares = []; // will hold all 9 square buttons
let currentPlayer = "X";
let isGameOver = false;

// 4. Build the board: create 9 buttons and add them to the page
function createBoard() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    const square = document.createElement("button");
    square.type = "button";
    square.classList.add("square");
    square.addEventListener("click", handleSquareClick);

    squares.push(square); // remember it, so other functions can use it
    board.append(square); // put it on the page
  }
}

// 5. Play one move: runs when a square is clicked
function handleSquareClick(event) {
  const square = event.currentTarget; // the square that was clicked

  // Ignore the click if the square is taken or the game is over
  if (square.textContent !== "" || isGameOver) return;

  square.textContent = currentPlayer; // place the X or O

  // Win is checked BEFORE tie, so a win on the 9th move counts as a win
  if (hasCurrentPlayerWon()) {
    messageDisplay.textContent = `${currentPlayer} wins`;
    isGameOver = true;
    return;
  }

  if (isBoardFull()) {
    messageDisplay.textContent = "Tie, try again";
    isGameOver = true;
    return;
  }

  switchPlayer();
  showTurnMessage();
}

// 6. Small helper functions, each doing one job

// Is there a combination where all three squares hold the current player's mark?
function hasCurrentPlayerWon() {
  return WINNING_COMBINATIONS.some(([a, b, c]) => {
    return (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    );
  });
}

// Is every square filled?
function isBoardFull() {
  return squares.every((square) => square.textContent !== "");
}

// X becomes O, and O becomes X
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function showTurnMessage() {
  messageDisplay.textContent = `${currentPlayer}'s turn`;
}

// Put everything back to the starting state
function restartGame() {
  squares.forEach((square) => {
    square.textContent = ""; // empty every square
  });

  currentPlayer = "X"; // X always starts, instead of whoever played last
  isGameOver = false;
  showTurnMessage();
}

// 7. Start the game
restartButton.addEventListener("click", restartGame);
createBoard();
showTurnMessage(); // show "X's turn" from the very first moment
