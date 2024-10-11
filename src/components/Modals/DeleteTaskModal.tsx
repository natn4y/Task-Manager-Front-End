import { toast } from 'react-toastify';

import { TaskDeleteModalProps } from '../../types/Task';
import { useAuth } from '../../contexts/AuthContext';
import { useTask } from '../../contexts/TaskContext';

export function DeleteTaskModal({ data, isOpen, onClose }: TaskDeleteModalProps) {
  const { user } = useAuth();
  const { setTasks } = useTask();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/task/delete/${data?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }

      await response.json();
      console.log('Task deleted successfully!' + data?.id);

      setTasks(prevTasks => prevTasks.filter(task => task.id !== data?.id));
      toast.success('Task deleted!');
      onClose(); // Closes the modal
    } catch (error) {
      console.error('Error deleting the task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='z-[99] fixed inset-0 flex justify-center items-center bg-black bg-opacity-75'>
      <div className='relative bg-white shadow-md p-6 rounded'>
        <button onClick={onClose} className='top-2 right-2 absolute text-gray-500'>
          &times;
        </button>
        <div className='text-center'>
          <h2 className='font-semibold text-lg'>
            Are you sure you want to delete the task "{data?.title}"?
          </h2>
          <p className='mt-2 text-gray-600'>This action cannot be undone.</p>
        </div>
        <div className='flex justify-around mt-6'>
          <button
            onClick={handleDelete}
            className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition'
          >
            Yes, delete
          </button>
          <button
            onClick={onClose}
            className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
