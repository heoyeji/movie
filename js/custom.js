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
    const popularMovies = data.results.slice(0, 5); // 인기 있는 영화 중 첫 5개만 선택
    const popularListHTML = popularMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#popular ul").innerHTML = popularListHTML;
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
    const topRatedMovies = data.results.slice(0, 5); // 평점순으로 인기 있는 영화 중 첫 5개만 선택
    const topRatedListHTML = topRatedMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#best ul").innerHTML = topRatedListHTML;
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
    const nowPlayingMovies = data.results.slice(0, 5); // 최신순으로 인기 있는 영화 중 첫 5개만 선택
    const nowPlayingListHTML = nowPlayingMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#new ul").innerHTML = nowPlayingListHTML;
  })
  .catch((error) => {
    console.error("최신순 오류 발생:", error);
  });

// 영화 정보를 HTML 문자열로 변환
function createListItemHTML(movie) {
  return `
    <li>
      <div class="posterhover">
        <h3 class="posttitle">${movie.title}</h3>
        <p class="postp">${movie.overview}</p>
        <h4 class="postrate"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
          1
        )}점</h4>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  } 포스터">
      </div>
      <div>
        <button
          class="wishlist-button"
          data-movie-id="${movie.id}"
          data-title="${movie.title}"
          data-overview="${movie.overview}"
          data-poster="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        >
          <i class="fa-regular fa-heart"></i> 찜하기
        </button>
        <p><a href="#" class="detail-btn" data-id="${movie.id}">상세보기</a></p>
      </div>
    </li>
  `;
}

// URL에서 쿼리 매개변수 가져오기
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");
