export const Color = {
  GREEN: 'green',
  PRIMARY: 'primary'
} as const;
export type Color = (typeof Color)[keyof typeof Color];
