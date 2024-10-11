import { useAuth } from '../../../contexts/AuthContext';
import { useTask } from '../../../contexts/TaskContext';

export function TaskList() {
  const { tasks, handleDeleteTask, handleEditTask } = useTask();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="overflow-x-auto">
      <table className="border-gray-300 bg-white shadow-lg rounded-lg min-w-full">
        <thead>
          <tr className="bg-white text-gray-700">
            <th className="px-4 py-2 border-b min-w-[200px] text-center">Title</th>
            <th className="px-4 py-2 border-b text-center">Status</th>
            <th className="px-4 py-2 border-b text-center">User</th>
            <th className="px-4 py-2 border-b min-w-[300px] text-center">Description</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100 transition-colors duration-200 group">
              <td className="px-4 py-2 border-b text-center">{task.title}</td>
              <td className="px-4 py-2 border-b text-center">
                <div className={`w-fit min-w-[120px] md:min-w-max p-1 px-4 font-semibold text-sm rounded-full text-white ${task.status === 'Completed' ? 'bg-[#01BDF2]' : task.status === 'Pending' ? 'bg-yellow-400' : 'bg-[#43CECE]'}`}>
                  {task.status}
                </div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                {task.user}
              </td>
              <td className="px-4 py-2 border-b text-center break-all">{task.description}</td>
              <td className="px-4 py-2 border-b text-center">
                {isAuthenticated && task.user === user?.username && (
                  <div className="inline-flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-primary px-3 py-1 rounded text-white transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
