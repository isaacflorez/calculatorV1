const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator--display')
const keys = calculator.querySelector('.calculator--keys')

keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return

    const key = event.target // html of button clicked
    const keyValue = key.textContent // actual value
    const displayValue = display.textContent // html val of display
    const type = key.dataset.type // element data type
    const previousKeyType = calculator.dataset.previousKeyType

    if (type === 'number'){
        if (displayValue === '0' || previousKeyType === 'operator'){
            display.textContent = keyValue
        } else { display.textContent = displayValue + keyValue }
    }

    if (type === 'operator'){
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset = ''})
        key.dataset.state = 'selected'
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type === 'equal'){
        // Working on different scenarios with equal button
        // If
        // - clicks equal with no values - done**
        // - clicks number then equal
        // - clicks numner, operator then equal
        if(!calculator.dataset.firstNumber){
            display.textContent = '0'
        } else if(previousKeyType === 'number' && !calculator.dataset.operator){
            display.textContent = keyValue
        }
        else {
            // Perform calculation
            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator
            const secondNumber = displayValue
            display.textContent = calculate(firstNumber, operator, secondNumber)
        }
        

        
    }

    if (type === 'clear'){
        // clear display value and re set vars
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type;       
})

function calculate(firstNumber, operator, secondNumber){
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)

    if (operator === 'plus') return firstNumber + secondNumber
    if (operator === 'minus') return firstNumber - secondNumber
    if (operator === 'times') return firstNumber * secondNumber
    if (operator === 'divide') return firstNumber / secondNumber
}

// ===============================
//       TESTING FUNCTIONS
// ===============================
function clearCalculator(){
    const clearKey = document.querySelector('[data-type="clear')
    clearKey.click()
}

function testClearKey(){
    clearCalculator()
    console.assert(display.textContent === '0', 'Clear key. Display should be 0')
    console.assert(!calculator.dataset.firstNumber, 'Clear key. No first number remains')
    console.assert(!calculator.dataset.operator, 'Clear key. No operator remains')
}


const one = document.querySelector('[data-key="1"]')
const five = document.querySelector('[data-key="5"]')

function testKeySequence(test){
    // Press keys
    test.keys.forEach(key => {
       document.querySelector(`[data-key="${key}"]`).click()
   })
    // Assertions
    console.log(display.textContent)
    console.log(test.value)
    console.assert(display.textContent === test.value, test.message)

    clearCalculator()
    testClearKey()
}

const tests = [{
    keys: ['1', 'equal'],
    value: '1',
    message: 'Click 1 then equals'
}
// },{
//     keys: ['1', '5'],
//     value: '15',
//     message: 'Click 15'
// },{
//     keys: ['1', '5', '9'],
//     value: '159',
//     message: 'Click 159'
// },{
//     keys: ['1', '3', 'times', '2', 'equal'],
//     value: '26',
//     message: '13 x 2 = 26'
// }
]

tests.forEach(test => testKeySequence(test))
