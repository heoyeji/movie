// $(window).on("scroll", function () {
//   let sc = $(this).scrollTop();
//   let scCon = $("#container").offset().top;
//   if (sc > scCon) {
//     $(".filopen").addClass("scDown");
//     $("#filter").addClass("scDown");
//   }
// });

let filop = document.querySelector(".filopen");
let fil = document.querySelector("#filter");

window.addEventListener("scroll", function () {
  let sc = document.documentElement.scrollTop; //현재 스크롤 위치
  //   console.log(sc);
  let scCon = document.querySelector("#container").scrollTop;
  console.log(scCon);

  if (sc > scCon) {
    filop.classList.add("scDown");
    fil.classList.add("scDown");
  }
});
