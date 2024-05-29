// 찜하기 버튼에 대한 이벤트 리스너를 추가하는 함수
function addLikeButtonEventListener(likeButton) {
  likeButton.addEventListener("click", (e) => {
    e.preventDefault();
    const heartIcon = likeButton.querySelector("i");
    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
    }
  });
}
