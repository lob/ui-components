import { Size } from '@/types';

export const IconSize = {
  [Size.SM]: 14,
  [Size.MD]: 16,
  [Size.LG]: 18,
  [Size.XL]: 20,
  [Size.XXL]: 24
} as const;
export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export const IconName = {
  APP_WINDOWS: 'AppWindows',
  ARROW_DOWN_TO_LINE: 'ArrowDownToLine',
  ARROW_TREND_UP: 'ArrowTrendUp',
  BARS: 'Bars',
  BELL: 'Bell',
  BULLHORN: 'Bullhorn',
  CAR: 'Car',
  CIRCLE_EMPTY: 'CircleEmpty',
  CIRCLE_QUESTION: 'CircleQuestion',
  CIRCLE_USER: 'CircleUser',
  CLOUD_DATA: 'CloudData',
  CODE: 'Code',
  COIN: 'Coin',
  CREDIT_CARD: 'CreditCard',
  EDIT: 'Edit',
  ENVELOPE: 'Envelope',
  EXIT: 'Exit',
  FILE_ALT: 'FileAlt',
  FIRE: 'Fire',
  GEAR: 'Gear',
  GIFT: 'Gift',
  LAYER_GROUP: 'LayerGroup',
  LIGHTNING: 'Lightning',
  LOCATION_PIN: 'LocationPin',
  MONEY_BILL: 'MoneyBill',
  OPEN_BOOK: 'OpenBook',
  PIE_CHART_SLICE: 'PieChartSlice',
  PLUS: 'Plus',
  SIGNAL: 'Signal',
  TRIANGLE_EXCLAMATION: 'TriangleExclamation',
  USER: 'User',
  USERS: 'Users',
  WEBHOOKS: 'Webhooks'
} as const;
export type IconName = (typeof IconName)[keyof typeof IconName];
