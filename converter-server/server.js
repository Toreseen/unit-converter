const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(cors());
app.use(bodyParser.json());

// Unit conversion function
function convertUnits(value, fromUnit, toUnit) {
  const conversionRates = {
    pounds: 0.453592, // pounds to kilograms
    kilograms: 2.20462, // kilograms to pounds
    miles: 1.60934, // miles to kilometers
    kilometers: 0.621371, // kilometers to miles
  };

  if (conversionRates[fromUnit] && conversionRates[toUnit]) {
    if (fromUnit === toUnit) {
      return value; // No conversion needed if units are the same
    }

    if (fromUnit === 'pounds' && toUnit === 'kilograms') {
      return value * conversionRates.pounds;
    } else if (fromUnit === 'kilograms' && toUnit === 'pounds') {
      return value * conversionRates.kilograms;
    } else if (fromUnit === 'miles' && toUnit === 'kilometers') {
      return value * conversionRates.miles;
    } else if (fromUnit === 'kilometers' && toUnit === 'miles') {
      return value * conversionRates.kilometers;
    }
  }

  return null; // Return null if the conversion is not supported
}

// POST endpoint for converting units
app.post('/api/convert', (req, res) => {
  const { value, from_unit, to_unit } = req.body;

  if (!value || !from_unit || !to_unit) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const convertedValue = convertUnits(value, from_unit, to_unit);

  if (convertedValue !== null) {
    return res.json({
      original_value: value,
      original_unit: from_unit,
      converted_value: convertedValue,
      converted_unit: to_unit,
    });
  } else {
    return res.status(400).json({ error: 'Conversion not supported' });
  }
});

// POST endpoint for adding units
app.post('/api/add', (req, res) => {
  const { value1, unit1, value2, unit2 } = req.body;

  if (!value1 || !unit1 || !value2 || !unit2) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const valueInUnit1 = convertUnits(value2, unit2, unit1);
  const valueInUnit2 = convertUnits(value1, unit1, unit2);

  if (valueInUnit1 !== null && valueInUnit2 !== null) {
    const totalValueInUnit1 = value1 + valueInUnit1;
    const totalValueInUnit2 = value2 + valueInUnit2;

    return res.json({
      value1,
      unit1,
      value2,
      unit2,
      total_value_in_unit1: totalValueInUnit1,
      total_value_in_unit2: totalValueInUnit2
    });
  } else {
    return res.status(400).json({ error: 'Conversion not supported for addition' });
  }
});

// POST endpoint for subtracting units
app.post('/api/subtract', (req, res) => {
  const { value1, unit1, value2, unit2 } = req.body;

  if (!value1 || !unit1 || !value2 || !unit2) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Convert value2 to unit1
  const valueInUnit1 = convertUnits(value2, unit2, unit1);

  if (valueInUnit1 !== null) {
    const resultInUnit1 = value1 - valueInUnit1;
    // Convert resultInUnit1 to unit2
    const resultInUnit2 = convertUnits(resultInUnit1, unit1, unit2);

    return res.json({
      value1,
      unit1,
      value2,
      unit2,
      result_in_unit1: resultInUnit1,
      result_in_unit2: resultInUnit2, // Add result_in_unit2
    });
  } else {
    return res.status(400).json({ error: 'Conversion not supported for subtraction' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

