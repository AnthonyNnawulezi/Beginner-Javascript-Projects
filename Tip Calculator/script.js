const billAmount = document.getElementById("bill-amount");
const discountPercentage = document.getElementById("discount-percentage");
const tipPercentage = document.getElementById("tip-percentage");
const noOfCustomers = document.getElementById("no-of-customers");
const totalDiscountPercentage = document.getElementById(
  "total-discount-percentage",
);
const totalTipPercentage = document.getElementById("total-tip-percentage");
const totalNoOfCustomers = document.getElementById("total-no-of-customers");
const totalTip = document.getElementById("total-tip");
const totalAmount = document.getElementById("total-amount");
const customersToPay = document.getElementById("each-customers-to-pay");
const generateBillButton = document.getElementById("generate-bill");

function generateBill() {
  const discount = billAmount * (discountPercentage / 100);
  const totalAmountToPay = (billAmount.value * (1 - discount / 100)).toFixed(2);
  const eachCustomersToPay = (billAmount.value / noOfCustomers.value).toFixed(
    2,
  ); //bugfix
  const tipAmount = (tipPercentage.value / 100).toFixed(2); // bugfix

  totalDiscountPercentage.textContent = discount;
  totalTipPercentage.textContent = tipAmount * billAmount.value;
  totalNoOfCustomers.textContent = noOfCustomers.value;
  totalAmount.textContent = totalAmountToPay;
  customerToPay.textContent = eachCustomerToPay;
}
generateBillButton.addEventListener("click", generateBill);
