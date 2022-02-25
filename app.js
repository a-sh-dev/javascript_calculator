// DOM Elements imports
import {
  valueEl,
  acEl,
  pmEl,
  percentEl,
  additionEl,
  subtractionEl,
  divisionEl,
  multiplicationEl,
  equalEl,
  decimalEl,
  numberElArray,
} from './script/dom.js';

// Import time function
import { updateTime } from './script/time.js';

// Variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Functions
const resetMemory = () => {
  if (valueStrInMemory) {
    valueStrInMemory = null;
  }
  if (operatorInMemory) {
    operatorInMemory = null;
  }
};

const getNumOfDigits = (valueStr) =>
  [...valueStr].filter((val) => /\d/.test(val)).length;

const getValueAsStr = () => {
  const currentDisplayStr = valueEl.textContent;
  return currentDisplayStr.split(',').join('');
};

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  // create dynamic font-size for the number of values/digits produced
  const digitCount = getNumOfDigits(valueStr);

  if (digitCount <= 6) {
    valueEl.style.fontSize = `clamp(4rem, 1rem + 4vw, 6rem)`;
  } else if (digitCount === 7) {
    valueEl.style.fontSize = `clamp(3.65rem, 1rem + 3.65vw, 5.65rem)`;
  } else if (digitCount === 8) {
    valueEl.style.fontSize = `clamp(3.25rem, 1rem + 3.25vw, 5.25rem)`;
  } else if (digitCount >= 9) {
    valueEl.style.fontSize = `clamp(2.85rem, 1rem + 2.85vw, 4.85rem)`;
  }

  if (valueStr.at(-1) === '.') {
    valueEl.textContent += '.';
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(valueStr).toLocaleString();
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;

  switch (operatorInMemory) {
    case 'addition':
      newValueNum = valueNumInMemory + currentValueNum;
      break;
    case 'subtraction':
      newValueNum = valueNumInMemory - currentValueNum;
      break;
    case 'multiplication':
      newValueNum = valueNumInMemory * currentValueNum;
      break;
    case 'division':
      newValueNum = valueNumInMemory / currentValueNum;
      break;
  }
  return newValueNum.toString();
};

// Event handler functions
const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  const currentValueCount = getNumOfDigits(currentValueStr);

  // limit digit to max 9
  if (currentValueCount >= 9) return;

  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }

  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};

const handleAcClick = () => {
  setStrAsValue('0');
  resetMemory();
};

const handlePmClick = () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }

  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
};

const handlePercentClick = () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  resetMemory();
};

// Event Listeners to Functions
acEl.addEventListener('click', handleAcClick);
pmEl.addEventListener('click', handlePmClick);
percentEl.addEventListener('click', handlePercentClick);

// Event Listeners to Operatros
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    // reset memory
    resetMemory();
  }
});

// Event Listeners to numbers and decimal
numberElArray.map((number, i) => {
  // console.log(number);
  number.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
});

decimalEl.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});

// Setup time
setInterval(updateTime, 1000);
updateTime();
