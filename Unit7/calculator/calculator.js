window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amountInit = document.getElementById("loan-amount");
  amountInit.value = 1000000;
  console.log(amountInit.value)
  let yearsInit = document.getElementById("loan-years");
  yearsInit.value = 15;
  let rateInit = document.getElementById("loan-rate");
  rateInit.value = 3.2;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let currentValue = getCurrentUIValues();
  let monthly = calculateMonthlyPayment(currentValue);
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const i = (values.rate / 100) / 12;
  const n = (values.years * 12);
  result = (values.amount * i)/ (1 - Math.pow((1 + i), -n));
  return result.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerHTML = monthly;
}
