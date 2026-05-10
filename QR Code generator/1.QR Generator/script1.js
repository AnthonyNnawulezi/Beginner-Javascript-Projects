const qrContainer = document.querySelector(".qr-container");
const generateQrButton = document.querySelector(".generate-qr");
const qrInput = document.querySelector(".qr-input");
const errorMessage = document.querySelector(".error-message");

const QR_CONFIG = {
  height: 400,
  width: 400,
  colorLight: "#fff",
  colorDark: "#000",
};
