const hexBtn = document.querySelector(".hex-btn");
const hexColorValue = document.querySelector(".hex-color-value");
const hexContainer = document.querySelector(".hex-color");
const hexCopyBtn = document.querySelector(".hex-copy");
const rgbCopyBtn = document.querySelector(".rgb-copy");
const rgbColorValue = document.querySelector(".rgb-color-value");

hexBtn.addEventListener("click", () => {
  let charSet = "0123456789abcdef";
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += charSet[Math.floor(Math.random() * charSet.length)];
  }
  console.log(hexColor);
  hexColorValue.textContent = hexColor;
  hexContainer.style.backgroundColor = hexColor;
  hexBtn.style.color = hexColor;
});

const rgbBtn = document.querySelector(".rgb-btn");
rgbBtn.addEventListener("click", () => {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;

  rgbColorValue.textContent = `rgb(${red}, ${green}, ${blue})`;
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(rgbColor);
  document.querySelector(".rgb-color").style.backgroundColor = rgbColor;
  console.log(rgbColor);
  rgbBtn.style.color = rgbColor;
});

function copyToClipboard(color) {
  navigator.clipboard.writeText(color);
  alert("Color copied to clipboard!");
  console.log(color);
}

hexCopyBtn.addEventListener("click", () => {
  const hexColor = hexColorValue.textContent;
  copyToClipboard(hexColor);
  console.log(hexColor);
});

rgbCopyBtn.addEventListener("click", () => {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  copyToClipboard(rgbColor);
  console.log(rgbColor);
});
