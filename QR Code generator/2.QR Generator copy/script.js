const qrInput = document.getElementById("qr-input");
const qrContainer = document.querySelector(".qr-container");
const errorMessage = document.querySelector(".error-message");
const generateQrButton = document.getElementById("generate-qr-Button");

// if (!qrInput || !qrContainer || !errorMessage || !generateQrButton) {
//   throw new Error("Missing DOM Elements");
// }

const QR_CONFIG = {
  text: "",
  width: 128,
  height: 128,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
};

function validateInput() {
  return qrInput.value.trim().length > 0;
}

function generateQrCode() {
  generateQrButton.addEventListener("click", () => {
    if (!validateInput()) {
      qrContainer.innerHTML = "";
      errorMessage.textContent = "Type in text or URL to generate a QR code";
      return;
    }

    qrContainer.innerHTML = "";
    errorMessage.textContent = "";

    new QRCode(qrContainer, {
      ...QR_CONFIG,
      text: qrInput.value.trim(),
    });
  });
}

generateQrCode();
