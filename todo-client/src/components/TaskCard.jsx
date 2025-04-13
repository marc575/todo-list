import React from 'react';
import { FiEye, FiActivity } from 'react-icons/fi';

const TaskCard = ({ onShow, task }) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
  
    return (
      <div className={`flex items-center p-4 border border-gray-100 rounded-lg ${priorityColors[task.priority]} transition-all`}>
        <div className={`p-2 rounded-lg ${priorityColors[task.priority]} mr-4 border-2 `}>
          <FiActivity size={18} />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium capitalize ${task.status ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-4">
          {new Date(task.dueDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          <button>
            <FiEye size={18} />
          </button>
        </div>
      </div>
    );
  };

export default TaskCard
