const addCartButton = document.querySelector(".addToCart_Button");

addCartButton.addEventListener("click", addToCartLbl);

function addToCartLbl() {
  const cartItems = JSON.parse(localStorage.getItem("Cartlist"));
  labelItemCounter.style.display = "inline";
  labelItemCounter.innerHTML = cartItems.length;
}
