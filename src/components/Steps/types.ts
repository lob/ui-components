import { StepsStatus } from './constants';

export interface StepItem {
  label: string;
  status?: StepsStatus;
}
