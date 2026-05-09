const qrContainer = document.querySelector(".qr-container");
const qrButton = document.querySelector(".generate-qr");
const qrInput = document.querySelector(".qr-input");
const errorMessage = document.querySelector(".error-message");

qrButton.addEventListener("click", () => {
  validateInput();
});

function validateInput() {
  //   console.log(qrInput.value);

  if (qrInput.value.trim().length > 0) {
    generateCode();
  } else {
    errorMessage.textContent = "Type in text or URL to generate code";
  }
}

function generateCode() {
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: qrInput.value,
    height: 400,
    width: 400,
    colorLight: "#fff",
    colorDark: "#000",
  });
  qrInput.value = "";
  errorMessage.textContent = "";
}
