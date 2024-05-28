const apiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const language = "ko-KR";

// modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalOverview = document.getElementById("modal-overview");
const modalRate = document.getElementById("modal-rate");
const span = document.getElementsByClassName("close")[0];

// modal close
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 인기순
fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`
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
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=${language}`
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
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${language}`
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

  // 찜하기 하트 이모티콘 이벤트
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

  div.appendChild(likeButton);

  const detailButton = document.createElement("p");
  detailButton.innerHTML = `<a href="#" class="detail-btn" data-id="${movie.id}">상세보기</a>`;
  div.appendChild(detailButton);

  listItem.appendChild(posterHover);
  listItem.appendChild(div);

  return listItem;
}

// 상세보기(modalBox)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("detail-btn")) {
    event.preventDefault();
    const movieId = event.target.dataset.id;

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 상태가 좋지 않습니다.");
        }
        return response.json();
      })
      .then((movie) => {
        // 영화의 개봉일, 장르 정보
        const genreNames = movie.genres.map((genre) => genre.name).join(", ");

        // 개봉일 포멧
        const releaseDate = new Date(movie.release_date);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const formattedReleaseDate = `${releaseDate.getDate()} ${
          monthNames[releaseDate.getMonth()]
        } ${releaseDate.getFullYear()}`;

        // 러닝타임
        const runtime = movie.runtime;
        const formattedRuntime = `${runtime}분`;
        document.getElementById("modal-runtime").textContent = formattedRuntime;

        // modal에 정보표시
        modalTitle.textContent = movie.title;
        modalImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        modalOverview.textContent = movie.overview;
        modalRate.textContent = movie.vote_average.toFixed(1);
        document.getElementById("modal-genre").textContent = genreNames;
        document.getElementById("modal-release-date").textContent =
          formattedReleaseDate;
        modal.style.display = "block";
      });
  }
});
