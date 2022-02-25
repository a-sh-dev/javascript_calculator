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
const getValueAsStr = () => {
  const currentDisplayStr = valueEl.textContent;
  return currentDisplayStr.split(',').join('');
};

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
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

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
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

// Event Listeners to Functions
acEl.addEventListener('click', () => {
  setStrAsValue('0');
  // clear memory
  valueStrInMemory = null;
  operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
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
});

percentEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  // clear memory
  valueStrInMemory = null;
  operatorInMemory = null;
});

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
    valueStrInMemory = null;
    operatorInMemory = null;
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
