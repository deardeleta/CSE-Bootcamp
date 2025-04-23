const messageEl = document.getElementById("message");


function play() {
  const lucasMass = parseFloat(document.getElementById("lucas_weight").value);
  const lucasHeight = parseFloat(document.getElementById("lucas_height").value);
  const peterMass = parseFloat(document.getElementById("peter_weight").value);
  const peterHeight = parseFloat(document.getElementById("peter_height").value);
  const lucasBMI = lucasMass / (lucasHeight * lucasHeight);
  const peterBMI = peterMass / (peterHeight * peterHeight)
  const lucasHigherBMI = lucasBMI > peterBMI;

messageEl.textContent = "The BMI of Peter is " + peterBMI.toFixed(1) + ", The BMI of Lucas is " + lucasBMI.toFixed(1) + ", Peter's BMI is higher than Lucas' BMI: " + !lucasHigherBMI + "."
}

const result = document.getElementById("result");

function convertCelsius() {
  const celsius = parseFloat(document.getElementById("celsiusInput").value);
  const fahrenheit = (celsius * 9/5) + 32;
  result.textContent = `${celsius}°C is ${fahrenheit.toFixed(1)}°F`;
}

function convertFahrenheit() {
  const fahrenheit = parseFloat(document.getElementById("fahrenheitInput").value);
  const celsius = (fahrenheit - 32) * 5/9;
  result.textContent = `${fahrenheit}°F is ${celsius.toFixed(1)}°C`;
}

function runBMICheck() {
  const weightL = parseFloat(document.getElementById("inputLucasWeight").value);
  const heightL = parseFloat(document.getElementById("inputLucasHeight").value);
  const weightP = parseFloat(document.getElementById("inputPeterWeight").value);
  const heightP = parseFloat(document.getElementById("inputPeterHeight").value);

  const bmiL = weightL / (heightL * heightL);
  const bmiP = weightP / (heightP * heightP);

  if (bmiL > bmiP) {
    console.log(`Lucas' BMI (${bmiL.toFixed(1)}) is higher than Peter’s (${bmiP.toFixed(1)})!`);
  } else if (bmiP > bmiL) {
    console.log(`Peter's BMI (${bmiP.toFixed(1)}) is higher than Lucas' (${bmiL.toFixed(1)})!`);
  } else {
    console.log(`Lucas and Peter have the same BMI (${bmiL.toFixed(1)})!`);
  }
}

// Arrow function: Celsius ➡️ Fahrenheit
const convertTempCToF = (degC) => {
  const resultF = (degC * 9/5) + 32;
  console.log(`${degC}°C is ${resultF.toFixed(1)}°F`);
};

// Arrow function: Fahrenheit ➡️ Celsius
const convertTempFToC = (degF) => {
  const resultC = (degF - 32) * 5/9;
  console.log(`${degF}°F is ${resultC.toFixed(1)}°C`);
};

// Handler for Celsius input
const handleCToF = () => {
  const inputCelsius = parseFloat(document.getElementById("tempCInput").value);
  convertTempCToF(inputCelsius);
};

// Handler for Fahrenheit input
const handleFToC = () => {
  const inputFahrenheit = parseFloat(document.getElementById("tempFInput").value);
  convertTempFToC(inputFahrenheit);
};
