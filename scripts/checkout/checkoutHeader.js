import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    calculateCartQuantity();
    let checkoutHeaderHtml = `
        Checkout (<a class="return-to-home-link js-checkout-cart-quantity"
        href="amazon.html"></a>)
    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHtml;
}