const labelItemCounter = document.querySelector("#lblCartCount");

if (typeof JSON.parse(localStorage.getItem("Cartlist")) === "undefined" || JSON.parse(localStorage.getItem("Cartlist")) === null || JSON.parse(localStorage.getItem("Cartlist")).length === 0) {
  labelItemCounter.style.display = "none";
} else {
  const cartItems = JSON.parse(localStorage.getItem("Cartlist"));
  if (cartItems.length === 0 || cartItems === null) {
    labelItemCounter.style.display = "none";
  } else {
    labelItemCounter.innerHTML = cartItems.length;
  }
}
