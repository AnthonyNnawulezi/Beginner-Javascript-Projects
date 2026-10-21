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
  board.appendChild(fragment);

  const squares = Array.from(board.children);
  //   const squares = [...board.children];
  //   const squares = board.querySelectorAll(".square");

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

  //   board.addEventListener("click", () => {
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
