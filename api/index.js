// HTML 문서가 완전히 로드되고 파싱된 후에 발생
document.addEventListener('DOMContentLoaded', () => {
    let allData = []; // 전역변수로 데이터 정의 
    // postData
    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            allData = await response.json();
        } catch (error) {
            console.log('error')
        }
    }

    fetchData()

     // comments 데이터 가져오기
     async function fetchComments() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            allComments = await response.json(); // 댓글 데이터
            mergePostsAndComments(); // 게시물과 댓글 데이터를 병합
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }
    fetchComments()

    // post data + comments data
     function mergePostsAndComments() {
        // 각 post에 해당하는 comments를 추가
        allData.forEach(post => {
            // 해당 post에 달린 댓글들을 필터링하여 배열로 저장
            post.comment = allComments.filter(comment => comment.postId === post.id);
        });
        renderItem(allData); // 병합된 데이터를 화면에 렌더링
    }

    // 렌더링
    const ul = document.querySelector('.userlist')
    const renderItem = (data) => {
        ul.innerHTML = '' // 이전목록 초기화
        data.forEach(item => {
            const li = document.createElement('li');
            li.dataset.id = item.id;

            const userIdSpan = document.createElement('span');
            userIdSpan.className = 'userid';
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

            const buttonWrap = document.createElement('div');
            buttonWrap.className = 'button-wrap'
            li.appendChild(buttonWrap)

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = `✏️`;
            buttonWrap.appendChild(editBtn);

            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.textContent = `❤️ 0`;
            buttonWrap.appendChild(likeBtn);
            // 댓글 추가
            item.comment.forEach((comment,index) => {
                console.log(index)
                const commentDiv = document.createElement('div')
                commentDiv.className = 'comment-wrap'
                commentDiv.innerHTML = `<p class="post-id">${index}Post Id : ${comment.postId}</p>
                <p class="post-id">email : ${comment.email}</p>
                <p class="post-id">content : ${comment.body}</p>
                `
                li.appendChild(commentDiv)
                ul.appendChild(li)
            })

        })


        forEach(()=>{

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
            const likeText = likeBtn.textContent.split(' ')[1];
            let likeCount = parseInt(likeText, 10); 
            likeCount += 1;
            likeBtn.textContent = `❤️ ${likeCount}`
        }
    }

    // 수정
    const modal = document.querySelector('.modal')
    const editPost = (e) => {
        const idInput = document.querySelector('#user_id')
        const titleInput = document.querySelector('#post_title')
        const contentInput = document.querySelector('#post_content')
        const parentNode = e.target.closest('li')
        const content = parentNode.querySelector('.body')

        if(e.target.classList.contains('edit-btn')){
            const userId = parentNode.querySelector('.userid')
            const title = parentNode.querySelector('.title')

            modal.style.display = 'flex';
            contentInput.focus();
            titleInput.focus();
            
            idInput.value = userId.textContent
            idInput.disabled = true;
            titleInput.value = title.textContent
            titleInput.disabled = true;
            contentInput.value = content.textContent
        }

        const saveBtn = document.querySelector('.save-btn');
        const itemId = Number(parentNode.dataset.id)
        
        // 이벤트 중복실행 방지, 기존에 등록된 이벤트 리스너를 제거
        saveBtn.removeEventListener('click', savePost);
        // 새로운 리스너 등록
        saveBtn.addEventListener('click', () => savePost(contentInput, content, itemId))
    }
    
    // 저장
    const savePost = (contentInput, content, itemId) => {   
        if(contentInput.value === content.textContent){
            alert('게시글 내용이 동일합니다.!')
            return;
        }

        const isSaveConfirmed = confirm('저장하시겠습니까?')
        if(isSaveConfirmed && contentInput.value !== content.textContent){
            const itemUpdate = allData.find(item => item.id === itemId)// 단일요소 찾을때
            // 배열값 변경 
            if(itemUpdate){
                itemUpdate.body = contentInput.value
            }
            content.textContent = contentInput.value
            modal.style.display ='none'
            renderItem(allData)
        }
    }

    // 모달 닫기
    const closeBtn = document.querySelector('.close-btn')
    const modalClose = () => {
        const isCloseConfirmed = confirm('닫으시겠습니까?')
        if(isCloseConfirmed){
            modal.style.display ='none'
        }
    }
    closeBtn.addEventListener('click', modalClose)
    
    // 이벤트 위임 
    ul.addEventListener('click', (e) => {
        removeItem(e);
        likeCount(e);
        editPost(e);
    });
    
});