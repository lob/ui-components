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
  BACK: 'Back',
  BANK_ACCOUNT: 'BankAccount',
  BARS: 'Bars',
  BELL: 'Bell',
  BORDER_OUT: 'BorderOut',
  BULLHORN: 'Bullhorn',
  CALENDAR: 'Calendar',
  CALENDAR_ALT: 'CalendarAlt',
  CAMPAIGN_AUTOMATED: 'CampaignAutomated',
  CAMPAIGN_ONE_TIME: 'CampaignOneTime',
  CAR: 'Car',
  CIRCLE_CHECK: 'CircleCheck',
  CIRCLE_CLOSE: 'CircleClose',
  CIRCLE_EMPTY: 'CircleEmpty',
  CIRCLE_EXCLAMATION: 'CircleExclamation',
  CIRCLE_INFO: 'CircleInfo',
  CIRCLE_QUESTION: 'CircleQuestion',
  CIRCLE_USER: 'CircleUser',
  CLOCK_FOUR: 'ClockFour',
  CLOCK_SEVEN: 'ClockSeven',
  CLOCK_TEN: 'ClockTen',
  CLOSE: 'Close',
  CLOUD_DATA: 'CloudData',
  CODE: 'Code',
  COIN: 'Coin',
  CREDIT_CARD: 'CreditCard',
  DELETE: 'Delete',
  DETAILS: 'Details',
  DOLLAR_SIGN: 'DollarSign',
  DOUBLE_SIDED_ARROW: 'DoubleSidedArrow',
  DUPLICATE: 'Duplicate',
  EDIT: 'Edit',
  ELLIPSIS: 'Ellipsis',
  ELLIPSIS_VERTICAL: 'EllipsisVertical',
  ENVELOPE: 'Envelope',
  ENVELOPES: 'Envelopes',
  ERROR: 'Error',
  EXIT: 'Exit',
  EXPORT: 'Export',
  FILE_ALT: 'FileAlt',
  FIRE: 'Fire',
  FUTURE: 'Future',
  GEAR: 'Gear',
  GIFT: 'Gift',
  LAYER_GROUP: 'LayerGroup',
  LIGHTNING: 'Lightning',
  LOCATION_PIN: 'LocationPin',
  MONEY_BILL: 'MoneyBill',
  NEXT: 'Next',
  OPEN_BOOK: 'OpenBook',
  PAINT_ROLLER: 'PaintRoller',
  PIE_CHART_SLICE: 'PieChartSlice',
  PLAN_BUSINESS: 'PlanBusiness',
  PLAN_DEVELOPER: 'PlanDeveloper',
  PLAN_ENTERPRISE: 'PlanEnterprise',
  PLAN_GROWTH_PLUS: 'PlanGrowthPlus',
  PLAN_GROWTH: 'PlanGrowth',
  PLAN_STARTUP: 'PlanStartup',
  PLUS: 'Plus',
  PREVIOUS: 'Previous',
  PROCESSING: 'Processing',
  RESIZE: 'Resize',
  SEND: 'Send',
  SIGNAL: 'Signal',
  SUCCESS: 'Success',
  TRIANGLE_EXCLAMATION: 'TriangleExclamation',
  TRUCK: 'Truck',
  UNVERIFIED: 'Unverified',
  USER: 'User',
  USERS: 'Users',
  VERIFIED: 'Verified',
  WEBHOOKS: 'Webhooks'
} as const;
export type IconName = (typeof IconName)[keyof typeof IconName];
