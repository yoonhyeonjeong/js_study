// 트윗 게시 버튼 요소
const postTweet = document.querySelector('#postTweet');
// 트윗글  배열로 저장!!
let tweetArray = [];
postTweet.addEventListener('click', function () {
  const tweetInput = document.querySelector('#tweetInput');
  const tweetsContainer = document.querySelector('#tweets_container');
  // 인풋밸류값 없을때 종료
  if (!tweetInput.value) {
    return;
  }
  // 트윗갯수 제한
  let tweetlength = tweetsContainer.children.length + 1;
  console.log(tweetlength);
  if (tweetlength > 5) {
    alert('트윗은 5개까지만 쓸 수 있습니다');
    return;
  }
  // 트윗 추가 함수
  addTweet(tweetInput, tweetsContainer);
  // 초기화
  tweetInput.value = '';
});

// 트윗추가함수
function addTweet(tweetInput, tweetsContainer) {
  // 트윗 추가
  const div = document.createElement('div');

  let count = 0;
  div.className = 'tweet';
  div.innerHTML = `
  <span class="tweet-text">${tweetInput.value}</span>
  <button class="edit-button">수정</button>
  <button class="like-button">좋아요</button>
  <span>${count}</span>
  `;
  tweetsContainer.append(div);

  // 트윗 객체 만들어서 배열로 관리
  const tweet = {
    id: Date.now(),
    text: tweetInput.value,
  };
  tweetArray.push(tweet);
  console.log(tweetArray);

  // 버튼 생성된 시점에 좋아요함수 호출
  const likeBtn = document.querySelectorAll('.like-button');
  likeCount(likeBtn, count);

  const editBtn = document.querySelectorAll('.edit-button');
  EditTweet(editBtn, tweetInput);
}

// 좋아요 count 함수
function likeCount(likeBtn, count) {
  likeBtn.forEach((button) => {
    // 초기값 설정
    button.dataset.count = 0;
    // count 초기값
    button.addEventListener('click', function () {
      // 좋아요 카운트 10까지
      if (count > 9) {
        return;
      }
      // +1 씩 증가
      count++;
      button.dataset.count = count;
      // span에 카운트값 넣기
      let nextElement = this.nextElementSibling;
      nextElement.textContent = count;
    });
  });
}

// 수정함수
function EditTweet(editBtn, tweetInput) {
  let isEditing = false;
  editBtn.forEach((button) => {
    button.addEventListener('click', function () {
      tweetInput.focus();
      // 인풋 값 확인
      console.log('Input value:', tweetInput.value);
      const tweetElement = this.closest('.tweet');
      const tweetTextElement = tweetElement.querySelector('.tweet-text');

      if (isEditing) {
        // 수정 완료
        if (
          tweetInput.value &&
          tweetInput.value !== tweetTextElement.textContent
        ) {
          tweetTextElement.textContent = tweetInput.value;
          this.textContent = '수정';
          isEditing = false;
          tweetInput.value = '';
          postTweet.disabled = false;
        } else {
          alert('수정할 내용을 입력해주세요. !');
        }
      } else {
        // 수정 모드 시작
        tweetInput.value = tweetTextElement.textContent; // 현재 텍스트를 입력 필드에 설정
        this.textContent = '수정완료';
        isEditing = true;
        postTweet.disabled = true;
      }
    });
  });
}