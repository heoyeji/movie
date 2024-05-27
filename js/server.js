const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "YOUR_TMDB_API_KEY"; // 여기에 발급받은 API 키를 입력하세요.
const BASE_URL = "https://api.themoviedb.org/3";

app.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }
    const movieData = await response.json();
    res.json(movieData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
