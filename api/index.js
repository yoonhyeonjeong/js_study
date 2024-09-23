// HTML 문서가 완전히 로드되고 파싱된 후에 발생
document.addEventListener('DOMContentLoaded', () => {
    let allData = []; // 전역변수로 데이터 정의 

    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            allData = await response.json();
            console.log(allData)
            renderItem(allData)
        } catch (error) {
            console.log('error')
        }
    }

    fetchData()

    // 렌더링
    const ul = document.querySelector('.userlist')
    const renderItem = (data) => {
        ul.innerHTML = '' // 이전목록 초기화
        data.forEach(item => {
            const li = document.createElement('li');
            li.dataset.id = item.id;

            const userIdSpan = document.createElement('span');
            userIdSpan.textContent = `user id : ${item.userId}`;
            li.appendChild(userIdSpan);

            const titleSpan = document.createElement('span');
            titleSpan.className = 'title';
            titleSpan.textContent = item.title;
            li.appendChild(titleSpan);

            const bodySpan = document.createElement('span');
            bodySpan.className = 'body';
            bodySpan.textContent = item.body;
            li.appendChild(bodySpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'X';
            li.appendChild(deleteBtn);

            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.textContent = `❤️ 0`;
            li.appendChild(likeBtn);
            ul.appendChild(li);
        })
        const totalPost = document.querySelector('.total-post')
        totalPost.textContent = `총 게시글 ${data.length}개`
    }

    // 검색
    const searchBtn = document.querySelector('.search-btn');
    const input = document.querySelector('input')

    const filterItem = () => {
        let searchVal = input.value.toLowerCase();
        const filterArray = allData.filter(item => {
            return (
                item.userId.toString().includes(searchVal) ||
                item.id.toString().includes(searchVal) ||
                item.title.toLowerCase().includes(searchVal) ||
                item.body.toLowerCase().includes(searchVal)
            );
        })
        searchVal = '';
        renderItem(filterArray) // 필터링된 데이터 렌더링
    }

    searchBtn.addEventListener('click',filterItem)

    // 삭제
    const removeItem = (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const answer = confirm('게시물을 삭제하겠습니까?')
            if(answer){
                const parentNode = e.target.closest('li');
                const itemId = Number(parentNode.dataset.id) // 문자열 -> 숫자로 바꿈
                allData = allData.filter(item => item.id !== itemId)
                renderItem(allData)
            }
        }
    }

    // 좋아요
    const likeCount = (e) => {
        if(e.target.classList.contains('like-btn')){
            const parentNode = e.target.closest('li')
            const likeBtn = parentNode.querySelector('.like-btn')
            const likeText =likeBtn.textContent.split(' ')[1];
            let likeCount = parseInt(likeText, 10); 
            likeCount += 1;
            likeBtn.textContent = `❤️ ${likeCount}`

        }
    }

    // 이벤트 위임 
    ul.addEventListener('click', (e) => {
        removeItem(e);
        likeCount(e);
    });
    
});