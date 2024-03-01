import { cart, saveToLocal, removeFromCart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { additonalprod } from "../data/cartpagedata/addtional.js";
import { recprod } from "../data/cartpagedata/recprod.js";
let cartpageHTML = "";

cart.forEach((cartItem) => {
  const { productId } = cartItem;
  let matchProd;
  products.forEach((product) => {
    if (product.id === productId) {
      matchProd = product;
    }
  });
  cartpageHTML += `
                <div class="cartpage__item cartpage__item-${productId}">
                <div class="cartpage__item-boximg">
                  <img
                    class="cartpage__item-img"
                    src="${matchProd.image}"
                    alt="img-logo"
                  />
                  <h5 class="main__item-title cartpage__item-title">${matchProd.name}</h5>
                </div>

                <div class="counter">
                  <button class="btn-minus">-</button>
                  <input
                    class="counter__input data-product-id-${productId}"
                    type="text"
                    value="${cartItem.quantity}"
                    readonly
                  />
                  <button class="btn-plus btn-plus-incr" data-product-id="${matchProd.id}">+</button>
                </div>
                <div class="cartpage__item-price">${matchProd.cost}P</div>
                <button class="cancle" data-product-id="${matchProd.id}" >x</button>
              </div>
  
  `;
  document.querySelector(".cartpage__items").innerHTML = cartpageHTML;
});
document.querySelectorAll(".cancle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;
    removeFromCart(productId);

    const x = document.querySelector(`.cartpage__item-${productId}`);
    x.remove();
  });
});

let recprodHTML = "";
recprod.forEach((recprod) => {
  recprodHTML += `
                  <div class="cartpage__recommend-item recommend__item">
                  <img
                    class="recommend__item-img"
                    src="${recprod.image}"
                    alt="rec pics"
                  />
                  <p class="recommend__item-text">
                    ${recprod.name}
                  </p>
                  <div class="counter">
                    <button class="btn-minus">-</button>
                    <input
                      class="counter__input  data-product-id-${recprod.id}"
                      type="text"
                      value="0"
                      readonly
                    />
                    <button class="btn-plus btn-plus-rec"  data-product-id="${recprod.id}">+</button>
                  </div>
                </div>
  
  `;
  document.querySelector(".cartpage__recommend-items-box").innerHTML =
    recprodHTML;
});

let additonalProd = "";
additonalprod.forEach((addItem) => {
  additonalProd += `
                <li class="additional__item">
                  <img
                    class="additional__item-img"
                    src="${addItem.image}"
                    alt="additional pics"
                  />
                  <p class="additional__item-text">${addItem.name}</p>
                  <div class="counter">
                    <button class="btn-minus">-</button>
                    <input
                      class="counter__input"
                      type="text"
                      value="0"
                      readonly
                    />
                    <button class="btn-plus " >+</button>
                  </div>
                  <p class="additional__item-subtext">Бесплатно</p>
                </li>
  `;
  document.querySelector(".additional__list").innerHTML = additonalProd;
});

document.querySelectorAll(".btn-plus").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let checkClick = e.target;
    if (checkClick.classList.contains("btn-plus-incr")) {
      const { productId } = btn.dataset;
      incr1(productId);
      saveToLocal();
      console.log(cart);
    }
    if (checkClick.classList.contains("btn-plus-rec")) {
      const { productId } = btn.dataset;
      recprod.forEach((recItem) => {
        if (recItem.id === productId) {
          let matchProdObj;
          cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
              matchProdObj = cartItem;
            }
          });
          if (matchProdObj) {
            matchProdObj.quantity += 1;
            matchProdObj.cost += recItem.cost;
          } else {
            cart.push({
              quantity: 1,
              cost: Number(`${recItem.cost}`),
              productId: `${recItem.id}`,
            });
          }
        }
      });
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          let x = document.querySelector(`.data-product-id-${productId}`);
          x.value = cartItem.quantity;
        }
      });
    }
    console.log(cart);
  });
});

function incr1(productId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity += 1;
      let x = document.querySelector(`.data-product-id-${productId}`);
      x.value = cartItem.quantity;
    }
  });
}
