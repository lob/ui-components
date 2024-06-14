import { Color } from '@/types';

export const SkeletonColor = {
  ERROR: Color.ERROR,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS
} as const;
export type SkeletonColor = (typeof SkeletonColor)[keyof typeof SkeletonColor];
