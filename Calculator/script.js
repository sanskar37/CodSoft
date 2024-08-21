document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const buttonContent = button.textContent;
            
            if (action === 'number') {
                if (resultDisplayed) {
                    currentInput = buttonContent;
                    resultDisplayed = false;
                } else {
                    currentInput = (currentInput === '0') ? buttonContent : currentInput + buttonContent;
                }
            } else if (action === 'operator') {
                if (operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                }
                operator = button.getAttribute('data-operator');
                previousInput = currentInput;
                currentInput = '';
            } else if (action === 'equal') {
                if (operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    operator = '';
                    resultDisplayed = true;
                }
            } else if (action === 'clear') {
                currentInput = '0';
                operator = '';
                previousInput = '';
            } else if (action === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
            } else if (action === 'sqrt') {
                currentInput = String(Math.sqrt(parseFloat(currentInput)));
            } else if (action === 'percent') {
                currentInput = String(parseFloat(currentInput) / 100);
            }

            if (action !== 'equal') {
                display.textContent = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return String(a + b);
            case '-': return String(a - b);
            case '*': return String(a * b);
            case '/': return String(a / b);
            default: return b;
        }
    }
});
