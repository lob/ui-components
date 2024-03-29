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
  BANK_ACCOUNT: 'BankAccount',
  BARS: 'Bars',
  BELL: 'Bell',
  BULLHORN: 'Bullhorn',
  CAR: 'Car',
  CIRCLE_CHECK: 'CircleCheck',
  CIRCLE_CLOSE: 'CircleClose',
  CIRCLE_EMPTY: 'CircleEmpty',
  CIRCLE_EXCLAMATION: 'CircleExclamation',
  CIRCLE_INFO: 'CircleInfo',
  CIRCLE_QUESTION: 'CircleQuestion',
  CIRCLE_USER: 'CircleUser',
  CLOSE: 'Close',
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
  GLOBE: 'Globe',
  LAYER_GROUP: 'LayerGroup',
  LIGHTNING: 'Lightning',
  LOCATION_PIN: 'LocationPin',
  MONEY_BILL: 'MoneyBill',
  OPEN_BOOK: 'OpenBook',
  PIE_CHART_SLICE: 'PieChartSlice',
  PLUS: 'Plus',
  ROCKET: 'Rocket',
  SHOP: 'Shop',
  SIGNAL: 'Signal',
  TRIANGLE_EXCLAMATION: 'TriangleExclamation',
  USER_CHAT_BUBBLE: 'UserChatBubble',
  USER: 'User',
  USERS: 'Users',
  WEBHOOKS: 'Webhooks'
} as const;
export type IconName = (typeof IconName)[keyof typeof IconName];
