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

function createBoard() {
  boardElement.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 9; i++) {
    const square = document.createElement("button");
    square.type = "button";
    square.classList.add("square");
    square.setAttribute("aria-label", `Square ${i + 1}`);
    fragment.append(square);
  }

  boardElement.append(fragment);
  squares = Array.from(boardElement.children);

  squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });
}

function handleSquareClick(event) {
  const square = event.currentTarget;

  if (square.textContent !== "" || isGameOver) return;

  square.textContent = currentPlayer;
  square.classList.add("taken");

  const winningLine = findWinningLine(currentPlayer);

  if (winningLine) {
    highlightWinningLine(winningLine);
    statusMessage.textContent = `${currentPlayer} wins`;
    isGameOver = true;
    return;
  }

  const isTie = squares.every((square) => square.textContent !== "");

  if (isTie) {
    statusMessage.textContent = "Tie, try again";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusMessage.textContent = `${currentPlayer} turn`;
}

function findWinningLine(player) {
  return WINNING_COMBINATIONS.find(([a, b, c]) => {
    return (
      squares[a].textContent === player &&
      squares[b].textContent === player &&
      squares[c].textContent === player
    );
  });
}

function highlightWinningLine(line) {
  line.forEach((index) => {
    squares[index].classList.add("winner");
  });
}

function restartGame() {
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("taken", "winner");
  });

  currentPlayer = "X";
  isGameOver = false;
  statusMessage.textContent = `${currentPlayer} turn`;
}

restartButton.addEventListener("click", restartGame);

createBoard();
