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

//dseek
// function updateSliderDisplays() {
//   discountDisplay.textContent = discountInput.value;
//   tipDisplay.textContent = tipInput.value;
//   customersDisplay.textContent = customerCount.value;
// }

// discountInput.addEventListener("input", updateSliderDisplays);
// tipInput.addEventListener("input", updateSliderDisplays);
// customerCount.addEventListener("input", updateSliderDisplays);

// function generateBill() {
//   const bill = parseFloat(billInput.value) || 0;
//   const discountRate = parseFloat(discountInput.value) || 0;
//   const tipRate = parseFloat(tipInput.value) || 0;
//   const customers = parseInt(customerCount.value, 10) || 1;

//   const discountedAmount = bill * (discountRate / 100);
//   const subtotal = bill - discountedAmount;
//   const tipAmount = subtotal * (tipRate / 100);
//   const total = subtotal + tipAmount;

//   // Split per customer
//   const perCustomer = total / customers;

//   // 3d. Display results with 2 decimal places
//   totalTipEl.textContent = `${tipAmount.toFixed(2)}`;
//   totalAmountEl.textContent = `${total.toFixed(2)}`;
//   eachCustomerPayEl.textContent = `${perCustomer.toFixed(2)}`;
// }

// generateBillButton.addEventListener("click", generateBill);

// // --- 5. Initialise the UI on page load ---
// updateSliderDisplays();
// generateBill();
