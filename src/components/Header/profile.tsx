import { useState, useEffect, useRef } from 'react';

import { useAuth } from '../../contexts/AuthContext';

export function Profile({ user }: { user: string | undefined }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { logout } = useAuth();

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className='inline-block relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className='bg-secondary cursor-pointer'>{user ? `Hello, ${user}` : null}</p>

      {isMenuOpen && (
        <div className='right-0 absolute border-gray-200 bg-white shadow-lg mt-2 border rounded w-48'>
          <ul>
            <li className='hover:bg-gray-100'>
              <button className='px-4 py-2 w-full text-start cursor-pointer' onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
