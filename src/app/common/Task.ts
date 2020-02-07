import { Identity } from './Identity';
import { Employee } from './Employee';

export interface Task {
  id: Identity;
  title: string;
  status: string;
  plannedTime: number;
  neededTime: number;
  spentTime: number;
  executorId: Employee['id'];
  employeeName: string;
  tag?: string;
}
