export const Color = {
  ERROR: 'error',
  GREEN: 'green',
  INFO: 'info',
  NEUTRAL: 'neutral',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  UPGRADE: 'upgrade',
  WARNING: 'warning'
} as const;
export type Color = (typeof Color)[keyof typeof Color];
