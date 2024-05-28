console.log("likelist.js 로드됨");

const API_KEY = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const BASE_URL = "https://api.themoviedb.org/3";

var wishlist = [];

function updateWishlistModal() {
  var wishlistContainer = document.getElementById("wishlist");
  if (!wishlistContainer) {
    console.log("wishlistContainer를 찾을 수 없음");
    return;
  }

  wishlistContainer.innerHTML = "";

  wishlist.forEach(function (movie) {
    var listItem = document.createElement("li");

    // 영화 포스터
    var posterElement = document.createElement("img");
    posterElement.src = movie.poster;
    posterElement.alt = "movie poster";
    posterElement.classList.add("wishlist-poster"); // 포스터에 클래스 추가
    listItem.appendChild(posterElement);

    // 클릭 이벤트 리스너 추가
    listItem.addEventListener("click", function () {
      showMovieModal(movie);
    });

    wishlistContainer.appendChild(listItem);
  });
}

function openWishlistModal() {
  updateWishlistModal();
  var wishlistModal = document.querySelector("#wishlistModal");
  wishlistModal.style.display = "block";
}

function closeWishlistModal() {
  var wishlistModal = document.querySelector("#wishlistModal");
  wishlistModal.style.display = "none";
}

var closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", closeWishlistModal);

var wishlistButton = document.getElementById("wishlistButton");
wishlistButton.addEventListener("click", function (event) {
  event.preventDefault();
  openWishlistModal();
});

function addToWishlist(movieId, title, overview, poster) {
  console.log("addToWishlist 함수 호출됨");
  console.log("전달된 인자:", movieId, title, overview, poster);

  var index = wishlist.findIndex(function (item) {
    return item.id === movieId;
  });

  if (index === -1) {
    // 찜 목록에 추가
    wishlist.push({
      id: movieId,
      title: title,
      overview: overview,
      poster: poster,
    });
    console.log("찜 목록에 추가:", wishlist); // 확인용 로그
  } else {
    // 찜 목록에서 제거
    wishlist.splice(index, 1);
    console.log("찜 목록에서 제거:", wishlist); // 확인용 로그
  }

  // 찜 목록을 업데이트하여 모달에 표시
  updateWishlistModal();
}

// 모달에 영화 정보 표시하는 함수
function showMovieModal(movie) {
  var modal = document.getElementById("movieModal");

  // 영화 정보 설정
  document.getElementById("modal-img").src = movie.poster;
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-overview").textContent = movie.overview;

  // 모달 표시
  modal.style.display = "block";
}

// 찜 목록 버튼에 클릭 이벤트 리스너 추가
var wishlistButton = document.getElementById("wishlistButton");
wishlistButton.addEventListener("click", openWishlistModal);

// 찜 목록에 있는 영화를 클릭했을 때 모달에 영화 정보 표시
document.getElementById("wishlist").addEventListener("click", function (event) {
  var movieId = parseInt(event.target.dataset.movieId);
  var movie = wishlist.find(function (item) {
    return item.id === movieId;
  });

  if (movie) {
    showMovieModal(movie);
  }
});
