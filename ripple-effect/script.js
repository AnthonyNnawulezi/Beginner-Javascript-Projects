const rippleButton = document.querySelector(".ripple-effect");

rippleButton.addEventListener("click", createRippleEffect);

function createRippleEffect(e) {
  const button = e.target.closest(".ripple-effect");
  if (!button) return;

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const Y = e.clientY - rect.top;

  document.createElement("span");
}
