import { Color, Variant } from '@/types';

export const ModalVariant = {
  PRIMARY: Variant.PRIMARY
} as const;
export type ModalVariant = (typeof ModalVariant)[keyof typeof ModalVariant];

export const ModalColor = {
  ERROR: Color.ERROR,
  GREEN: Color.GREEN,
  INFO: Color.INFO,
  NEUTRAL: Color.NEUTRAL,
  PRIMARY: Color.PRIMARY,
  SUCCESS: Color.SUCCESS,
  UPGRADE: Color.UPGRADE,
  WARNING: Color.WARNING
} as const;
export type ModalColor = (typeof ModalColor)[keyof typeof ModalColor];
