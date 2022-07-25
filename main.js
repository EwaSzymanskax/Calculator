const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearAll = document.querySelector('.remove');
const equal = document.querySelector('.equal');
const clearColumn = document.querySelector('.clearColumn');
const result = document.querySelector('.result');
const currentResult = document.querySelector('.currentResult');
const previousResult = document.querySelector('.previousResult');

let operation = undefined;
let currentOperation = '';
let previousOperation = '';

const calculate = () => {
    let effect
    if(!previousOperation || !currentOperation){
        return
    }

    const previous = parseFloat(previousOperation)
    const current = parseFloat(currentOperation)

    if(isNaN(previous) || isNaN(current)) {
        return
    }

    switch(operation) {
        case '+':
            effect = previous + current
            break;
        case'-':
            effect = previous - current
            break;
        case '×':
            effect = previous * current
            break;
        case '÷':
            if( current === 0){
               clear()
               return 
            }
            effect = previous / current
            break;
        case '√':
             effect = Math.pow(previous, 1 / current)
             break;
        case '%':
            effect = previous / 100 * current
            break;
        case 'log':
            effect = Math.log(previous) / Math.log(current) 
            break;
        case '^':
            effect = Math.pow(previous, current)
            break;
        default:
        return    
    }
    currentOperation = effect
    operation = undefined
    previousOperation = ''
}

const chooseOperation = (operator) => {
    if(currentOperation === ''){
        return
    }
    if(previousOperation !== ''){
        const previous = previousResult.innerText
         if(currentOperation.toString() === '0' && previous[previous.length - 1] === '÷'){
              clear()
              return
            }
            calculate()
    }

    operation = operator
    previousOperation = currentOperation
    currentOperation = '';
}

const updateResult = () => {
    currentResult.innerText = currentOperation;

    if(operation != null) {
        previousResult.innerText = previousOperation + operation
    }
    else{
        previousResult.innerText = ''

    }

}
const addNumber = (number) => {
    if(number === '•'){
        if(currentOperation.includes('.')){
            return };
        
        number = '.';
    }
    
    currentOperation = currentOperation.toString() + number.toString();
}

const deleteNumber = () => {
    currentOperation = currentOperation.toString().slice(0,-1);
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

const clear = () => {
    currentOperation = '';
    operation = undefined;
    previousOperation = ''
}

clearAll.addEventListener('click', () =>{
    clear();
    updateResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
       chooseOperation(operator.innerText);
       updateResult();
    })
})

equal.addEventListener('click', () => {
    calculate()
    updateResult()
})

clearColumn.addEventListener('click', () => {
    deleteNumber()
    updateResult()
})

