// Conversion factors relative to 1 meter
const TO_METERS = {
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  cm: 0.01,
  m: 1,
  km: 1000
};

// Friendly names for the output message
const UNIT_NAMES = {
  in: "inches",
  ft: "feet",
  yd: "yards",
  mi: "miles",
  cm: "centimeters",
  m: "meters",
  km: "kilometers"
};

// Convert any unit to any other unit
function convert(value, fromUnit, toUnit) {
  const meters = value * TO_METERS[fromUnit];
  return meters / TO_METERS[toUnit];
}

// Format the number nicely
function formatResult(num) {
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toFixed(4)).toString();
}

// Main function that runs when the Convert button is clicked
function handleConvert(event) {
  // Stop the form from refreshing the page
  event.preventDefault();

  // Get the input value and turn it into a number
  const inputElement = document.getElementById("input-value");
  let inputValue = parseFloat(inputElement.value);

  // Get the result area
  const resultElement = document.getElementById("result");

  // Validation
  if (isNaN(inputValue) || inputValue < 0) {
    resultElement.textContent = "Please enter a valid non-negative number.";
    resultElement.className = "alert alert-danger";
    return;
  }

  // Get the selected conversion using selectedIndex + getElementsByTagName
  // (this is the method the assignment asks for)
  const selectElement = document.getElementById("conversion-type");
  const selectedIndex = selectElement.selectedIndex;
  const options = selectElement.getElementsByTagName("option");
  const selectedOption = options[selectedIndex];
  const conversionKey = selectedOption.value; // e.g. "in-to-cm"

  // Split "in-to-cm" into ["in", "cm"]
  const [fromUnit, toUnit] = conversionKey.split("-to-");

  // Do the conversion
  const result = convert(inputValue, fromUnit, toUnit);
  const formatted = formatResult(result);

  // Build the final message
  const fromName = UNIT_NAMES[fromUnit];
  const toName = UNIT_NAMES[toUnit];
  const message = `${inputValue} ${fromName} is ${formatted} ${toName}`;

  // Show the result on the page
  resultElement.innerHTML = message;
  resultElement.className = "alert alert-success";
}

// Wait until the page is fully loaded, then attach the event listener
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("converter-form");
  form.addEventListener("submit", handleConvert);
});