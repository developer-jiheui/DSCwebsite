const stick = document.getElementById("stick");
let scrolled = false;

window.onscroll = () => {
  if (window.pageYOffset > 100) {
    // stick.classList.remove("top");
    if (!scrolled) {
      stick.style.transform = "translateY(-70px)";
    }
    setTimeout(() => {
      stick.style.transform = "translateY(0px)";
      scrolled = true;
    }, 200);
  } else {
    // stick.classList.add("top");
    scrolled = false;
  }
};

$("#stick a, .btn").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();
    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
  }
});
