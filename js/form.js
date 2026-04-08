function calculateScore() {
  // Validate inputs and ensure no negative values
  const inputs = document.querySelectorAll('input');
  let isValid = true;

  inputs.forEach(input => {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0) {
      isValid = false;
      input.classList.add('error'); // Add error class for invalid input
    } else {
      input.classList.remove('error'); // Remove error class for valid input
    }
  });

  if (!isValid) {
    document.getElementById('result').innerText = 'Please enter valid non-negative values for all fields.';
    return;
  }

  // Capture the input values from the form
  const pointsRight = parseFloat(document.getElementById('pointsRight').value) || 0;
  const pointsLeft = parseFloat(document.getElementById('pointsLeft').value) || 0;
  const tipToTip = parseFloat(document.getElementById('tipToTipWhole').value) || 0;
  const greatestSpread = parseFloat(document.getElementById('greatestSpreadWhole').value) || 0;
  const insideSpread = parseFloat(document.getElementById('insideSpreadWhole').value) || 0;

  const abnormalRight1 = parseFloat(document.getElementById('abnormalRight1').value) || 0;
  const abnormalLeft1 = parseFloat(document.getElementById('abnormalLeft1').value) || 0;
  const abnormalRight2 = parseFloat(document.getElementById('abnormalRight2').value) || 0;
  const abnormalLeft2 = parseFloat(document.getElementById('abnormalLeft2').value) || 0;

  const mainBeamRight = parseFloat(document.getElementById('mainBeamRight').value) || 0;
  const mainBeamLeft = parseFloat(document.getElementById('mainBeamLeft').value) || 0;

  const circumferenceRight1 = parseFloat(document.getElementById('circumferenceRight1Whole').value) || 0;
  const circumferenceLeft1 = parseFloat(document.getElementById('circumferenceLeft1Whole').value) || 0;
  const circumferenceRight2 = parseFloat(document.getElementById('circumferenceRight2Whole').value) || 0;
  const circumferenceLeft2 = parseFloat(document.getElementById('circumferenceLeft2Whole').value) || 0;
  const circumferenceRight3 = parseFloat(document.getElementById('circumferenceRight3Whole').value) || 0;
  const circumferenceLeft3 = parseFloat(document.getElementById('circumferenceLeft3Whole').value) || 0;
  const circumferenceRight4 = parseFloat(document.getElementById('circumferenceRight4Whole').value) || 0;
  const circumferenceLeft4 = parseFloat(document.getElementById('circumferenceLeft4Whole').value) || 0;

  // Calculate individual sections of the score
  const totalPoints = pointsRight + pointsLeft;

  // Spread score uses the inside spread, limited by the longest main beam
  const maxSpread = Math.min(insideSpread, Math.max(mainBeamRight, mainBeamLeft));

  // Total length of the main beams
  const beamLengthScore = mainBeamRight + mainBeamLeft;

  // Circumference measurements (add all the measurements for total circumference score)
  const circumferenceScore = circumferenceRight1 + circumferenceLeft1 + circumferenceRight2 + circumferenceLeft2 + 
                             circumferenceRight3 + circumferenceLeft3 + circumferenceRight4 + circumferenceLeft4;

  // Abnormal Points deductions
  const totalAbnormalPoints = abnormalRight1 + abnormalLeft1 + abnormalRight2 + abnormalLeft2;

  // Gross score before deductions
  const grossScore = totalPoints + maxSpread + beamLengthScore + circumferenceScore;

  // Net score (gross score minus deductions)
  const netScore = grossScore - totalAbnormalPoints;

  // Display the result
  document.getElementById('result').innerText = `Gross Score: ${grossScore.toFixed(2)} | Net Score: ${netScore.toFixed(2)}`;

  // Save the result to localStorage
  localStorage.setItem('deerGrossScore', grossScore.toFixed(2));
  localStorage.setItem('deerNetScore', netScore.toFixed(2));
}

// Save each input value to localStorage when changed
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    localStorage.setItem(input.id, input.value);
  });

  // Load the stored value on page load
  const storedValue = localStorage.getItem(input.id);
  if (storedValue) {
    input.value = storedValue;
  }
});

function toggleNav() {
  const navLinks = document.querySelector('.nav-links');
  console.log('toggled')
  if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
  } else {
      navLinks.style.display = 'flex';
  }
}

// Load the gross and net scores from localStorage if available
window.onload = function() {
  const storedGrossScore = localStorage.getItem('deerGrossScore');
  const storedNetScore = localStorage.getItem('deerNetScore');
  if (storedGrossScore && storedNetScore) {
    document.getElementById('result').innerText = `Gross Score: ${storedGrossScore} | Net Score: ${storedNetScore}`;
  }
};


document.querySelector('.toggle-btn').addEventListener('click', toggleNav);