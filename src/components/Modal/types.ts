import { Color, Variant } from '@/types';

export const ModalVariant = {
  PRIMARY: Variant.PRIMARY
} as const;
export type ModalVariant = (typeof ModalVariant)[keyof typeof ModalVariant];

export const ModalColor = {
  GREEN: Color.GREEN,
  PRIMARY: Color.PRIMARY
} as const;
export type ModalColor = (typeof ModalColor)[keyof typeof ModalColor];
