import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions , getDeliverOption, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const delioptionId = cartItem.deliveryOptionsId;

    const deliverOption = getDeliverOption(delioptionId);
    

    const dateString = calculateDeliveryDate(deliverOption);

    cartSummaryHtml += `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${
          matchingProduct.id
        }">
            <div class="delivery-date">
                ${dateString}
            </div>
  
            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">
  
            <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                js-product-quantity-${matchingProduct.id}
                ">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label">${
                          cartItem.quantity
                        }</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                      matchingProduct.id
                    }">
                        Update
                    </span>
                    <input class='quantity-input js-quantity-input' type="number">
                    <span class='save-quantity-link link-primary' data-product-id="${
                      matchingProduct.id
                    }">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${
                      matchingProduct.id
                    }">
                        Delete
                    </span>
                </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              ${deliverOptionHtml(matchingProduct, cartItem)}
            </div>
        </div>
      </div>
        `;
  });

  function deliverOptionHtml(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliOption) => {

      const dateString = calculateDeliveryDate(deliOption);

      const priceString =
        deliOption.priceCents === 0
          ? "Free"
          : `${formatCurrency(deliOption.priceCents)}`;

      const isChecked = deliOption.id === cartItem.deliveryOptionsId;

      html += `
        <div class="delivery-option js-delivery-options js-delivery-${matchingProduct.id}-${deliOption.id}" data-product-id="${
          matchingProduct.id
        }" data-delivery-option-id="${deliOption.id}">
          <input type="radio"
          ${isChecked ? "checked" : ""}
            class="delivery-option-input input-${matchingProduct.id}-${deliOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                $${priceString} - Shipping
            </div>
          </div>
        </div>
        `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  calculateCartQuantity();

  document.querySelectorAll(".js-delete-link").forEach((link) =>
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      calculateCartQuantity();

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      renderPaymentSummary();
    })
  );

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
      const newValue = Number(container.querySelector(".quantity-input").value);

      if (newValue <= 0 || newValue >= 1000) {
        alert("Value needs to be between 0 and 1000");
        return;
      }

      updateQuantity(productId, newValue);

      const cartItemQuantity = container.querySelector(".js-quantity-label");
      cartItemQuantity.innerHTML = newValue;

      calculateCartQuantity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-quantity-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const container = input.closest(".cart-item-container");
        const saveLink = container.querySelector(".save-quantity-link");
        saveLink.click();
      }
    });
  });

  document.querySelectorAll(".js-delivery-options").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
