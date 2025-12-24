import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {cart, loadFromStorage} from '../../data/cart.js';

describe('test suite : renderOrderSummary', ()=>{

    const id = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const id2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    const deliId = "3";

    beforeEach(()=>{
        spyOn(localStorage, "setItem");

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionsId: "1",
                  },
                  {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionsId: "2",
                  },
            ]);
          });
      
          loadFromStorage();

          renderOrderSummary();
    });

    afterEach(()=>{
      document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays the cart', ()=>{

          expect(
            document.querySelectorAll('.js-cart-item-container').length
          ).toEqual(2);

          expect(
            document.querySelector(`.js-product-quantity-${id}`).innerText
          ).toContain('Quantity: 2');

          expect(
            document.querySelector(`.js-product-quantity-${id2}`).innerText
          ).toContain('Quantity: 1');

          expect(
            document.querySelector(`.js-product-name-${id}`).innerText
          ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

          expect(
            document.querySelector(`.js-product-name-${id2}`).innerText
          ).toContain('Intermediate Size Basketball');

          expect(
            document.querySelector(`.js-product-price-${id}`).innerText
          ).toContain('10.90');

          expect(
            document.querySelector(`.js-product-price-${id2}`).innerText
          ).toContain('20.95');

    });

    it('removes a product', ()=>{

          document.querySelector(`.js-delete-link-${id}`).click();

          expect(
            document.querySelectorAll('.js-cart-item-container').length
          ).toEqual(1);

         expect(
            document.querySelector(`.js-cart-item-container-${
                id
              }`)
         ).toEqual(null);

         expect(
            document.querySelector(`.js-cart-item-container-${
                id2
              }`)
         ).not.toEqual(null);

         expect(
            cart.length
         ).toEqual(1);

         expect(
            cart[0].productId
         ).toEqual(id2);
    });

    it('updates the delivery option', ()=>{
      document.querySelector(`.js-delivery-${id}-${deliId}`).click();

      expect(document.querySelector(`.input-${id}-${deliId}`).checked).toEqual(true);

      expect(cart.length).toEqual(2);

      expect(cart[0].productId).toEqual(id);

      expect(cart[0].deliveryOptionsId).toEqual('3');

      expect(document.querySelector('.js-shipping-payment').innerText).toEqual('$14.98');

      expect(document.querySelector('.js-total-payement').innerText).toEqual('$63.50');
    })
});