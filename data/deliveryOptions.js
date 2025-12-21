export const deliveryOptions = [
  {
    id: "1",
    deliverDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliverDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliverDays: 1,
    priceCents: 999,
  },
];

export function getDeliverOption(delioptionId){
    let deliverOption;

    deliveryOptions.forEach((option) => {
      if (option.id === delioptionId) {
        deliverOption = option;
      }
    });

    return deliverOption || deliverOption[0];
}
