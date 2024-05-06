export const DataTableRowSize = {
  TEN: 10,
  TWENTY_FIVE: 25,
  FIFTY: 50,
  ONE_HUNDRED: 100,
  TWO_HUNDRED_FIFTY: 250,
  ONE_THOUSAND: 1000
} as const;
export type DataTableRowSize =
  (typeof DataTableRowSize)[keyof typeof DataTableRowSize];
