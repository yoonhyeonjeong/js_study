const button = document.querySelectorAll('.button');
const display = document.querySelector('.calculator-result');
const caculation = document.querySelector('.calculator-caculation');
let firstOperand = null;
let operator = null;
let secondOperand = null; 

button.forEach((button)=>{
    button.addEventListener('click',function(){   
        let displayNumber = display.textContent
        // 숫자버튼 눌렀을때
        if(this.classList.contains('number')){
            // 0 이거나 두번째값 입력시
            if (displayNumber === '0' || (operator !== null && secondOperand === null)) {
                display.textContent = this.textContent; // 디스플레이업데이트
            } else {
                display.textContent += this.textContent; // 기존 값에 추가
            }
            // 연산자 있을때
            if (operator !== null) {
                secondOperand = display.textContent; // 현재디스플레이값->두번째값
            } else {
                firstOperand = display.textContent; // 처음눌렀을때=> 첫번쨰입력값
            }
            caculation.textContent = `${firstOperand} ${operator} ${secondOperand}`
        // 소수점 눌렀을때
        }else if(this.classList.contains('dot')){ 
            if(!displayNumber.includes('.')){
                display.textContent += this.textContent
            }
        // C 눌렀을때 초기화
        }else if(this.textContent === 'C'){ 
            display.textContent = 0;
            caculation.textContent = '';
            firstOperand = null;
            secondOperand = null;
            operator = null;
        // 연산자 버튼 눌렀을때
        }else if(this.classList.contains('operator')){
            // 사용자가 첫번째 숫자 입력할때 저장
            if(firstOperand === null){
                firstOperand = displayNumber
            }else{
                // 첫번째값 있고, 연산자있을때 
                if(operator !== null){
                    calculate(firstOperand, operator, displayNumber); 
                }
            }
            operator = this.textContent; // 연산자를 저장
            caculation.textContent = `${firstOperand} ${operator} ${secondOperand}`
        // 결과값
        }else if(this.classList.contains('equal')){
            if(firstOperand !== null & operator !== null){
                calculate(firstOperand, operator, secondOperand)
            }
            firstOperand = display.textContent; 
            secondOperand = null;
            operator = null;
        }
    })
})

// 계산
function calculate(firstOperand, operator, secondOperand){
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }
    if (result % 1 !== 0) {
        display.textContent = result.toFixed(2);
    } else {
        display.textContent = result;
    }
}