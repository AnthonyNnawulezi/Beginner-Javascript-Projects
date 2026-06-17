const rippleButtons = document.querySelectorAll(".ripple-effect");

document.body.addEventListener("click", (event) => {
  const button = event.target.closest(".ripple-effect");
  if (!button) return;

  // Compute click position relative to the target
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Create ripple element
  const ripple = document.createElement("span");
  //   ripple.classList.add('ripple');     Apply CSS class
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});
