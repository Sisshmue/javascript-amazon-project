import { deliveryOptions } from "./deliveryOptions.js"; 

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ?? [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionsId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionsId: "1",
        },
      ];
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addtoCart(productId, selectorElementValue) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += Number(selectorElementValue);
      } else {
        this.cartItems.push({
          productId,
          quantity: Number(selectorElementValue),
          deliveryOptionsId: "1",
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId != productId) {
          newCart.push(cartItem);
        }
      });

      cart = newCart;
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let checkoutItem = 0;
      this.cartItems.forEach((cartItem) => {
        checkoutItem += Number(cartItem.quantity);
      });

      const checkoutElement = document.querySelector(
        ".js-checkout-cart-quantity"
      );
      if (checkoutElement) {
        checkoutElement.innerHTML = `${checkoutItem} items`;
      }

      const cartElement = document.querySelector(".js-cart-quantity");
      if (cartElement) {
        cartElement.innerHTML = `${checkoutItem}`;
      }
    },

    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId == productId) {
          cartItem.quantity = newQuantity;
        }
      });
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        let matchingDeliId;
        deliveryOptions.forEach((deliItem) => {
          if (deliveryOptionId === deliItem.id) {
            matchingDeliId = deliveryOptionId;
          }
        });

        if (matchingDeliId) {
          matchingItem.deliveryOptionsId = deliveryOptionId;
          this.saveToStorage();
        } else {
          return;
        }
      } else {
        return;
      }
    },
  };

  return cart;
}

const cart = Cart();
const businessCart = Cart();

cart.loadFromStorage('cart-oop');
businessCart.loadFromStorage('cart-business');

cart.addtoCart('54e0eccd-8f36-462b-b68a-8182611d9add', 1);

console.log(cart);
console.log(businessCart);