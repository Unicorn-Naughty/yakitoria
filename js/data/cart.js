import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}
export function saveToLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addTocart(productId) {
  let matchProd;
  products.forEach((product) => {
    if (product.id === productId) {
      matchProd = product;
    }
  });
  let matchingProd;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingProd = cartItem;
    }
  });
  if (matchingProd) {
    matchingProd.quantity += 1;
    matchingProd.cost += matchProd.cost;
  } else {
    cart.push({
      productId,
      cost: matchProd.cost,
      quantity: 1,
    });
  }
  saveToLocal();
}

export function updateCarQuanity() {
  let cartQuantity = "";
  let cartSummary = "";

  cart.forEach((cartItem) => {
    cartQuantity = Number(cartQuantity) + cartItem.quantity;
    cartSummary = Number(cartSummary) + cartItem.cost;
  });
  if (cartQuantity === "") {
    document.querySelector(".user-nav__cart-quanity").innerHTML = ``;
  } else {
    switch (cartQuantity % 10) {
      case 5:
      case 0:
      case 6:
      case 7:
      case 8:
      case 9:
        document.querySelector(
          ".user-nav__cart-quanity"
        ).innerHTML = `${cartQuantity} товаров`;
        break;
      case 1:
        document.querySelector(
          ".user-nav__cart-quanity"
        ).innerHTML = `${cartQuantity} товар`;
        break;
      case 2:
      case 3:
      case 4:
        document.querySelector(
          ".user-nav__cart-quanity"
        ).innerHTML = `${cartQuantity} товара`;
        break;
    }
    switch (cartQuantity) {
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        document.querySelector(
          ".user-nav__cart-quanity"
        ).innerHTML = `${cartQuantity} товаров`;
        break;
    }
  }
  if (cartSummary === "") {
    document.querySelector(".user-nav__cart-price").innerHTML = ``;
  } else {
    document.querySelector(
      ".user-nav__cart-price"
    ).innerHTML = `${cartSummary} P`;
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  console.log(newCart);
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      // Все кроме того на который мы попали
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  console.log(cart);
  console.log(newCart);
  saveToLocal();
}


