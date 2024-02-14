export const InputNumberMode = {
  CURRENCY: 'currency',
  DECIMAL: 'decimal'
} as const;
export type InputNumberMode =
  (typeof InputNumberMode)[keyof typeof InputNumberMode];
