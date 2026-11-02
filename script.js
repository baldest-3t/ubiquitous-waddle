const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value || '0';
}

function appendValue(value) {
  if (shouldResetDisplay) {
    expression = '';
    shouldResetDisplay = false;
  }

  const lastChar = expression.slice(-1);

  if (['+', '-', '*', '/'].includes(value)) {
    if (!expression || ['+', '-', '*', '/'].includes(lastChar)) {
      if (!expression && value === '-') {
        expression += value;
      } else if (value === '-' && lastChar !== '-') {
        expression += value;
      }
      updateDisplay(expression);
      return;
    }

    expression += value;
    updateDisplay(expression);
    return;
  }

  if (value === '.') {
    const parts = expression.split(/[+\-*/]/);
    const currentPart = parts[parts.length - 1];
    if (currentPart.includes('.')) {
      return;
    }
  }

  expression += value;
  updateDisplay(expression);
}

function clearAll() {
  expression = '';
  shouldResetDisplay = false;
  updateDisplay('0');
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression || '0');
}

function calculateExpression() {
  if (!expression) {
    return;
  }

  const sanitized = expression.replace(/(?!\d)(?<!\d)-/g, '');
  const formatted = sanitized.replace(/(\d)\/(\d)/g, '$1/$2');

  try {
    const result = evaluate(formatted);
    expression = String(result);
    updateDisplay(expression);
    shouldResetDisplay = true;
  } catch (error) {
    expression = '';
    updateDisplay('Error');
    shouldResetDisplay = true;
  }
}

function evaluate(expr) {
  const tokens = expr.match(/\d*\.?\d+|[+\-*/]/g);

  if (!tokens || tokens.length === 0) {
    throw new Error('Invalid expression');
  }

  const values = [];
  const operators = [];

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const applyOperator = () => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();

    if (left === undefined || right === undefined) {
      throw new Error('Invalid expression');
    }

    switch (operator) {
      case '+':
        values.push(left + right);
        break;
      case '-':
        values.push(left - right);
        break;
      case '*':
        values.push(left * right);
        break;
      case '/':
        if (right === 0) {
          throw new Error('Division by zero');
        }
        values.push(left / right);
        break;
      default:
        throw new Error('Unknown operator');
    }
  };

  for (const token of tokens) {
    if (/^\d*\.?\d+$/.test(token)) {
      values.push(Number(token));
      continue;
    }

    while (
      operators.length &&
      precedence[operators[operators.length - 1]] >= precedence[token]
    ) {
      applyOperator();
    }

    operators.push(token);
  }

  while (operators.length) {
    applyOperator();
  }

  if (values.length !== 1) {
    throw new Error('Invalid expression');
  }

  return values[0];
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { value } = button.dataset;
    const { action } = button.dataset;

    if (action === 'clear') {
      clearAll();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'equals') {
      calculateExpression();
      return;
    }

    appendValue(value);
  });
});

updateDisplay('0');
