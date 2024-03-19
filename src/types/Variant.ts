export const Variant = {
  OUTLINED: 'outlined',
  PRIMARY: 'primary'
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];
