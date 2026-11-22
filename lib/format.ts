export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);

export const formatDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatShortDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatMonth = (monthKey: string) => {
  const date = new Date(`${monthKey}-01T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatOrderDate = (value: string) => {
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const dayOfMonth = (isoDate: string) => isoDate.slice(8, 10);

export const monthAbbreviation = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(date)
    .toUpperCase();
};

export const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");
