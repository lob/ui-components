import { Color, Size, Variant } from '@/types';

export const ChipColor = {
  ERROR: Color.ERROR,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS,
  UPGRADE: Color.UPGRADE,
  WARNING: Color.WARNING
} as const;
export type ChipColor = (typeof ChipColor)[keyof typeof ChipColor];

export const ChipSize = {
  MD: Size.MD
} as const;
export type ChipSize = (typeof ChipSize)[keyof typeof ChipSize];

export const ChipVariant = {
  PRIMARY: Variant.PRIMARY
} as const;
export type ChipVariant = (typeof ChipVariant)[keyof typeof ChipVariant];
