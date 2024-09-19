// 퀴즈 
const questions = [
    {
        question:'시간빨리가는방법?',
        answers:[
            { text : "열코딩한다", correct: false},
            { text : "책을읽는다", correct: true},
            { text : "잔다", correct: false},
            { text : "논다", correct: false},
        ],
        explain:'책을 읽으면 집중력이 높아져서 시간이 빨리가는걸 느낄수있습니다. 당신 책좀 읽으세요!'
    },
    {
        question:'js 잘하는법?',
        answers:[
            { text : "클론코딩하기", correct: false},
            { text : "쥐피티랑놀기", correct: false},
            { text : "구글링하기", correct: false},
            { text : "순차적으로생각해보기", correct: true},
        ],
        explain:'코딩을 하기 앞서 생각할건 어떻게 동작할것인지 순차적으로 로직을 짜는게 1순위라고 생각합니다.'
    },
    {
        question:'졸릴때 잠꺠는방법?',
        answers:[
            { text : "세수한다", correct: false},
            { text : "양치한다", correct: false},
            { text : "커피를마신다", correct: false},
            { text : "커피를쏟는다", correct: true},
        ],
        explain:'커피를 쏟는게 잠을 깨는데 탁월한 선택입니다.'
    },
    {
        question:'세상에서제일귀여운건?',
        answers:[
            { text : "강아지", correct: false},
            { text : "모카", correct: true},
            { text : "토끼", correct: false},
            { text : "고양이", correct: false},
        ],
        explain:'저희집고양이 모카가 제일 귀엽습니다!.'
    },
    {
        question:'취업하는방법?',
        answers:[
            { text : "이력서 넣기", correct: false},
            { text : "면접잘보기", correct: false},
            { text : "코딩잘하기", correct: false},
            { text : "절실함!!", correct: true},
        ],
        explain:'절실함이 제일 중요한거같습니다'
    },
]
const quize = document.querySelector('.quiz')
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const explain = document.querySelector('.explain');

// 초기 인덱스,점수값 설정
let currentQuestionIndex = 0;
let score = 0;

// 퀴즈 시작
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'next';
    showQuestion();
}

// 문제 보여주기 
function showQuestion(){
    resetState();
    // 타이머 시작
    intervalTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`
    // 정답수만큼 반복문돌리기
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add('btn');
        answerBtn.appendChild(button)
        // 정답이면 버튼 data-correct 넣어주기, 정답 점수 5점 추가..
        if(answer.correct){
            button.dataset.correct = answer.correct;
            button.dataset.score = 5;
        }else{
            button.dataset.score = 0;
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = 'none';
    // 정답 없애기(다음문제로갈때)
    // 1. while문 쓰기 - 버튼들의 자식버튼이있을때 제거. 풀제거!
    // while(answerBtn.firstChild){
    //     answerBtn.removeChild(answerBtn.firstChild);
    // }
    // 2. foreach 쓰기
    // console.log(answerBtn.children)
    // Array.from(answerBtn.children).forEach((anserbtn)=>{
    //     anserbtn.remove()
    // })
    // 3. innerHtml 쓰는방법
    answerBtn.innerHTML = '';
    // 설명삭제!!
    explain.innerHTML = '';
    
}

function selectAnswer(e){
    // clearInterval(timerId); // 타이머중지
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    // 정답 or 오답일경우 class추가 (선택된버튼)
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score += Number(selectedBtn.dataset.score);
    }else{
        selectedBtn.classList.add('incorrect');
    }
    // 정답들 배열로 담아서 반복문으로 돌려서 정답이면 class추가 
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct == 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block'; 
    showExplain(isCorrect);

}
// 타이머 추가
function intervalTimer() {
    const timer = document.querySelector('.time');
    let time = 10; // 처음값 10초
    setTimeout(() => {
        const timerId = setInterval(() => {
            if (time > 0) {
                time--; // 1 씩 감소
                timer.textContent = `${time}초`;
            }else{
                clearInterval(timerId);
            }
        }, 1000);
    }, 5000);
  }
  
  
// 정답 선택후 설명 추가
function showExplain(isCorrect){
    // 정답,오답 설명추가
    const questionExplain = questions[currentQuestionIndex].explain
    Array.from(answerBtn.children).forEach(btn => {
        if(!isCorrect){
            explain.textContent = `오답입니다. ${questionExplain}`
        }else{
            explain.textContent = `정답입니다. ${questionExplain}`
        }
        // 삼항연산자
        // isCorrect ? 
        // explain.textContent = `정답입니다. ${questionExplain}` 
        // : explain.textContent = `오답입니다. ${questionExplain}`
    })
}
// 마지막화면 (점수보여주기)
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextBtn.textContent = 'play again';
    nextBtn.style.display = 'block';
}

function handleNextButton(){
    // next버튼 누를때 현재인덱스증가!
    currentQuestionIndex++;
    // 현재인덱스가 < 문제수보다 작으면
    if(currentQuestionIndex < questions.length){
        showQuestion(); // 다음문제진행
    }else{
        showScore(); // 스코어보여주기
    }
}

nextBtn.addEventListener('click', ()=>{
    // index가 질문수보다 작으면
    console.log(currentQuestionIndex,questions.length)
    if(currentQuestionIndex < questions.length){
        handleNextButton() // 다음문제이동
    }else{
        startQuiz();
    }
})

startQuiz();




