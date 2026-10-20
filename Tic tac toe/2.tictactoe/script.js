// const ticTacToe = document.querySelector(".tic-tac-toe");
// const restartButton = document.querySelector(".restart-button");
// const message = document.querySelector(".message");
// const winningCombinations = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// let player = "X";
// let gameOver = false;

// function createBoards() {
//   const fragment = document.createDocumentFragment();

//   for (let i = 0; i < 9; i++) {
//     const square = document.createElement("span");
//     square.classList.add("square");
//     fragment.append(square);
//   }
//   ticTacToe.appendChild(fragment);

//   const squares = Array.from(ticTacToe.children);
//   //   const squares = [...ticTacToe.children];
//   //   const squares = ticTacToe.querySelectorAll(".square");

//   squares.forEach((square) => {
//     square.addEventListener("click", () => {
//       if (square.textContent !== "" || gameOver) return;
//       square.textContent = player;

//       for (let i = 0; i < winningCombinations.length; i++) {
//         const [a, b, c] = winningCombinations[i];
//         if (
//           squares[a].textContent === player &&
//           squares[b].textContent === player &&
//           squares[c].textContent === player
//         ) {
//           message.textContent = `Game Over. Player ${currentPlayer} wins! Please restart`;
//           gameOver = true;
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
//         message.textContent = "Tie, try again";
//         gameOver = true;
//         return;
//       }

//       if (player === "X") {
//         player = "O";
//         message.textContent = `${player} turn`;
//       } else {
//         player = "X";
//         message.textContent = `${player} turn`;
//       }
//       //   player = player === "X" ? "O" : "X";
//     });
//   });

//   //   ticTacToe.addEventListener("click", () => {
//   //     for (let i = 0; i < squares.length; i++) {
//   //       winningCombinations.forEach(([a, b, c]) => {
//   //         if ([a, b, c] === player) {
//   //           message.textContent = `${player} wins`;
//   //         }
//   //         if (squares.length !== "") {
//   //           message.textContent = "Tie, try again";
//   //         }
//   //       });
//   //     }
//   //   });

//   restartButton.addEventListener("click", () => {
//     squares.forEach((square) => {
//       square.textContent = "";
//     });
//     player = "X"; // else it only chooses which player last won
//     gameOver = false;
//     message.textContent = `${player} turn`;
//   });
// }

// createBoards();

const boardElement = document.querySelector(".tic-tac-toe");
const restartButton = document.querySelector(".restart-button");
const messageElement = document.querySelector(".message");

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

let currentPlayer = "X";
let gameOver = false;
let squares = [];

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

  if (square.textContent !== "" || gameOver) return;

  square.textContent = currentPlayer;
  square.classList.add("taken");

  const winningLine = findWinningLine(currentPlayer);

  if (winningLine) {
    highlightWinningLine(winningLine);
    messageElement.textContent = `${currentPlayer} wins`;
    gameOver = true;
    return;
  }

  const isTie = squares.every((square) => square.textContent !== "");

  if (isTie) {
    messageElement.textContent = "Tie, try again";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = `${currentPlayer} turn`;
}

function findWinningLine(player) {
  return winningCombinations.find(([a, b, c]) => {
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
  gameOver = false;
  messageElement.textContent = `${currentPlayer} turn`;
}

restartButton.addEventListener("click", restartGame);

createBoard();
