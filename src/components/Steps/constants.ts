export const StepsStatus = {
  SUCCESS: 'success'
} as const;
export type StepsStatus = (typeof StepsStatus)[keyof typeof StepsStatus];
