function buildProductCard(product) {
  // const htmlCard =
  //         `<div class="card">
  //             <h2 class="title">${product.name}</h2>
  //             <img src=${product.img} style="width:200px;height:200px;>
  //             <p class="descrption" >${product.description }</p>
  //             <p class="price">${product.price}</p>
  //             <input type="button" value="Seleccion">
  //         </div>`

  // return htmlCard;

  const div = document.createElement("div");

  const title = domBuilder.h2(product.name);
  const image = domBuilder.img(product.img);
  const description = domBuilder.p(product.description);
  const price = domBuilder.p(product.price);
  const button = domBuilder.button("Seleccionar", "btnProduct", product.id);

  div.appendChild(title);
  div.appendChild(image);
  div.appendChild(description);
  div.appendChild(price);
  div.appendChild(button);

  return div;
}

function onSelectClick(event) {
  const idProduct = event.target.dataset.id;
  
  selectedProduct = products.find(function(product) {
    if(product.id == idProduct) {
    return product;
    }
  });


  selectedProducts.push(selectedProduct);

  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  
  buildCart();
}

function buildCart() {
  const lastProduct = selectedProducts[selectedProducts.length - 1];
  const card = buildProductCard(lastProduct);
  selectedContainer.appendChild(card);

}
const domBuilder = new DOMBuilder();
let selectedProducts = [];

window.addEventListener("load", function () {
  
  const productContainer = document.getElementById("productContainer");
  const selectedContainer = document.getElementById("selectedContainer");
  const totalProductsContainer = document.getElementById("totalProducts");

  products.forEach(function (product) {
    if (product.aviable) {
      const card = buildProductCard(product);
      productContainer.appendChild(card);
    }
  });

  // Local Storage
  
  const cart = JSON.parse(localStorage.getItem('selectedProducts'));
  if(cart) {
    cart.forEach(function(product) {
      const card = buildProductCard(product);
      selectedContainer.appendChild(card);
    });  
  }

  // DOM
  const btnProducts = document.querySelectorAll('.btnProduct');
  btnProducts.forEach(function(btnProduct) {
      btnProduct.addEventListener('click', onSelectClick);
  })
});
