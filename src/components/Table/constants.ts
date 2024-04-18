import { Size } from '@/types';

export const TableSize = {
  SM: Size.SM,
  MD: Size.MD,
  LG: Size.LG
} as const;
export type TableSize = (typeof TableSize)[keyof typeof TableSize];
