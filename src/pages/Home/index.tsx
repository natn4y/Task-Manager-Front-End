import { useEffect, useState } from 'react';
import { TaskModal } from '../../components/Modals/TaskModal';
import { Task } from '../../types/Task';
import { Filter } from '../../types/Filter';

import { useTask } from '../../contexts/TaskContext';
import { useModal } from '../../contexts/ModalsContext';

import { TaskList } from './_components/taskList';
import { StatusCard } from './_components/statusCard';
import { DeleteTaskModal } from '../../components/Modals/DeleteTaskModal';

export default function Home() {
  const { tasks, setTasks, handleTaskEdited, selectedTask, setSelectedTask } = useTask();
  const { newtaskModal, setNewTaskModal, deleteTaskModal, setDeleteTaskModal } = useModal();

  const [filter, setFilter] = useState<Filter>({
    title: '',
    status: '',
    user: '',
  });

  const handleCloseModal = () => {
    setSelectedTask(null);
    setNewTaskModal(false);
    setDeleteTaskModal(false)
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateFilter = (field: keyof Filter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filter),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [filter, setTasks]);

  return (
    <div className="mx-auto p-4 sm:p-6 md:p-8 max-w-[1500px]">
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-[1fr_350px]">
        <div className="w-full">
          <div className='flex items-center mb-4 md:mb-8 rounded-md'>
            <div className='p-2 rounded'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
              </svg>

            </div>
            <p className="font-semibold text-lg">Task Dashboard</p>
          </div>

          <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6'>
            <StatusCard status='Pending' count={tasks.filter(t => t.status === 'Pending').length} />
            <StatusCard status='In Progress' count={tasks.filter(t => t.status === 'In Progress').length} />
            <StatusCard status='Completed' count={tasks.filter(t => t.status === 'Completed').length} />
          </div>

          <TaskList />
          <TaskModal
            data={selectedTask}
            isOpen={newtaskModal}
            onClose={handleCloseModal}
            onTaskCreated={handleTaskCreated}
            handleTaskEdited={handleTaskEdited}
          />
          <DeleteTaskModal data={selectedTask}
            isOpen={deleteTaskModal}
            onClose={handleCloseModal}
          />
        </div>
        <div className='bg-white shadow-sm lg:mt-[75px] rounded-md w-full h-screen'>
          <div className="bg-white p-6 rounded-lg">
            <div className='flex gap-4'>
              <div className='mt-[2px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                </svg>
              </div>
              <h2 className="mb-6 text-xl">Filters</h2>
            </div>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Search tasks by title"
                value={filter.title}
                onChange={(e) => updateFilter('title', e.target.value)}
                className="border-gray-300 p-2 border rounded-lg w-full"
              />
              <select
                value={filter.status}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="border-gray-300 p-2 border rounded-lg w-full"
              >
                <option value="">All</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                type="text"
                placeholder="Search tasks by user"
                value={filter.user}
                onChange={(e) => updateFilter('user', e.target.value)}
                className="border-gray-300 p-2 border rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
