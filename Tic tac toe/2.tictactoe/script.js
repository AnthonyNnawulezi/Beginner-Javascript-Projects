const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-button");
const board = document.querySelector(".board");

let gameOver = false;
let player = "X";

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

function isWinner(currentPlayer) {
  return winningCombinations.some(
    ([a, b, c]) =>
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer,
  );
}

function setMessage(text) {
  message.textContent = text;
}

function isDraw() {
  return [...squares].every((square) => square.textContent !== "");
}

board.addEventListener("click", (e) => {
  if (gameOver || e.target.textContent !== "") return;

  e.target.textContent = player;

  if (isWinner(player)) {
    setMessage(`Player ${player} won! Please restart`);
    gameOver = true;
    return;
  }

  if (isDraw()) {
    setMessage(`Its a DRAW! Please restart`);
    gameOver = true;
    return;
  }
  player = player === "X" ? "O" : "X";
  setMessage(`Player ${player}'s turn`);
});

function restartGame() {
  squares.forEach((square) => {
    square.textContent = "";
  });
  player = "X";
  gameOver = false;
  setMessage("Player X's turn");
}
// restartGame();

restartButton.addEventListener("click", restartGame);
