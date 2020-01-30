import { Identity } from './Identity';

export interface Employee {
  id: Identity;
  name: string;
  status: string;
  spentTime: number;
  dailyAmount: number;
  todaySpentTime: number;
}
