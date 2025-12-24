import { addtoCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe("test suite : addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionsId: "1",
        },
      ]);
    });

    loadFromStorage();

    addtoCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);

    //challenge
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addtoCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);

    //challenge
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("test suite : removeFromCart", () => {

  beforeEach(()=>{
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionsId: "1",
        },
      ]);
    });

    loadFromStorage();

  });

  it("remove a product that is in the cart", () => {
  
    expect(cart.length).toEqual(1);
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(0);

  });

  it("removes a product that is not in the cart", ()=>{
    expect(cart.length).toEqual(1);
    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
  })
});

describe('test suit : updateDeliveryOption', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionsId: "1",
        },
      ]);
    });

    loadFromStorage();

  });
  it('update the delivery option of a product in the cart', ()=>{
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionsId).toEqual('1');
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].deliveryOptionsId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d','3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d','5');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    

  })
});
