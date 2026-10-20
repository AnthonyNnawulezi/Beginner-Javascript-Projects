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

const ticTacToeGrid = document.querySelector(".tic-tac-toe");
const restartButton = document.querySelector(".restart-button");
const messageDisplay = document.querySelector(".message");

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
let isGameOver = false;

function initializeGame() {
  const fragment = document.createDocumentFragment();

  // Create 9 squares for the board
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    fragment.append(square);
  }

  ticTacToeGrid.appendChild(fragment);

  const boardSquares = Array.from(ticTacToeGrid.children);

  // Set initial turn message
  messageDisplay.textContent = `${currentPlayer}'s turn`;

  boardSquares.forEach((square) => {
    square.addEventListener("click", () => {
      // Guard clause: stop if square is already filled or game is over
      if (square.textContent !== "" || isGameOver) return;

      square.textContent = currentPlayer;

      // Check for a winning condition
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          boardSquares[a].textContent === currentPlayer &&
          boardSquares[b].textContent === currentPlayer &&
          boardSquares[c].textContent === currentPlayer
        ) {
          messageDisplay.textContent = `${currentPlayer} wins! 🎉`;
          isGameOver = true;
          return;
        }
      }

      // Check for a tie condition
      const isTie = boardSquares.every((square) => square.textContent !== "");
      if (isTie) {
        messageDisplay.textContent = "It's a tie! Try again.";
        isGameOver = true;
        return;
      }

      // Toggle player using clean ternary operator
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageDisplay.textContent = `${currentPlayer}'s turn`;
    });
  });

  // Restart button event listener
  restartButton.addEventListener("click", () => {
    boardSquares.forEach((square) => {
      square.textContent = "";
    });
    currentPlayer = "X";
    isGameOver = false;
    messageDisplay.textContent = `${currentPlayer}'s turn`;
  });
}

// Start the game on page load
initializeGame();
