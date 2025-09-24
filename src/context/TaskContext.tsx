import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Task } from '../types/task';

interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const STORAGE_KEY = 'tasks_v1';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Task[] : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask: TaskContextValue['addTask'] = (t) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...t,
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask: TaskContextValue['updateTask'] = (id, patch) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...patch, updatedAt: new Date().toISOString() } : task
    ));
  };

  const deleteTask: TaskContextValue['deleteTask'] = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getTask: TaskContextValue['getTask'] = (id) => tasks.find(t => t.id === id);

  const value = useMemo(() => ({ tasks, addTask, updateTask, deleteTask, getTask }), [tasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
  return ctx;
};
