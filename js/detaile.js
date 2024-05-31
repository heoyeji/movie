const ApiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const Language = "ko-KR";

// 모달 요소
const movieModal = document.querySelector("#movieModal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalOverview = document.getElementById("modal-overview");
const modalRate = document.getElementById("modal-rate");
const span = document.querySelector("#mclose");

// 모달 닫기
span.onclick = function () {
  movieModal.style.display = "none";
};

// 상세보기(modalBox)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("detail-btn")) {
    event.preventDefault();
    const movieId = event.target.dataset.id;
    if (!movieId) {
      console.error("올바른 영화 ID가 없습니다.");
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ApiKey}&language=${Language}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 상태가 좋지 않습니다.");
        }
        return response.json();
      })
      .then((movie) => {
        const genreNames = movie.genres
          .map((genre) => genre.name)
          .join(",        ");

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

        const runtime = movie.runtime;
        const formattedRuntime = `${runtime}분`;
        document.getElementById("modal-runtime").textContent = formattedRuntime;

        modalTitle.textContent = movie.title;
        modalImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        modalOverview.textContent = movie.overview;
        modalRate.textContent = movie.vote_average.toFixed(1);
        document.getElementById("modal-genre").textContent = genreNames;
        document.getElementById("modal-release-date").textContent =
          formattedReleaseDate;
        movieModal.style.display = "block";
      })
      .catch((error) => {
        console.error("상세보기 오류 발생:", error);
      });
  }
});
