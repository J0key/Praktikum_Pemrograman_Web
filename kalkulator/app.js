const screendisplay = document.querySelector('.screen')
const buttons = document.querySelectorAll('button')

let calculation = []
let accumulativeCalculation = '';

function calculate(button) {
    const value = button.textContent;

    if (value === "CLEAR") {
        calculation = []
        accumulativeCalculation = '';
        screendisplay.textContent = '0';
    } else if (value === "=") {
        if (calculation.length > 0) {
            calculation.push(accumulativeCalculation);
            const result = evaluateExpression(calculation.join(''));
            screendisplay.textContent = result;
            calculation = [result.toString()];
            accumulativeCalculation = '';
          }
    } else {
        calculation.push(accumulativeCalculation);
        calculation.push(value);
        accumulativeCalculation = '';
        screendisplay.textContent = calculation.join('');
      }
}

function evaluateExpression(expression) {
    const numbers = expression.split(/[-+*/]/).map(parseFloat)
    const operators = expression.split(/[0-9.]/).filter(Boolean)

    let result = numbers[0]
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i]
        const number = numbers[i + 1]

        if (operator === '*') {
            result *= number
        } else if (operator === '/') {
            result /= number
        } else if (operator === '+') {
            result += number
        } else if (operator === '-') {
            result -= number
        }
    }

    return result
}


buttons.forEach(button => button.addEventListener('click', () => calculate(button)))

