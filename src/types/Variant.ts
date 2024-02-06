export const Variant = {
  PRIMARY: 'primary'
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];
