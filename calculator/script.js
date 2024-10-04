const button = document.querySelectorAll(".button");
const display = document.querySelector(".calculator-result");
const calculation = document.querySelector(".calculator-calculation");
let firstOperand = null;
let operator = null;
let secondOperand = null;

button.forEach((button) => {
    button.addEventListener("click", function () {
        let displayNumber = display.textContent;
        // 숫자버튼 눌렀을때
        if (this.classList.contains("number")) {
            // 0 이거나 두번째값 입력시
            if (displayNumber === "0" || (operator && secondOperand === null)) {
                display.textContent = this.textContent;
            } else {
                display.textContent += this.textContent;
            }

            if (!operator) {
                firstOperand = display.textContent;
            } else {
                secondOperand = display.textContent; // 두 번째 피연산자 설정
            }
            calculation.textContent = `${firstOperand} ${operator} ${secondOperand}`;
            // 소수점 눌렀을때
        } else if (this.classList.contains("dot")) {
            if (!displayNumber.includes(".")) {
                display.textContent += this.textContent;
            }
            // C 눌렀을때 초기화
        } else if (this.textContent === "C") {
            display.textContent = 0;
            calculation.textContent = "";
            firstOperand = null;
            secondOperand = null;
            operator = null;
            // 연산자 버튼 눌렀을때
        } else if (this.classList.contains("operator")) {
            // 사용자가 첫번째 숫자 입력할때 저장
            if (firstOperand === null) {
                firstOperand = displayNumber;
            }
            if (firstOperand && operator && secondOperand) {
                calculate(firstOperand, operator, secondOperand);
            }
            firstOperand = display.textContent; // 결과값 -> 첫번째값으로 저장
            secondOperand = null;
            operator = this.textContent; // 연산자를 저장
            calculation.textContent = `${firstOperand} ${operator} ${secondOperand}`;
            // 결과값
        } else if (this.classList.contains("equal")) {
            if (firstOperand && operator && secondOperand) {
                calculate(firstOperand, operator, secondOperand);
            }
            firstOperand = display.textContent;
            secondOperand = null;
            operator = null;
        }
    });
});

// 계산
function calculate(firstOperand, operator, secondOperand) {
    let result;
    switch (operator) {
        case "+":
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case "-":
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case "*":
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case "/":
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }
    result % 1 !== 0 ? (display.textContent = result.toFixed(2)) : (display.textContent = result);
}
