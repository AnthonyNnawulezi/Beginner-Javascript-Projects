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

const boardElement = document.querySelector(".tic-tac-toe");
const restartButton = document.querySelector(".restart-button");
const messageElement = document.querySelector(".message");

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

const board = Array(9).fill("");

let currentPlayer = "X";
let isGameOver = false;

function createBoard() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 9; index++) {
    const square = document.createElement("span");

    square.classList.add("square");
    square.dataset.index = index;

    fragment.appendChild(square);
  }

  boardElement.appendChild(fragment);
}

function updateMessage(text) {
  messageElement.textContent = text;
}

function checkWinner() {
  return WINNING_COMBINATIONS.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function checkTie() {
  return board.every((cell) => cell !== "");
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleSquareClick(event) {
  const square = event.target;

  if (!square.classList.contains("square")) {
    return;
  }

  const index = Number(square.dataset.index);

  if (board[index] || isGameOver) {
    return;
  }

  board[index] = currentPlayer;
  square.textContent = currentPlayer;

  if (checkWinner()) {
    updateMessage(`${currentPlayer} wins!`);
    isGameOver = true;
    return;
  }

  if (checkTie()) {
    updateMessage("It's a tie!");
    isGameOver = true;
    return;
  }

  switchPlayer();
  updateMessage(`${currentPlayer}'s turn`);
}

function resetGame() {
  board.fill("");

  document.querySelectorAll(".square").forEach((square) => {
    square.textContent = "";
  });

  currentPlayer = "X";
  isGameOver = false;

  updateMessage(`${currentPlayer}'s turn`);
}

createBoard();

boardElement.addEventListener("click", handleSquareClick);

restartButton.addEventListener("click", resetGame);

updateMessage(`${currentPlayer}'s turn`);
