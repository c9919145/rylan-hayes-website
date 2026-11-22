export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());

export const cleanText = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export const isPostalCode = (value: string) =>
  /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/.test(value.trim());

export const isPhone = (value: string) =>
  /^[+()\d\s.-]{7,20}$/.test(value.trim());

export const isUsState = (value: string) =>
  /^[A-Za-z]{2}$/.test(value.trim());

export const isCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
};

export const isExpiry = (value: string) => {
  const match = value.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(year, month, 1);
  return expiry > now;
};

export const isCvc = (value: string) => /^\d{3,4}$/.test(value.trim());

export type FieldErrors = Record<string, string>;
