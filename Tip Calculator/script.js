const billAmount = document.getElementById("bill-amount");
const discountPercentage = document.getElementById("discount-percentage");
const tipPercentage = document.getElementById("tip-percentage");
const noOfCustormer = document.getElementById("no-of-customers");
const totalDiscountPercentage = document.getElementById(
  "total-discount-percentage",
);
const totalTipPercentage = document.getElementById("total-tip-percentage");
const totalNoOfCustormer = document.getElementById("total-no-of-custormer");
const totalTip = document.getElementById("total-tip");
const totalAmount = document.getElementById("total-amount");
const custormerToPay = document.getElementById("each-custormer-to-pay");
const generateBillButton = document.getElementById("generate-bill");

function generateBill() {
  const discount = discountPercentage.value;
  const totalAmountToPay = (billAmount.value * (1 - discount / 100)).toFixed(2);
  const eachCustormerToPay = (billAmount.value / noOfCustormer.value).toFixed(
    2,
  ); //bugfix
  const tipAmount = (tipPercentage.value / 100).toFixed(2); // bugfix

  totalDiscountPercentage.textContent = discount;
  totalTipPercentage.textContent = tipAmount * billAmount.value;
  totalNoOfCustormer.textContent = noOfCustormer.value;
  totalAmount.textContent = totalAmountToPay;
  custormerToPay.textContent = eachCustormerToPay;
}
generateBillButton.addEventListener("click", generateBill);
