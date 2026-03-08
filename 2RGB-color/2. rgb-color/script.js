hexBtn = document.querySelector(".hex-btn");
colorValue = document.querySelector(".hex-color-value");
hexContainer = document.querySelector(".hex-color");

hexBtn.addEventListener("click", () => {
  let charSet = "0123456789abcdef";
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += charSet[Math.floor(Math.random() * charSet.length)];
  }
  console.log(hexColor);
  colorValue.textContent = hexColor;
  hexContainer.style.backgroundColor = hexColor;
  hexBtn.style.color = hexColor;
});

const rgbBtn = document.querySelector(".rgb-btn");
rgbBtn.addEventListener("click", () => {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;

  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(rgbColor);
  document.querySelector(".rgb-color").style.backgroundColor = rgbColor;
  console.log(rgbColor);
  rgbBtn.style.color = rgbColor;
});
