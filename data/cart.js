export const cart = [];

export function addtoCart(productId, selectorElement) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += Number(selectorElement.value);
    } else {
      cart.push({
        productId,
        quantity: Number(selectorElement.value),
      });
    }
  }