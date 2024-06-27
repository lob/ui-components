export const Variant = {
  OUTLINED: 'outlined',
  PRIMARY: 'primary',
  TEXT: 'text',
  CARD: 'card'
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];
