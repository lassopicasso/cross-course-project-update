const new_products = document.querySelector(".new_products");
const popular_products = document.querySelector(".popular_products");

async function getProducts(url) {
  const response = await fetch(url);
  const products = await response.json();
  console.log(products);
  new_products.innerHTML = "";
  popular_products.innerHTML = "";
  products.forEach(function (product) {
    console.log(product);
    for (let i = 0; i < product.categories.length; i++) {
      if (product.categories[i].name === "New") {
        category = new_products;
        createHTML(category, product);
      } else if (product.categories[i].name === "Popular") {
        category = popular_products;
        createHTML(category, product);
      }
    }
  });
}
getProducts("https://thefed.no/rainydays-v2/wp-json/wc/store/products");

function createHTML(category, product) {
  category.innerHTML += `
  <div class="product_overview_content">
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
