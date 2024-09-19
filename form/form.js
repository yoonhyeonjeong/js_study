document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 입력값 가져오기
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('pw01').value.trim();
    const confirmPassword = document.getElementById('pw02').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const birthdate = document.getElementById('birth').value;
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(checkbox => checkbox.value);
    const agree = document.getElementById('agree').checked;

    // 검증
    if (name.length < 2) {
      alert('이름은 2글자 이상이어야 합니다.');
      return;
    }
    
    if (!email.includes('@')) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8글자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!gender) {
      alert('성별을 선택하세요.');
      return;
    }

    if (!birthdate) {
      alert('생년월일을 입력하세요.');
      return;
    }

    if (interests.length === 0) {
      alert('최소 하나의 관심 분야를 선택하세요.');
      return;
    }

    if (!agree) {
      alert('개인정보 수집에 동의해야 합니다.');
      return;
    }

    // 유효한 경우, 입력값을 콘솔에 출력
    const userInfo = {
      name: name,
      email: email,
      password: password,
      gender: gender.value,
      birthdate: birthdate,
      interests: interests,
      agree: agree
    };

    console.log(userInfo);
  });
});