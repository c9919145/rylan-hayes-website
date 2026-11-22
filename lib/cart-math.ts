export const FREE_SHIPPING_THRESHOLD = 7500;

export const shippingMethods = [
  {
    id: "standard",
    label: "Standard shipping",
    detail: "4–7 business days",
    price: 695,
  },
  {
    id: "expedited",
    label: "Expedited shipping",
    detail: "2–3 business days",
    price: 1495,
  },
] as const;

export type ShippingMethodId = (typeof shippingMethods)[number]["id"];

export const TAX_RATE = 0.0925;

export const isShippingMethod = (value: unknown): value is ShippingMethodId =>
  value === "standard" || value === "expedited";

export function shippingCost(subtotal: number, method: ShippingMethodId) {
  if (method === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return shippingMethods.find((option) => option.id === method)?.price ?? 695;
}

export function orderTotals(subtotal: number, method: ShippingMethodId) {
  const shipping = shippingCost(subtotal, method);
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}
