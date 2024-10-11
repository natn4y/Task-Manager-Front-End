import React, { createContext, useContext, useState } from 'react';

export type ModalsContextType = {
  newtaskModal: boolean;
  setNewTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTaskModal: boolean;
  setDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

export function ModalsProvider({ children }: React.PropsWithChildren) {
  const [newtaskModal, setNewTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false); // Adicionado

  const value: ModalsContextType = {
    newtaskModal,
    setNewTaskModal,
    deleteTaskModal,
    setDeleteTaskModal,
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

export function useModal() {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalsProvider');
  }
  return context;
};
