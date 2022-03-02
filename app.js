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

// Variables & Constants
let valueStrInMemory = null;
let operatorInMemory = null;

const numberKeys = [...Array(10)].map((n, i) => i.toString());
const KEYDOWN_KEYS = [
  ...numberKeys,
  '.',
  'Enter',
  'Escape',
  '+',
  '-',
  '=',
  '*',
  '/',
];

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
    valueEl.style.fontSize = `clamp(4rem, 1rem + 4vw, 5rem)`;
  } else if (digitCount === 7) {
    valueEl.style.fontSize = `clamp(3.65rem, 1rem + 3.65vw, 4.65rem)`;
  } else if (digitCount === 8) {
    valueEl.style.fontSize = `clamp(3.25rem, 1rem + 3.25vw, 4.25rem)`;
  } else if (digitCount >= 9) {
    valueEl.style.fontSize = `clamp(2.85rem, 1rem + 2.85vw, 3.85rem)`;
  }

  if (valueStr.at(-1) === '.') {
    valueEl.textContent += '.';
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent = (
      parseFloat(wholeNumStr).toLocaleString() +
      '.' +
      decimalStr
    ).slice(0, 9);
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

const handleDecimalClick = () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
};

const handleEqualClick = () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    resetMemory();
  }
};

// Fix mobile bug for click events
['click', 'touchstart'].forEach((e) => {
  // Event Listeners to Functions
  acEl.addEventListener(e, handleAcClick);
  pmEl.addEventListener(e, handlePmClick);
  percentEl.addEventListener(e, handlePercentClick);
  decimalEl.addEventListener(e, handleDecimalClick);

  // Event Listeners to Operatros
  additionEl.addEventListener(e, () => {
    handleOperatorClick('addition');
  });

  subtractionEl.addEventListener(e, () => {
    handleOperatorClick('subtraction');
  });

  multiplicationEl.addEventListener(e, () => {
    handleOperatorClick('multiplication');
  });

  divisionEl.addEventListener(e, () => {
    handleOperatorClick('division');
  });

  equalEl.addEventListener(e, handleEqualClick);

  // Event Listeners to numbers and decimal
  numberElArray.map((number, i) => {
    // console.log(number);
    number.addEventListener(e, () => {
      handleNumberClick(i.toString());
    });
  });
});

// Event Listeners for keydown / keyboard press
document.addEventListener('keydown', (e) => {
  if (!KEYDOWN_KEYS.includes(e.key)) return;
  e.preventDefault();

  switch (e.key) {
    case '0':
      handleNumberClick('0');
      break;
    case '1':
      handleNumberClick('1');
      break;
    case '2':
      handleNumberClick('2');
      break;
    case '3':
      handleNumberClick('3');
      break;
    case '4':
      handleNumberClick('4');
      break;
    case '5':
      handleNumberClick('5');
      break;
    case '6':
      handleNumberClick('6');
      break;
    case '7':
      handleNumberClick('7');
      break;
    case '8':
      handleNumberClick('8');
      break;
    case '9':
      handleNumberClick('9');
      break;
    case '.':
      handleDecimalClick();
      break;
    case 'Enter':
      handleEqualClick();
      break;
    case '=':
      handleEqualClick();
      break;
    case 'Escape':
      handleAcClick();
      break;
    case '+':
      handleOperatorClick('addition');
      break;
    case '-':
      handleOperatorClick('subtraction');
      break;
    case '*':
      handleOperatorClick('multiplication');
      break;
    case '/':
      handleOperatorClick('division');
      break;
  }
});

// Setup time
setInterval(updateTime, 1000);
updateTime();
