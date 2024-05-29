console.log("likelist.js 로드됨");

const API_KEY = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const BASE_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", function () {
  var wishlist = [];

  function addToWishlist(movieId, title, overview, poster) {
    var movie = {
      id: movieId,
      title: title,
      overview: overview,
      poster: poster,
    };

<<<<<<< HEAD
    var index = wishlist.findIndex((m) => m.id === movieId);

    if (index === -1) {
      wishlist.push(movie);
      alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    } else {
      wishlist.splice(index, 1);
      alert(`${title}이(가) 찜 목록에서 제거되었습니다.`);
    }

    updateWishlistModal();
  }

  function updateWishlistModal() {
    var wishlistContainer = document.getElementById("wishlist");
    if (!wishlistContainer) {
      console.log("wishlistContainer를 찾을 수 없음");
      return;
    }

    wishlistContainer.innerHTML = "";

    wishlist.forEach(function (movie) {
      var li = document.createElement("li");
      var posterElement = document.createElement("img");
      posterElement.src = movie.poster;
      posterElement.alt = movie.title;
      li.appendChild(posterElement);
      wishlistContainer.appendChild(li);
    });
  }

  function openWishlistModal() {
    var modal = document.getElementById("wishlistModal");
    updateWishlistModal();
    modal.style.display = "block";
  }

  function closeModals() {
    var modals = document.querySelectorAll(".modal");
    modals.forEach(function (modal) {
      modal.style.display = "none";
    });
  }

=======
    if (!wishlist.some((m) => m.id === movieId)) {
      wishlist.push(movie);
      alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    }
  }

  function openWishlistModal() {
    var modal = document.getElementById("wishlistModal");
    var wishlistContainer = document.getElementById("wishlist");
    wishlistContainer.innerHTML = "";

    wishlist.forEach(function (movie) {
      var li = document.createElement("li");
      li.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
      `;
      wishlistContainer.appendChild(li);
    });
// 모달에 영화 정보 표시하는 함수
function showMovieModal(movie) {
  var wishlistModal = document.getElementById("wishlistModal");

    modal.style.display = "block";
  }

  function closeModals() {
    var modals = document.querySelectorAll(".modal");
    modals.forEach(function (modal) {
      modal.style.display = "none";
    });
  }
  // 모달 표시
  wishlistModal.style.display = "block";
}

>>>>>>> develop
  var wishlistButtons = document.querySelectorAll(".wishlist-button");
  wishlistButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var movieId = parseInt(button.dataset.movieId);
      var title = button.dataset.title;
      var overview = button.dataset.overview;
      var poster = button.dataset.poster;
      addToWishlist(movieId, title, overview, poster);
    });
  });

  var wishlistButton = document.getElementById("wishlistButton");
  wishlistButton.addEventListener("click", openWishlistModal);

  var closeButtons = document.querySelectorAll(".modal .close");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModals);
  });

  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModals();
    }
  });
});
