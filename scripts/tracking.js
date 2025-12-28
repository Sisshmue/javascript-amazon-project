import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getOrderById, getProductById } from "../data/order.js";
import { DateFormatter } from "./order.js";
import { getProduct, loadProducts } from "../data/products.js";

const url = new URL(window.location.href);

const orderProduct = getProductById(
  url.searchParams.get("productId"),
  url.searchParams.get("orderId")
);

const order = getOrderById(url.searchParams.get("orderId"));

loadProducts(renderTrackinghtml);

function renderTrackinghtml() {
  const product = getProduct(url.searchParams.get("productId"));

  const today = new Date();
  const orderTime = new Date(order.orderTime);
  const deliveryTime = new Date(orderProduct.estimatedDeliveryTime);

  const trackingPercent = (
    ((today - orderTime) / (deliveryTime - orderTime)) *
    100
  ).toFixed(2);

  console.log(trackingPercent);

  const trackDetailHtml = `
    <div class="delivery-date">
        Arriving on ${DateFormatter(orderProduct.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
        ${product.name}
    </div>

    <div class="product-info">
        Quantity: ${orderProduct.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar" style="width : ${trackingPercent}%"></div>
        </div>
`;

  document.querySelector(".js-tracking-detail").innerHTML = trackDetailHtml;
  if(trackingPercent >= 0 && trackingPercent <= 49){
    document.querySelector('.js-preparing').classList.add('current-status');
  }else if(trackingPercent >= 50 && trackingPercent <= 99){
    document.querySelector('.js-shipped').classList.add('current-status');
  }else{
    document.querySelector('.js-delivered').classList.add('current-status');
  }
}
