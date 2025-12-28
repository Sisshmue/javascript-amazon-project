export const orders = JSON.parse(localStorage.getItem("orders")) ?? [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getOrderById(orderId) {
  let matchingItem;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingItem = order;
    }
  });
  return matchingItem;
}

export function getProductById(productId, orderId) {
  let matchingProduct;
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  matchingOrder.products.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}
