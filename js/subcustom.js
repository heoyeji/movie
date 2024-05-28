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

// 카테고리

let page = 1;
let filc = "popular";
let subtitle = document.querySelector("#subtitle");

const filC = document.querySelectorAll(".filC li");

for (let j = 0; j < filC.length; j++) {
  filC[j].addEventListener("click", (e) => {
    getmovie(e);

    for (k of filC) {
      k.classList.remove("on");
    }

    filC[j].classList.add("on");
  });
}

const getmovie = async (e) => {
  subname = "인기순";

  if (e) {
    filc = e.target.id;

    if (filc == "popular") {
      subname = "인기순";
    } else if (filc == "top_rated") {
      subname = "평점순";
    } else if (filc == "upcoming") {
      subname = "최신순";
    }

    subtitle.textContent = subname;
  }

  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${filc}?language=ko-KR&page=${page}`,
    options
  );

  let data = await response.json();
  let mList = data.results;
  console.log(mList);

  show = "";

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
      <p>상세보기</p>
    </div>
  </li>`;

    document.querySelector("#liston").innerHTML = show;
  }
};

getmovie();
