const bill = document.getElementById("bill-amount");
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
  const discount = bill * (discountPercentage / 100);
  const totalAmountToPay = (bill.value * (1 - discount / 100)).toFixed(2);
  const eachCustomersToPay = (bill.value / noOfCustomers.value).toFixed(2); //bugfix
  const tipAmount = bill * (tipPercentage / 100);

  totalDiscountPercentage.textContent = discount;
  totalTipPercentage.textContent = tipAmount * bill.value;
  totalNoOfCustomers.textContent = noOfCustomers.value;
  totalAmount.textContent = totalAmountToPay;
  customerToPay.textContent = eachCustomerToPay;
}
generateBillButton.addEventListener("click", generateBill);
