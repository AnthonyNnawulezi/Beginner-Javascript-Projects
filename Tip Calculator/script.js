const billAmount = document.getElementById("bill-amount");
const discountPercentage = document.getElementById("discount-percentage");
const tipPercentage = document.getElementById("tip-percentage");
const noOfCustormers = document.getElementById("no-of-customers");
const totalDiscountPercentage = document.getElementById(
  "total-discount-percentage",
);
const totalTipPercentage = document.getElementById("total-tip-percentage");
const totalNoOfCustormers = document.getElementById("total-no-of-custormers");
const totalTip = document.getElementById("total-tip");
const totalAmount = document.getElementById("total-amount");
const custormerToPay = document.getElementById("each-custormer-to-pay");
const generateBillButton = document.getElementById("generate-bill");

function generateBill() {
  const discount = discountPercentage.value;
  const totalAmountToPay = (billAmount.value * discount).toFixed(2); // bugfix
  const eachCustormerToPay = (billAmount.value / noOfCustormers.value).toFixed(
    2,
  ); //bugfix
  const tipAmount = (tipPercentage.value / 100).toFixed(2); // bugfix

  totalDiscountPercentage.textContent = discount;
  totalTipPercentage.textContent = tipAmount * billAmount.value;
  totalNoOfCustormers.textContent = noOfCustormers.value;
  totalAmount.textContent = totalAmountToPay;
  custormerToPay.textContent = eachCustormerToPay;
}
generateBillButton.addEventListener("click", generateBill);
