const boardElement = document.querySelector(".board");
const restartButton = document.querySelector(".restart-button");
const statusMessage = document.querySelector(".message");
const BOARD_SIZE = 9;
const board = Array(9).fill("");
let squares = [];
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

let currentPlayer = "X";
let isGameOver = false;

// function createBoards() {
//   const fragment = document.createDocumentFragment();

//   for (let i = 0; i < 9; i++) {
//     const square = document.createElement("span");
//     square.classList.add("square");
//     fragment.append(square);
//   }
//   board.appendChild(fragment);

//   const squares = Array.from(board.children);
//   //   const squares = [...board.children];
//   //   const squares = board.querySelectorAll(".square");

//   squares.forEach((square) => {
//     square.addEventListener("click", () => {
//       if (square.textContent !== "" || isGameOver) return;
//       square.textContent = player;

//       for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
//         const [a, b, c] = WINNING_COMBINATIONS[i];
//         if (
//           squares[a].textContent === player &&
//           squares[b].textContent === player &&
//           squares[c].textContent === player
//         ) {
//           statusMessage.textContent = `Game Over. Player ${player} wins! Please restart`;
//           isGameOver = true;
//           return;
//         }
//       }

//       let filledSquares = 0;

//       for (let i = 0; i < squares.length; i++) {
//         if (squares[i].textContent !== "") {
//           filledSquares++;
//         }
//       }

//       if (filledSquares === 9) {
//         statusMessage.textContent = "Tie, try again";
//         isGameOver = true;
//         return;
//       }

//       if (player === "X") {
//         player = "O";
//         statusMessage.textContent = `${player} turn`;
//       } else {
//         player = "X";
//         statusMessage.textContent = `${player} turn`;
//       }
//       //   player = player === "X" ? "O" : "X";
//     });
//   });

//   restartButton.addEventListener("click", () => {
//     squares.forEach((square) => {
//       square.textContent = "";
//     });
//     player = "X"; // else it only chooses which player last won
//     isGameOver = false;
//     statusMessage.textContent = `${player} turn`;
//   });
// }

// createBoards();

// 4. Build the board: create 9 buttons and add them to the page
function createBoard() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    const square = document.createElement("button");
    square.type = "button";
    square.classList.add("square");
    square.addEventListener("click", handleSquareClick);

    squares.push(square); // remember it, so other functions can use it
    boardElement.append(square); // put it on the page
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
    statusMessage.textContent = `${currentPlayer} wins`;
    isGameOver = true;
    return;
  }

  if (isBoardFull()) {
    statusMessage.textContent = "Tie, try again";
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
  statusMessage.textContent = `${currentPlayer}'s turn`;
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
