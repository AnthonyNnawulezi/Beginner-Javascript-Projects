const ticTacToe = document.querySelector(".tic-tac-toe");
const restartButton = document.querySelector(".restart-button");
const message = document.querySelector(".message");

let player;

function createBoards() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 9; i++) {
    const square = document.createElement("square");
    square.classList.add("square");
    fragment.append(square);
  }
  ticTacToe.appendChild(fragment);

  const squares = Array.from(ticTacToe.children);
  //   const squares = [...ticTacToe.children];
  //   const squares = ticTacToe.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent !== "") return;
      square.textContent = player;

      if (player === "X") {
        player = "O";
      } else {
        player = "X";
      }
      //   player = player === "X" ? "O" : "X";
    });
  });
}

createBoards();
