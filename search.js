const apiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const language = "ko-KR";

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const query = getQueryParameter("query");
if (query) {
  searchMovies(query);
}

function searchMovies(query) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${encodeURIComponent(
      query
    )}`
  );
 
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 상태가 좋지 않습니다.");
      }
      return response.json();
    })
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; // 기존 결과 제거

      data.results.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        if (movie.poster_path) {
          const poster = document.createElement("img");
          poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
          poster.alt = `${movie.title} 포스터`;
          movieDiv.appendChild(poster);
        }

        const detailsDiv = document.createElement("div");

        const title = document.createElement("h2");
        title.textContent = `${movie.title} (${
          movie.release_date
            ? movie.release_date.split("-")[0]
            : "개봉일 정보 없음"
        })`;

        const rating = document.createElement("p");
        rating.textContent = `평점: ${movie.vote_average} / 10`;

        const overview = document.createElement("p");
        overview.textContent = movie.overview
          ? movie.overview
          : "줄거리 정보 없음";

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(rating);
        detailsDiv.appendChild(overview);
        movieDiv.appendChild(detailsDiv);

        resultsDiv.appendChild(movieDiv);
      });
    })
    .catch((error) => {
      console.error("검색 오류 발생:", error);
    });
}

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  if (query.trim()) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = document.getElementById("searchInput").value;
    if (query.trim()) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }
});
