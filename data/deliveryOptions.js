import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

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

export function getDeliverOption(delioptionId) {
  let deliverOption;

  deliveryOptions.forEach((option) => {
    if (option.id === delioptionId) {
      deliverOption = option;
    }
  });

  return deliverOption || deliverOption[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliverDate = today.add(deliveryOption.deliverDays, "days");

  const dateChecker = deliverDate.format("dddd");

  if (dateChecker === "Sunday") {
    deliverDate = deliverDate.add(1, "days");
  } else if (dateChecker === "Saturday") {
    deliverDate = deliverDate.add(2, "days");
  }
  
  const dateString = deliverDate.format("dddd, MMMM D");
  return dateString;
}
