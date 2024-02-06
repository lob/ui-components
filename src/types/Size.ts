export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl'
} as const;
export type Size = (typeof Size)[keyof typeof Size];
