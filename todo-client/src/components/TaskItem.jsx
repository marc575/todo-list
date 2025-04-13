import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';
import { useEffect } from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {

  const { toggleTask, user } = useAuth();

  const handleToggle = async (id, data) => {
      try {
        await toggleTask(id, data);
      } catch (err) {
        console.log(err);
      }
  };
    
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-150 group">
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-3">
          { task.user ? (
            task.user.name === user.name ? (
              <input 
                type="checkbox" 
                className="checkbox mr-4"
                defaultChecked={task.status} 
                onChange={(e) => handleToggle(task.id, {status: e.target.checked})}
              /> 
            ) : (
              <input 
                type="checkbox" 
                className="checkbox mr-4"
                defaultChecked={task.status} 
                disabled
              /> 
            )
          ) : (
            <input 
              type="checkbox" 
              className="checkbox mr-4"
              defaultChecked={task.status} 
              onChange={(e) => handleToggle(task.id, {status: e.target.checked})}
            /> 
          )}
          <div>
            <h3 className={`font-medium ${task.status ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.title}
            </h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <div className="flex items-center mt-2 space-x-3">
              <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity">
        { task?.user?.name === user?.name ? (
          <>
            <button 
              onClick={onEdit}
              className="btn btn-ghost btn-sm text-gray-500 hover:text-blue-500"
            >
              <FiEdit2 size={16} />
            </button>
            <button 
              onClick={onDelete}
              className="btn btn-ghost btn-sm text-gray-500 hover:text-red-500">
              <FiTrash2 size={16} />
            </button>
          </>
         ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <img src={`https://ui-avatars.com/api/?name=${task?.user?.name}&background=random`} className="rounded-full" size={16} />
            </div>  
            <span className="text-gray-500 capitalize text-xs">{task?.user?.name}</span>
          </>
         ) }
        </div>
      </div>
    </div>
  );
};

export default TaskItem;