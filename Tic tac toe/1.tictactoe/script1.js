const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-button");

let currentPlayer = "X";
let gameOver = false;

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

function checkWin(player) {
  return winningCombinations.some(
    ([a, b, c]) =>
      squares[a].textContent === player &&
      squares[b].textContent === player &&
      squares[c].textContent === player,
  );
}

function checkDraw() {
  //   return [...squares].every((square) => square.textContent !== "");
  return Array.from(squares).every((square) => square.textContent !== "");
}

function setMessage(text) {
  message.textContent = text;
}

// — Core click handler —
squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (gameOver || square.textContent !== "") return;

    square.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      setMessage(
        `Game over — Player ${currentPlayer} wins! Restart to play again.`,
      );
      gameOver = true; //to prevent further clicks
      return;
    }

    if (checkDraw()) {
      setMessage("It's a draw!");
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setMessage(`Player ${currentPlayer}'s turn`);
  });
});

function restartGame() {
  squares.forEach((square) => {
    square.textContent = "";
  });
  currentPlayer = "X";
  gameOver = false;
  setMessage(`Player ${currentPlayer}'s turn`);
}

restartButton.addEventListener("click", restartGame);
restartGame();
