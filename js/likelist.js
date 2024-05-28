const API_KEY = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const BASE_URL = "https://api.themoviedb.org/3";

// 찜한 영화 목록을 저장할 배열
var wishlist = [];

// 찜하기 버튼 클릭 시 실행되는 함수
function addToWishlist(id, title, overview, poster) {
  // 이미 찜 목록에 있는지 확인
  var index = wishlist.findIndex((item) => item.id === id);

  // 찜 목록에 없으면 추가
  if (index === -1) {
    wishlist.push({ id: id, title: title, overview: overview, poster: poster });
    updateWishlistModal(); // 찜 목록 모달 업데이트
  } else {
    alert("이미 찜한 영화입니다!");
  }
}

// 찜 목록 모달 업데이트 함수
function updateWishlistModal() {
  var wishlistContainer = document.getElementById("wishlist");
  wishlistContainer.innerHTML = ""; // 찜 목록 초기화

  // 찜 목록에 있는 영화들을 목록에 추가
  wishlist.forEach(function (item) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item.poster;
    img.alt = item.title;
    li.appendChild(img);
    var title = document.createElement("h3");
    title.textContent = item.title;
    li.appendChild(title);
    var overview = document.createElement("p");
    overview.textContent = item.overview;
    li.appendChild(overview);
    wishlistContainer.appendChild(li);
  });
}

// 찜하기 버튼과 유저 아이콘에 이벤트 추가
document
  .getElementById("wishlistButton")
  .addEventListener("click", function () {
    var modal = document.getElementById("wishlistModal");
    modal.style.display = "block";
  });

document.querySelector(".close").addEventListener("click", function () {
  var modal = document.getElementById("wishlistModal");
  modal.style.display = "none";
});
