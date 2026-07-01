const billAmountInput = document.getElementById("bill-amount");
const discountRangeInput = document.getElementById("discount-percentage");
const tipRangeInput = document.getElementById("tip-percentage");
const customersInput = document.getElementById("num-customers");

const discountDisplay = document.getElementById("discount-display");
const tipDisplay = document.getElementById("tip-display");
const customersDisplay = document.getElementById("customers-display");

const totalTipEl = document.getElementById("total-tip");
const totalAmountEl = document.getElementById("total-amount");
const eachCustomerPayEl = document.getElementById("each-customer-pay");

const generateBillButton = document.getElementById("generate-bill");

function generateBill() {
  const discount = bill * (discountPercentage / 100);
  if (isNaN(bill) || bill <= 0) {
    alert("Please enter a valid bill amount.");
    return;
  }
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
