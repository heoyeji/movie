let filop = document.querySelector(".filopen");
let fil = document.querySelector("#filter");
let filout = document.querySelector(".filOff");

let con = document.querySelector("#container");

window.addEventListener("scroll", function () {
  let sc = document.documentElement.scrollTop; //현재 스크롤 위치
  //   console.log(sc);

  let scCon = con.offsetTop - 40; //container 위치

  if (sc > scCon) {
    filop.classList.add("scDown");
    fil.classList.add("scDown");
  } else {
    filop.classList.remove("scDown");
    fil.classList.remove("scDown");
  }
});

// 팝콘 아이콘 클릭시 필터 토글

filop.addEventListener("click", () => {
  fil.classList.add("on");
  con.classList.add("filon");
});

filout.addEventListener("click", () => {
  fil.classList.remove("on");
  con.classList.remove("filon");
});

// api 연결

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzU2OGU2MTc2YjY5ZGUxZDY1MDZmZTc0ZWJlOWVkMCIsInN1YiI6IjY2NGQ0MzE3ZDI1MjFhZDVhZTEzZGE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sMbCcOmI7GWaOhYy8b4PpP2HUhVX2aEDudvL7bXoV4k",
  },
};

const getpopualr = async () => {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=6",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

getpopualr();
