import { Color, Size, Variant } from '@/types';

export const BadgeColor = {
  ERROR: Color.ERROR,
  INFO: Color.INFO,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS,
  UPGRADE: Color.UPGRADE,
  WARNING: Color.WARNING
} as const;
export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];

export const BadgeSize = {
  SM: Size.SM,
  MD: Size.MD,
  LG: Size.LG
} as const;
export type BadgeSize = (typeof BadgeSize)[keyof typeof BadgeSize];

export const BadgeVariant = {
  OUTLINED: Variant.OUTLINED,
  PRIMARY: Variant.PRIMARY
} as const;
export type BadgeVariant = (typeof BadgeVariant)[keyof typeof BadgeVariant];
