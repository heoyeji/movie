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

// 카테고리 선택
let hmenu = document.querySelectorAll(".hmenu li");
let subtitle = document.querySelector("#subtitle");
const filC = document.querySelectorAll(".filC li");

let page = 1;
let cID = "popular";
let gID = "";

for (let i = 0; i < filC.length; i++) {
  filC[i].addEventListener("click", (e) => {
    getmovie(e);

    for (j of filC) {
      j.classList.remove("on");
    }

    filC[i].classList.add("on");

    for (j of hmenu) {
      j.classList.remove("on");
    }

    hmenu[i].classList.add("on");
  });
}

// 영화 출력
const getmovie = async (e, g) => {
  // 카테고리 선택(제목 바꾸기)
  subname = `인기순`;
  subtitle.innerHTML = subname;

  if (e) {
    cID = e.target.id;

    if (cID == "popular") {
      subname = `인기순`;
    } else if (cID == "top_rated") {
      subname = `평점순`;
    } else if (cID == "upcoming") {
      subname = `최신순`;
    }

    subtitle.textContent = subname;
  }

  // 영화 api
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${cID}?language=ko-KR&page=${page}
    `,
    options
  );

  let data = await response.json();

  let mList = data.results;
  console.log(mList);

  let show = "";

  for (let i = 0; i < mList.length; i++) {
    show += `<li>
    <div class="posterhover">
      <h3 class="posttitle">${mList[i].title}</h3>
      <p class="postp">${mList[i].overview}</p>
      <h4 class="postrate"><i class="fa-solid fa-star"></i> ${mList[
        i
      ].vote_average.toFixed(1)}점</h4>
      <img src="https://image.tmdb.org/t/p/w500${mList[i].poster_path}" />
    </div>
    <div>
      <p><i class="fa-regular fa-heart"></i> 찜하기</p>
      <p><a href="#" class="detail-btn" data-id="${
        mList[i].id
      }">상세보기</a></p>
    </div>
  </li>`;
  }

  document.querySelector("#liston").innerHTML = show;
};

getmovie();

// 장르

let filG = document.querySelector(".filG");
let gtitle = document.querySelector(".gtitle");

const getgenres = async () => {
  let load = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=ko-KR",
    options
  );

  let datag = await load.json();
  let gList = datag.genres;

  // 장르 목록 입력

  let loadgname = "";

  for (let i = 0; i < gList.length; i++) {
    loadgname += `<li id="${gList[i].id}">${gList[i].name}</li>`;
  }

  filG.innerHTML = loadgname;

  // 장르 선택
  let genre = document.querySelectorAll(".filG li");
  let gname = "";

  for (let i = 0; i < genre.length; i++) {
    genre[i].addEventListener("click", (g) => {
      getmovie(g);

      for (j of genre) {
        j.classList.remove("on");
      }
      genre[i].classList.add("on");

      gname = gList[i].name;
    });
  }
};

getgenres();
