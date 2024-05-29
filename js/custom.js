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
    const popularList = document.querySelector("#popular ul");
    popularList.innerHTML = ""; // 기존에 있던 영화들 제거

    popularMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      popularList.appendChild(listItem);
    });
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
    const topRatedList = document.querySelector("#best ul");
    topRatedList.innerHTML = ""; // 기존에 있던 영화들 제거

    topRatedMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      topRatedList.appendChild(listItem);
    });
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
    const nowPlayingList = document.querySelector("#new ul");
    nowPlayingList.innerHTML = ""; // 기존에 있던 영화 제거

    nowPlayingMovies.forEach((movie) => {
      const listItem = createListItem(movie);
      nowPlayingList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("최신순 오류 발생:", error);
  });

// 영화 정보 받아서 리스트로 만들기
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

  posterHover.appendChild(postTitle);
  posterHover.appendChild(postP);
  posterHover.appendChild(postRate);
  posterHover.appendChild(img);

  const div = document.createElement("div");
  const likeButton = document.createElement("p");
  likeButton.innerHTML = `<a href="#"><i class="far fa-heart"></i> 찜하기</a>`;

  // 찜하기 버튼에 대한 이벤트 리스너 추가
  addLikeButtonEventListener(likeButton);

  div.appendChild(likeButton);

  const detailButton = document.createElement("p");
  detailButton.innerHTML = `<a href="#" class="detail-btn" data-id="${movie.id}">상세보기</a>`;
  div.appendChild(detailButton);

  listItem.appendChild(posterHover);
  listItem.appendChild(div);

  return listItem;
}
