import { Color, Size, Variant } from '@/types';

export const IconButtonColor = {
  ERROR: Color.ERROR,
  INFO: Color.INFO,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS,
  UPGRADE: Color.UPGRADE,
  WARNING: Color.WARNING
} as const;
export type IconButtonColor =
  (typeof IconButtonColor)[keyof typeof IconButtonColor];

export const IconButtonSize = {
  XS: Size.XS,
  SM: Size.SM,
  MD: Size.MD,
  LG: Size.LG,
  XL: Size.XL
} as const;
export type IconButtonSize =
  (typeof IconButtonSize)[keyof typeof IconButtonSize];

export const IconButtonVariant = {
  OUTLINED: Variant.OUTLINED,
  PRIMARY: Variant.PRIMARY
} as const;
export type IconButtonVariant =
  (typeof IconButtonVariant)[keyof typeof IconButtonVariant];
