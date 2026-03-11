const hexBtn = document.getElementById("hex-btn");
const rgbColor = document.querySelector(".rgb-color");
const rgbBtn = document.querySelector(".rgb-btn");
const hexColorContainer = document.querySelector(".hex-color-container");
const rgbColorContainer = document.querySelector(".rgb-color-container");
hexCopyBtn = document.querySelector(".hex-copy-btn");
rgbCopyBtn = document.querySelector(".rgb-copy-btn");

hexBtn.addEventListener("click", () => {
  generateColors = "0123456789abcdef";
  hexColor = "#";

  for (let i = 0; i < 6; i++) {
    charSet = Math.floor(Math.random() * 16);
    hexColor += generateColors[charSet];
  }
  document.querySelector(".hex-color").innerText = hexColor;
  hexBtn.style.color = hexColor;
  hexColorContainer.style.background = hexColor;
});

hexCopyBtn.addEventListener("click", () => {
  copyToClipboard(hexColor);
  alert("Color copied to clipboard");
});

rgbBtn.addEventListener("click", () => {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;
  rgbColorInput = `rgb(${red},${green},${blue})`;

  rgbColor.textContent = rgbColorInput;
  rgbColorContainer.style.background = rgbColorInput;
  rgbBtn.style.color = rgbColorInput;
});

function copyToClipboard(color) {
  navigator.clipboard.writeText(color);
}

rgbCopyBtn.addEventListener("click", () => {
  copyToClipboard(rgbColorInput);
  alert("Color copied to clipboard");
});
