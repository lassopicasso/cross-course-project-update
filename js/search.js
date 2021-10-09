const searchInput = document.querySelector("#search");

// searchInput.addEventListener("keyup", checkInput);

let titles = [];
let products = [];

async function getTitles(url) {
  const response = await fetch(url);
  products = await response.json();
  for (let i = 0; i < products.length; i++) {
    titles.push(products[i].name);
  }
}

getTitles("https://rainydays.thefed.no/wp-json/wc/store/products");

function autocompleteMatch(input) {
  if (input === "") {
    return [];
  }
  input = input.toLowerCase();
  return titles.filter(function (title) {
    let lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.match(input)) {
      return title;
    }
  });
}

const res = document.getElementById("result");
searchInput.addEventListener("keyup", showResults);

function showResults(event) {
  res.innerHTML = "";
  let list = "";
  if (event.target.value.length === 0) {
    res.style.display = "none";
  } else {
    let terms = autocompleteMatch(event.target.value);
    if (terms.length === 0) {
      res.style.display = "block";
      list += `<li>No products found</li>`;
    }
    for (let i = 0; i < terms.length; i++) {
      for (let k = 0; k < products.length; k++) {
        if (terms[i] === products[k].name) {
          res.style.display = "block";
          if (window.location.href.indexOf("products") > -1) {
            list += `<li><a href="product-specific.html?id=${products[k].id}">${terms[i]}</a></li>`;
          } else {
            list += `<li><a href="products/product-specific.html?id=${products[k].id}">${terms[i]}</a></li>`;
          }
        }
      }
    }
  }
  res.innerHTML = `<ul> ${list}</ul>`;
}
