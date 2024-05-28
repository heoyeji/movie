const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_API_KEY = "f4b8cdacf728c6b2bd25248d6dd6d6a7"; 
const BASE_URL = "https://api.themoviedb.org/3";

app.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  const url = `${BASE_URL}/movie/${movieId}?api_key=${SERVER_API_KEY}`;
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
