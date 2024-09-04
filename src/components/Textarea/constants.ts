import { Color } from '@/types';

export const TextareaColor = {
  ERROR: Color.ERROR,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS,
  WARNING: Color.WARNING
} as const;
export type TextareaColor = (typeof TextareaColor)[keyof typeof TextareaColor];
