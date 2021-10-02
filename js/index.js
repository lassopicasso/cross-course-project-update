const new_products = document.querySelector(".new_products");
const popular_products = document.querySelector(".popular_products");

async function getProducts(url) {
  const response = await fetch(url);

  const products = await response.json();

  new_products.innerHTML = "";
  popular_products.innerHTML = "";
  products.forEach(function (product) {
    for (let i = 0; i < product.categories.length; i++) {
      if (product.categories[i].name === "New") {
        new_products.innerHTML += `
        <div class="product_overview_content product_overview_contentTest">
          <div class="woman_imgTest">
          <a href="products/product-specific.html?id=${product.id}" class="women_specific">
            <img src="${product.images[0].src}">
          </a>
          </div>
          <div>
          <a href="products/product-specific.html?id=${product.id}" class="women_specific">
             <h3>${product.name}</h3>
            </a>
             <p>${product.prices.price} kr</p>
          </div>
        </div>`;
      }
      if (product.categories[i].name === "Popular") {
        popular_products.innerHTML += `
        <div class="product_overview_content product_overview_contentTest">
          <div class="woman_imgTest">
          <a href="products/product-specific.html?id=${product.id}" class="women_specific">
            <img src="${product.images[0].src}">
          </a>
          </div>
          <div>
          <a href="products/product-specific.html?id=${product.id}" class="women_specific">
             <h3>${product.name}</h3>
            </a>
             <p>${product.prices.price} kr</p>
          </div>
        </div>`;
      }
    }
  });
}

getProducts("https://rainydays.thefed.no/wp-json/wc/store/products");
