// 찜한 영화 목록을 로컬 스토리지에서 가져옴
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// 찜한 영화 목록에 있는 영화의 id를 배열로 추출
const wishlistIds = wishlist.map((item) => item.id);

// 페이지 로딩 시 각 버튼의 초기 상태 설정 및 클릭 이벤트 처리
document.querySelectorAll(".wishlist-button").forEach((button) => {
  const movieId = button.getAttribute("data-movie-id");

  // 찜한 영화 목록에 있는 경우
  if (wishlistIds.includes(movieId)) {
    button.classList.add("on"); // 버튼에 on 클래스 추가
    button.querySelector(".fa-heart").style.color = "red"; // 하트 아이콘 색상 변경
  }

  // 클릭 이벤트 처리
  button.addEventListener("click", function () {
    // 해당 버튼의 부모 요소(li)에게 클래스를 토글합니다.
    this.classList.toggle("on");

    // 버튼에 연결된 영화 정보 가져오기
    const movieId = this.getAttribute("data-movie-id");
    const title = this.getAttribute("data-title");
    const overview = this.getAttribute("data-overview");
    const poster = this.getAttribute("data-poster");

    // 영화 정보를 로컬 스토리지에 저장
    const movieData = {
      id: movieId,
      title: title,
      overview: overview,
      poster: poster,
    };

    // 해당 영화가 이미 찜 목록에 있는지 확인
    const existingIndex = wishlist.findIndex((item) => item.id === movieId);

    // 찜하기 버튼을 눌렀을 때 이미 찜한 경우, 찜 목록에서 제거
    if (existingIndex !== -1) {
      wishlist.splice(existingIndex, 1);
      // 하트 아이콘의 색상 변경
      this.querySelector(".fa-heart").style.color = "";
    } else {
      // 아직 찜하지 않은 경우, 찜 목록에 추가
      wishlist.push(movieData);
      // 하트 아이콘의 색상 변경
      this.querySelector(".fa-heart").style.color = "red";
    }

    // 수정된 찜 목록을 로컬 스토리지에 다시 저장
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});
