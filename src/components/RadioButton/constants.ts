import { Variant } from '@/types';

export const RadioButtonVariant = {
  PRIMARY: Variant.PRIMARY,
  OUTLINED: Variant.OUTLINED,
  CARD: Variant.CARD
} as const;
export type RadioButtonVariant =
  (typeof RadioButtonVariant)[keyof typeof RadioButtonVariant];
