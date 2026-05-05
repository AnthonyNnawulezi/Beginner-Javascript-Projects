const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-button");
const players = ["X", "O"];
let currentPlayer = players[0];

message.textContent = `Player ${currentPlayer}'s turn`;

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

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    if (squares[i].textContent !== "" || checkWin(currentPlayer)) {
      return;
    }

    squares[i].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      message.textContent = `Game Over. Player ${currentPlayer} wins! Please restart`;
      return;
    } else if (checkDraw()) {
      message.textContent = "It's a draw!";
      return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    message.textContent = `Player ${currentPlayer}'s turn`;
  });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  //   if (Array.from(squares).every((square) => square.textContent !== "")) {
  //     message.textContent = "It's a draw!";
  //   }
  return false;
}
function checkDraw() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function restartGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  currentPlayer = players[0];
  message.textContent = `Player ${currentPlayer}'s turn`;
}

restartButton.addEventListener("click", restartGame);
