import { Identity } from './Identity';

export interface Task {
  id: Identity;
  title: string;
  status: string;
  plannedTime: number;
  neededTime: number;
  spentTime: number;
  employeeName: string;
}
