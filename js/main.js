import { products } from "./data/products.js";
import { cart, addTocart, updateCarQuanity, saveToLocal } from "./data/cart.js";

let productAll = "";
products.forEach((product) => {
  productAll += `
            <a class="main__item-link " href="#"   >
              <div class="main__item main__item-${product.id}"">
                <div class="main__item-picbox">
                 <span class="quanity-check quanity-check-${product.id}"></span>
                  <img
                    class="main__item-pics"
                    src="${product.image}"
                    alt="item-pics"
                  />
                </div>
                <div class="main__item-infobox">
                  <h5 class="main__item-title">${product.name}</h5>
                  <span class="main__item-weight">${product.weight}g</span>
                  <div class="main__item-info">
                    <p class="main__item-cost">${product.cost}Р</p>
                    <button class="main__item-btn   main__item-btn-${product.id} " data-product-id="${product.id}">Заказать</button>
                  </div>
                </div>
              </div>
            </a>
            `;
});
document.querySelector(".main__items").innerHTML = productAll;

document.querySelectorAll(".main__item-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const { productId } = btn.dataset;
    addTocart(productId);
    updateCarQuanity();
    addedMess(productId);
    console.log(cart);
  });
});

function addedMess(productId) {
  cart.forEach((cartItem) => {
    const x = document.querySelectorAll(`.quanity-check-${productId}`);
    x.forEach((elem) => {
      if (cartItem.productId === productId) {
        elem.style.opacity = 1;
        elem.innerHTML = cartItem.quantity;
      }
    });
  });
}
updateCarQuanity();
