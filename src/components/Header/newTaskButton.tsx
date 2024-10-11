import { Link } from 'react-router-dom';

import { TaskModal } from '../Modals/TaskModal';
import { useTask } from '../../contexts/TaskContext';
import { useModal } from '../../contexts/ModalsContext';

export function AddTaskBtn({ user }: { user: string | undefined }) {
  const { handleTaskCreated } = useTask();
  const { newtaskModal, setNewTaskModal } = useModal();

  const handleOpenNewTaskModal = () => {
    setNewTaskModal(true);
  };

  const handleCloseNewTaskModal = () => {
    setNewTaskModal(false);
  };

  return (
    <>
      {user ? (
        <>
          <button
            onClick={handleOpenNewTaskModal} className='bg-primary px-4 p-2 rounded-full text-white'
          >
            New Task
          </button>
          <TaskModal
            isOpen={newtaskModal}
            onClose={handleCloseNewTaskModal}
            onTaskCreated={handleTaskCreated}
            handleTaskEdited={() => { }}
          />
        </>
      ) : (
        <Link to='/login'>
          <button className='bg-primary px-4 p-2 rounded-full text-white'>Login</button>
        </Link>
      )}
    </>
  );
}
