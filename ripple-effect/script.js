const rippleButtons = document.querySelectorAll(".ripple-effect");

rippleButtons;

const getButtons = document.querySelectorAll(".ripple-effect");

getButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const rect = btn.getBoundingClientRect();
    let xCoordinate = event.clientX - rect.left;
    let yCoordinate = event.clientY - rect.top;
    let rippleElement = document.createElement("span");

    rippleElement.style.left = `${xCoordinate}px`;
    rippleElement.style.top = `${yCoordinate}px`;

    btn.appendChild(rippleElement);

    window.setTimeout(() => {
      rippleElement.remove();
    }, 1000);
  });
});
