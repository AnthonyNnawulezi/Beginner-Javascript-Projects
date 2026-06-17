const rippleButton = document.querySelector(".ripple-effect");

rippleButton.addEventListener("click", createRippleEffect);

function createRippleEffect(e) {
  const button = e.target.closest(".ripple-effect");
  if (!button) return;

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rippleEffect = document.createElement("span");
  rippleEffect.style.left = `${x}px`;
  rippleEffect.style.top = `${y}px`;

  button.appendChild(rippleEffect);
}
