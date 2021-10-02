const new_products = document.querySelector(".new_products");
const popular_products = document.querySelector(".popular_products");
const newProductsButton = document.querySelector(".newProductsLink");
const popularProductsButton = document.querySelector(".popularProductsLink");

let productsArray = [];
let menNewArray = [];
let menPopularArray = [];

async function getProducts(url) {
  const response = await fetch(url);
  const products = await response.json();

  products.forEach(function (product) {
    productsArray.push(product);

    for (let i = 0; i < product.categories.length; i++) {
      if (product.categories[i].slug === "new-men") {
        menNewArray.push(product);
      }
      if (product.categories[i].slug === "popular-men") {
        menPopularArray.push(product);
      }
    }

    createHTML(menNewArray, new_products);
    createHTML(menPopularArray, popular_products);
  });
}

newProductsButton.onclick = function () {
  document.querySelector(".popularProd").style.display = "none";
  document.querySelector(".newProd h2").innerHTML = `<a href="men.html">Men <i
  class="fas fa-chevron-right fa-sm"></i></a><span style="color:#8c7604;"> New products</span>`;
};

popularProductsButton.onclick = function () {
  document.querySelector(".newProd").style.display = "none";
  document.querySelector(".popularProd h2").innerHTML = `<a href="men.html">Men <i
  class="fas fa-chevron-right fa-sm"></i></a><span style="color:#8c7604;"> Popular products</span>`;
};

getProducts("https://rainydays.thefed.no/wp-json/wc/store/products");

function createHTML(array, container) {
  container.innerHTML = "";
  array.forEach(function (product) {
    container.innerHTML += `
      <div class="product_overview_content product_overview_contentTest">
        <div class="woman_imgTest">
        <a href="product-specific.html?id=${product.id}" class="women_specific">
          <img src="${product.images[0].src}">
        </a>
        </div>
        <div>
        <a href="product-specific.html?id=${product.id}" class="women_specific">
            <h3>${product.name}</h3>
          </a>
            <p>${product.prices.price} kr</p>
        </div>
      </div>`;
  });
}
