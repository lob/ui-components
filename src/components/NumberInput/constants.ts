export const NumberInputMode = {
  CURRENCY: 'currency',
  DECIMAL: 'decimal'
} as const;
export type NumberInputMode =
  (typeof NumberInputMode)[keyof typeof NumberInputMode];
