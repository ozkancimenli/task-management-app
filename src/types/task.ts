export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}
