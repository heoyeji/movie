const movieApiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const movieLanguage = "ko-KR";

// 인기순
fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=${movieLanguage}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("네트워크 상태가 좋지 않습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const popularMovies = data.results.slice(0, 5);
    const popularList = document.querySelector("#popular ul");
    popularList.innerHTML = "";

    popularMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      popularList.appendChild(listItem);
    });

    addWishlistEventListeners();
  })
  .catch((error) => {
    console.error("인기순 오류 발생:", error);
  });

// 평점순
fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}&language=${movieLanguage}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("네트워크 상태가 좋지 않습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const topRatedMovies = data.results.slice(0, 5);
    const topRatedList = document.querySelector("#best ul");
    topRatedList.innerHTML = "";

    topRatedMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      topRatedList.appendChild(listItem);
    });

    addWishlistEventListeners();
  })
  .catch((error) => {
    console.error("평점순 오류 발생:", error);
  });

// 개봉예정
fetch(
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}&language=${movieLanguage}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("네트워크 상태가 좋지 않습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const nowPlayingMovies = data.results.slice(0, 5);
    const nowPlayingList = document.querySelector("#new ul");
    nowPlayingList.innerHTML = "";

    nowPlayingMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      nowPlayingList.appendChild(listItem);
    });

    addWishlistEventListeners();
  })
  .catch((error) => {
    console.error("최신순 오류 발생:", error);
  });

function createListItem(movie) {
  const listItem = document.createElement("li");

  const posterHover = document.createElement("div");
  posterHover.classList.add("posterhover");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("posttitle");
  postTitle.textContent = movie.title;

  const postP = document.createElement("p");
  postP.classList.add("postp");
  postP.textContent = movie.overview;

  const postRate = document.createElement("h4");
  postRate.classList.add("postrate");
  postRate.innerHTML = `<i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
    1
  )}점`;

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;

  posterHover.appendChild(postTitle);
  posterHover.appendChild(postP);
  posterHover.appendChild(postRate);
  posterHover.appendChild(img);

  const div = document.createElement("div");
  const likeButton = document.createElement("button");
  likeButton.classList.add("wishlist-button");
  likeButton.dataset.movieId = movie.id;
  likeButton.dataset.title = movie.title;
  likeButton.dataset.overview = movie.overview;
  likeButton.dataset.poster = img.src;
  likeButton.innerHTML = `<i class="fa-regular fa-heart"></i> 찜하기`;

  div.appendChild(likeButton);

  const detailButton = document.createElement("p");
  detailButton.innerHTML = `<a href="#" class="detail-btn" data-id="${movie.id}">상세보기</a>`;
  div.appendChild(detailButton);

  listItem.appendChild(posterHover);
  listItem.appendChild(div);

  return listItem;
}

function addWishlistEventListeners() {
  const wishlistButtons = document.querySelectorAll(".wishlist-button");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const movieId = parseInt(button.dataset.movieId);
      const title = button.dataset.title;
      const overview = button.dataset.overview;
      const poster = button.dataset.poster;
      addToWishlist(movieId, title, overview, poster);
    });
  });
}
