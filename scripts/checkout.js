import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage() {
  try {
    /*
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // loadCart(() => {
      //   //reject('error 3')
      //   resolve();
      // });

      loadCartFetch(() => {
        resolve();
      });
    });
    */

    await Promise.all([
      loadProductsFetch(),
      new Promise((resolve) => {
        loadCartFetch(() => {
          resolve();
        });
      }),
    ]).then(() => {
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  } catch (error) {
    console.log("Error : please try again later!");
  }
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((value) => {
  console.log(value);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

*/

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value1");
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
