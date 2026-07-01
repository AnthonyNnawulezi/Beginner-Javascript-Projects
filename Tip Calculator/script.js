const billInput = document.getElementById("bill-amount");
const discountInput = document.getElementById("discount-percentage");
const tipInput = document.getElementById("tip-percentage");
const customerCount = document.getElementById("customer-count");

const discountDisplay = document.getElementById("discount-display");
const tipDisplay = document.getElementById("tip-display");
const customersDisplay = document.getElementById("customers-display");

const totalTipEl = document.getElementById("total-tip");
const totalAmountEl = document.getElementById("total-amount");
const eachCustomerPayEl = document.getElementById("each-customer-pay");

const generateBillButton = document.getElementById("generate-bill");

discountInput.addEventListener("input", () => {
  discountDisplay.textContent = `${discountInput.value}%`;
});

tipInput.addEventListener("input", () => {
  tipDisplay.textContent = `${tipInput.value}%`;
});

customerCount.addEventListener("input", () => {
  customersDisplay.textContent = customerCount.value;
});

function generateBill() {
  const bill = parseFloat(billInput.value);
  const discountRate = parseFloat(discountInput.value) / 100;
  const tipRate = parseFloat(tipInput.value) / 100;
  const numCustomers = parseInt(customerCount.value, 10);

  if (isNaN(bill) || bill <= 0) {
    alert("Please enter a valid bill amount.");
    return;
  }

  const discountedAmount = bill * (1 - discountRate);
  const tipAmount = discountedAmount * tipRate;
  const totalAmount = discountedAmount + tipAmount;
  const eachCustomerAmount = totalAmount / numCustomers;

  totalTipEl.textContent = `${tipAmount.toFixed(2)}`;
  totalAmountEl.textContent = `${totalAmount.toFixed(2)}`;
  eachCustomerPayEl.textContent = `${eachCustomerAmount.toFixed(2)}`;
}

generateBillButton.addEventListener("click", generateBill);
