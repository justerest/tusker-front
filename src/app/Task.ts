import { Identity } from './Identity';

export interface Task {
  id: Identity;
  title: string;
  status: string;
  spentTime: number;
  employeeName: string;
}
