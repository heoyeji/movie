async function getMovie(movieId) {
  const url = `/movie/${movieId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const movieData = await response.json();
    displayMovie(movieData);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// 나머지 코드는 동일
