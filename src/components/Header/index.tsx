import { Link } from 'react-router-dom';

import { AddTaskBtn } from './newTaskButton';
import { Profile } from './profile';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className='flex justify-between items-center bg-secondary p-4'>
      <Link to={'/'} className='font-semibold text-xl'>Task Manager</Link>
      <div className='flex items-center gap-4 bg-secondary'>
        <Profile user={user?.username} />
        <AddTaskBtn user={user?.username} />
      </div>
    </header>
  );
}