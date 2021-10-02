//Page sliding
const slidePage = document.querySelector(".slidePage");

const firstNextBtn = document.querySelector(".next-0");

const secondPrevBtn = document.querySelector(".prev-1");
const secondNextBtn = document.querySelector(".next-1");

const thirdPrevBtn = document.querySelector(".prev-2");
const thirdNextBtn = document.querySelector(".next-2");

const completedBtn = document.querySelector(".next-3");

firstNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-25%";
});

secondNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-50%";
});
secondPrevBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "0%";
});

thirdNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-75%";
});
thirdPrevBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-25%";
});

//Cart

const cartItems = JSON.parse(localStorage.getItem("Cartlist"));
const cartOverview = document.querySelector(".cartPage");
const cartSum = document.querySelector(".sum");

if (cartItems === null) {
  const button = document.querySelector(".nextBtn");
  cartOverview.innerHTML += `<p>No items in the cart</p>`;
  button.innerHTML = `<button disabled>Next</button>`;
}

//Array with unique items
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let cartItemsUniqueArray = cartItems.filter(onlyUnique);

// Gather info from API and place it in HTML

async function getProducts(url) {
  cartOverview.innerHTML = `
  <div class="cart-headings">
    <div></div>
    <div>Product</div>
    <div>Amount</div>
    <div>Price</div>
    </div>
  `;
  let cartItemsUniqueArray = cartItems.filter(onlyUnique);
  const response = await fetch(url);
  const products = await response.json();

  let sum = 0;
  products.forEach(function (product) {
    for (let i = 0; i < cartItemsUniqueArray.length; i++) {
      if (cartItemsUniqueArray[i] === product.id) {
        let count = 0;

        for (let n = 0; n < cartItems.length; n++) {
          if (cartItems[n] === cartItemsUniqueArray[i]) {
            count++;
          }
        }

        cartOverview.innerHTML += `
        <div class="cart-itemContent cart-itemContent-men">
          <div class="imageCart" style ="background-image: url(${product.images[0].src})" ></div>
          <div class="itemName">${product.name}</div>
          <div class="amount">
            <div class="minus minusMen ${product.id}"> - </div>
            <div class="middle middleMen">${count}</div>
            <div class="plus plusMen ${product.id}"> + </div>
          </div>
          <div class="totalPrice totalPriceMen">Kr ${product.prices.price * count}</div>
        </div>`;
        // sum price with amount
        sum += product.prices.price * count;
        cartSum.innerHTML = `
          <div></div>
          <div></div>
          <div class="totalPrice">Sum</div>
          <div class="totalPrice sumPrice">Kr ${sum}</div>
        `;
      }
    }
  });
}
getProducts("https://rainydays.thefed.no/wp-json/wc/store/products/");

// If adjusting amount
cartOverview.addEventListener("click", amountReduction);

function amountReduction(event) {
  if (event.target.classList.contains("minus")) {
    for (let i = 0; i < cartItems.length; i++) {
      if (event.target.classList.contains(cartItems[i])) {
        cartItems.splice(i, 1);

        localStorage.setItem("Cartlist", JSON.stringify(cartItems));
        break;
      }
    }

    getProducts("https://rainydays.thefed.no/wp-json/wc/store/products/");
  }
  if (event.target.classList.contains("plus")) {
    for (let i = 0; i < cartItems.length; i++) {
      if (event.target.classList.contains(cartItems[i])) {
        cartItems.push(cartItems[i]);

        localStorage.setItem("Cartlist", JSON.stringify(cartItems));
        break;
      }
    }
    getProducts("https://rainydays.thefed.no/wp-json/wc/store/products/");
  }
}

if (cartItems.length !== 0 || !cartItems === null) {
  firstNextBtn.disabled = false;
}

cartOverview.addEventListener("click", labelItemAdjust);

function labelItemAdjust(event) {
  if (event.target.classList.contains("minus")) {
    labelItemCounter.innerHTML = cartItems.length;
  }
  if (event.target.classList.contains("plus")) {
    labelItemCounter.innerHTML = cartItems.length;
  }
}

//Shipping Details

const form = document.querySelector("#shippingForm");

const name = document.querySelector("#fullName");
const nameError = document.querySelector("#fullNameError");

const street = document.querySelector("#street");
const streetError = document.querySelector("#streetError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

form.addEventListener("click", controlInput);
form.addEventListener("keyup", controlInput);

function controlInput(event) {
  if (event.target.id == "fullName" || event.target.id === "email" || event.target.id === "street" || event.target.id === "postalCode") {
    let id = event.target.id;
    let target = document.getElementById(event.target.id);
    let error = document.getElementById(`${id}Error`);
    target.onblur = function blur() {
      if (id === "fullName" || id === "street") {
        if (checkLength(target.value, 0) && (id === "fullName" || id === "street")) {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      } else if (id === "email") {
        if (checkEmail(email.value)) {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      } else {
        if (checkPostal(postalCode.value)) {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      }
    };
    target.onfocus = function focus() {
      target.style.borderColor = "";
      error.style.display = "none";
    };
  }
  controlForm();
}

function controlForm() {
  if (checkLength(fullName.value, 0) && checkLength(street.value, 0) && checkPostal(postalCode.value) && checkEmail(email.value)) {
    secondNextBtn.disabled = false;
  } else {
    secondNextBtn.disabled = true;
  }
}

function checkLength(value, length) {
  if (value.trim().length > length) {
    return true;
  } else {
    return false;
  }
}

function checkPostal(postalCode) {
  const regularExpression = /\b\d{4}\b/;
  const matchExpressionString = regularExpression.test(postalCode);

  return matchExpressionString;
}
function checkEmail(email) {
  const regularExpression = /\S+@\S+\.\S+/;
  const matchExpressionString = regularExpression.test(email);
  return matchExpressionString;
}

//Payment Details

const paymentForm = document.querySelector("#paymentForm");

const cardNumber = document.querySelector("#cardNumber");
const cardNumberError = document.querySelector("#cardNumberError");

const expiration = document.querySelector("#expiration");
const expirationError = document.querySelector("#expirationError");

const securityCode = document.querySelector("#securityCode");
const securityCodeError = document.querySelector("#securityCodeError");

paymentForm.addEventListener("click", controlPaymentInput);
paymentForm.addEventListener("keyup", controlPaymentInput);

function controlPaymentInput(event) {
  if (event.target.id == "cardNumber" || event.target.id === "expiration" || event.target.id === "securityCode") {
    let id = event.target.id;
    let target = document.getElementById(event.target.id);
    let error = document.getElementById(`${id}Error`);
    target.onblur = function blur() {
      if (id === "cardNumber") {
        target.value = target.value.replace(/(\d{4}(?!\s))/g, "$1 ");
        if (checkCardNumberLength(target.value, 19) && id === "cardNumber") {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      } else if (id === "expiration") {
        if (checkCardExp(target.value) && id === "expiration") {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      } else {
        if (checkCvcNumber(target.value) && id === "securityCode") {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      }
    };
    target.onfocus = function focus() {
      target.style.borderColor = "";
      error.style.display = "none";
    };
  }
  controlFormPayment();
}

function controlFormPayment() {
  if (checkCardNumberLength(cardNumber.value, 19) && checkCardExp(expiration.value) && checkCvcNumber(securityCode.value)) {
    thirdNextBtn.disabled = false;
  } else {
    thirdNextBtn.disabled = true;
  }
}

function checkCardNumberLength(value, length) {
  if (value.trim().length === length) {
    return true;
  } else {
    return false;
  }
}

function checkCardExp(cardInfo) {
  const regularExpression = /^\d{2}-\d{2}$/;
  const matchExpressionString = regularExpression.test(cardInfo);
  return matchExpressionString;
}

function checkCvcNumber(cardInfo) {
  const regularExpression = /\b\d{3}\b/;
  const matchExpressionString = regularExpression.test(cardInfo);
  return matchExpressionString;
}

//Checkout
completedBtn.addEventListener("click", function () {
  localStorage.clear("Clear");
});
