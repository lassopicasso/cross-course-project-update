const thumbnails = document.getElementsByClassName("thumbnail");
const activeImage = document.getElementsByClassName("activeImg");

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", function () {
    if (activeImage.length > 0) {
      activeImage[0].classList.remove("activeImg");
    }
    thumbnails[i].classList.add("activeImg");
    document.getElementById("featured").src = activeImage[0].src;
  });
}
