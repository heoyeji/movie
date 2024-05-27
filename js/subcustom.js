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

let page = 1;
let filc = "popular";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzU2OGU2MTc2YjY5ZGUxZDY1MDZmZTc0ZWJlOWVkMCIsInN1YiI6IjY2NGQ0MzE3ZDI1MjFhZDVhZTEzZGE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sMbCcOmI7GWaOhYy8b4PpP2HUhVX2aEDudvL7bXoV4k",
  },
};

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
  if (e) {
    filc = e.target.id;
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

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: "Bearer <YOUR_API_KEY>",
//   },
// };

// const filop = document.querySelector(".filopen");
// const fil = document.querySelector("#filter");
// const filout = document.querySelector(".filOff");
// const con = document.querySelector("#container");
// const liston = document.querySelector("#liston");
// const filC = document.querySelectorAll(".filC li");

// let page = 1;
// let filc = "popular";

// // 스크롤 이벤트 핸들러
// window.addEventListener("scroll", function () {
//   let sc = document.documentElement.scrollTop;
//   let scCon = con.offsetTop - 40;

//   if (sc > scCon) {
//     filop.classList.add("scDown");
//     fil.classList.add("scDown");
//   } else {
//     filop.classList.remove("scDown");
//     fil.classList.remove("scDown");
//   }
// });

// // 팝콘 아이콘 클릭시 필터 토글
// filop.addEventListener("click", () => {
//   fil.classList.toggle("on");
//   con.classList.toggle("filon");
// });

// filout.addEventListener("click", () => {
//   fil.classList.remove("on");
//   con.classList.remove("filon");
// });

// // 필터 클릭 이벤트 리스너 등록
// filC.forEach((item) => {
//   item.addEventListener("click", () => {
//     filc = item.id;
//     getMovies();
//     updateActiveFilter(item);
//   });
// });

// // 영화 정보 가져오기
// const getMovies = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${filc}?language=ko-KR&page=${page}`,
//       options
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     displayMovies(data.results);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   }
// };

// // 영화 목록 표시하기
// const displayMovies = (movies) => {
//   let show = "";
//   movies.forEach((movie) => {
//     show += `<li>
//       <div class="posterhover">
//         <h3 class="posttitle">${movie.title}</h3>
//         <p class="postp">${movie.overview}</p>
//         <h4 class="postrate"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
//           1
//         )}점</h4>
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
//       </div>
//       <div>
//         <p><i class="fa-regular fa-heart"></i> 찜하기</p>
//         <p>상세보기</p>
//       </div>
//     </li>`;
//   });
//   liston.innerHTML = show;
// };

// // 활성 필터 업데이트하기
// const updateActiveFilter = (target) => {
//   filC.forEach((item) => {
//     item.classList.remove("on");
//   });
//   target.classList.add("on");
// };

// // 초기 페이지 로딩 시 영화 목록 가져와서 표시하기
// window.addEventListener("load", getMovies);
