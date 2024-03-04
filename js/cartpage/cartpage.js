import { cart, saveToLocal, removeFromCart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { additonalprod } from "../data/cartpagedata/addtional.js";
import { recprod } from "../data/cartpagedata/recprod.js";
function updatePage() {
  let cartpageHTML = "";
  let recCart = JSON.parse(localStorage.getItem("recCart"));
  if (!recCart) {
    recCart = [];
  }
  let addCart = [];
  cart.forEach((cartItem) => {
    let matchProd;
    const { productId } = cartItem;
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
                    <h5 class="main__item-title cartpage__item-title">${
                      matchProd.name
                    }</h5>
                  </div>
  
                  <div class="counter">
                    <button class="btn-minus" data-product-id="${
                      matchProd.id
                    }" >-</button>
                    <input
                      class="counter__input data-product-id-${productId}"
                      type="text"
                      value="${cartItem.quantity}"
                      readonly
                    />
                    <button class="btn-plus btn-plus-incr" data-product-id="${
                      matchProd.id
                    }">+</button>
                  </div>
                  <div class="cartpage__item-price">${
                    matchProd.cost * cartItem.quantity
                  }P</div>
                  <button class="cancle" data-product-id="${
                    matchProd.id
                  }" >x</button>
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
                      <button class="btn-minus" data-product-id="${recprod.id}">-</button>
                      <input
                        class="counter__input  data-product-id-${recprod.id}"
                        type="text"
                        value="${recprod.quantity}"
                        readonly
                      />
                      <button class="btn-plus btn-plus-rec"  data-products-id="${recprod.id}">+</button>
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
                      <button class="btn-minus" data-product-id="${addItem.id}"  >-</button>
                      <input
                        class="counter__input data-product-id-${addItem.id}"
                        type="text"
                        value="${addItem.quantity}"
                        readonly
                      />
                      <button class="btn-plus btn-plus-add"  data-productes-id="${addItem.id}" >+</button>
                    </div>
                    <p class="additional__item-subtext">Бесплатно</p>
                  </li>
    `;
    document.querySelector(".additional__list").innerHTML = additonalProd;
  });
  document.querySelectorAll(".btn-plus-incr").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity += 1;
          console.log(cartItem);
        }
      });
      saveToLocal();
      updatePage();
    });
  });
  let totalSum = 0;
  function clacTotal() {
    cart.forEach((cartItem) => {
      totalSum += cartItem.cost * cartItem.quantity;
    });
    return totalSum;
  }

  document.querySelectorAll(".btn-plus-rec").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productsId } = btn.dataset;
      recprod.forEach((recprodItem) => {
        if (productsId === recprodItem.id) {
          recprodItem.quantity += 1;
        }
        if (recprodItem.quantity >= 1) {
          recCart.push({
            quantity: recprodItem.quantity,
            cost: recprodItem.cost,
            id: recprodItem.id,
          });
        }
      });
      saveLocalRec();
      updatePage();
    });
  });

  document.querySelectorAll(".btn-plus-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productesId } = btn.dataset;
      additonalprod.forEach((addItem) => {
        if (productesId === addItem.id) {
          addItem.quantity += 1;
        }
        if (addItem.quantity >= 1) {
          addCart.push({
            quantity: addItem.quantity,
            cost: addItem.cost,
            id: addItem.id,
          });
        }
      });
      console.log(addCart);
      saveLocalAdd();
      updatePage();
    });
  });

  clacTotal();

  document.querySelector(
    ".cartpage__sum"
  ).innerHTML = `Сумма вашего заказа: ${totalSum} ₽`;

  function saveLocalRec() {
    localStorage.setItem("reccart", JSON.stringify(recCart));
  }
  function saveLocalAdd() {
    localStorage.setItem("addCart", JSON.stringify(addCart));
  }
}
updatePage();
