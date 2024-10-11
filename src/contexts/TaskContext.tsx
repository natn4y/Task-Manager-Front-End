import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Task } from '../types/Task';
import { useModal } from './ModalsContext';

export type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleTaskCreated: (newTask: Task) => void;
  handleTaskEdited: (updatedTask: Task) => void; // Adicionei a definição do novo método aqui
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: PropsWithChildren) {
  const initialTasks: Task[] = [];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { setNewTaskModal, setDeleteTaskModal } = useModal();

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleTaskEdited = (updatedTask: Task) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );

      return updatedTasks;
    });

    setSelectedTask(null);
    setNewTaskModal(false);
    toast.success("Task updated successfully!");
  };


  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setNewTaskModal(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setDeleteTaskModal(true)
  };

  const value: TaskContextType = {
    tasks,
    setTasks,
    handleTaskCreated,
    handleTaskEdited,
    selectedTask,
    setSelectedTask,
    handleEditTask,
    handleDeleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
