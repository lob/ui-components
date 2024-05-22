import { Color, Size } from '@/types';

export const TileSize = {
  MD: Size.MD,
  LG: Size.LG
} as const;
export type TileSize = (typeof TileSize)[keyof typeof TileSize];

export const TileColor = {
  ERROR: Color.ERROR,
  NEUTRAL: Color.NEUTRAL,
  SUCCESS: Color.SUCCESS
} as const;
export type TileColor = (typeof TileColor)[keyof typeof TileColor];
