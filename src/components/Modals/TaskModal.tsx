import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TaskModalProps, Task } from '../../types/Task';
import { useAuth } from '../../contexts/AuthContext';

export function TaskModal({ data, isOpen, onClose, onTaskCreated, handleTaskEdited }: TaskModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState<'Completed' | 'In Progress' | 'Pending'>('Pending');

  const { user } = useAuth();

  useEffect(() => {
    if (data) {
      setTaskTitle(data.title);
      setTaskDescription(data.description);
      setStatus(data.status);
    } else {
      setTaskTitle('');
      setTaskDescription('');
      setStatus('Pending');
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: taskTitle,
      description: taskDescription,
      status,
    };

    try {
      let newTask: Task;
      if (data) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/edit/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Falha ao atualizar a task');
        }

        newTask = await response.json();
        handleTaskEdited(newTask);
        console.log('Task atualizada com sucesso!');
      } else {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Falha ao criar a task');
        }

        newTask = await response.json();
        console.log('Task created successfully!');
        toast.success('Task created successfully!')
        onTaskCreated(newTask);
      }

      setTaskTitle('');
      setTaskDescription('');
      setStatus('Pending');
      onClose();
    } catch (error) {
      console.error('Erro no envio do formulário:', error);
    }
  };

  return (
    <div className='z-[99] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='relative bg-white shadow-md p-6 rounded'>
        <button onClick={onClose} className='top-2 right-2 absolute text-gray-500'>
          &times;
        </button>
        <h2 className='bg-white mb-4 text-xl'>{data ? 'Edit Task' : 'Create New Task'}</h2>
        <form className='bg-white' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Task Title'
            className='mb-4 p-2 border rounded w-full'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <textarea
            placeholder='Task Description'
            className='mb-4 p-2 border rounded w-full'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <div className='mb-4'>
            <label htmlFor='status' className='block mb-1'>Status:</label>
            <select
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Completed' | 'In Progress' | 'Pending')}
              className='p-2 border rounded w-full'
            >
              <option value='Completed'>Completed</option>
              <option value='In Progress'>In Progress</option>
              <option value='Pending'>Pending</option>
            </select>
          </div>
          <div className='flex justify-end bg-white'>
            <button type='button' onClick={onClose} className='hover:brightness-95 bg-gray-300 mr-2 px-4 py-2 rounded'>
              Cancel
            </button>
            <button type='submit' className='hover:brightness-95 bg-primary px-4 py-2 rounded text-white'>
              {data ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
