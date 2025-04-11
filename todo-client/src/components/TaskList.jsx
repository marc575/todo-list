import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import TaskItem from './TaskItem';
import { FiFilter, FiSearch } from 'react-icons/fi';

const TaskList = ({ onEdit, onDelete }) => {
  const { tasks } = useAuth();
  const [search, setSearch] = useState("");
  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase()) ||
    task.status === parseInt(search)
  ) : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des tâches..."
            className="input input-bordered pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <select className="select select-bordered" onChange={(e) => setSearch(e.target.value)}>
            <option>Toutes</option>
            <option value="0">En cours</option>
            <option value="1">Complétées</option>
          </select>
          <button className="btn btn-ghost">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {Array.isArray(filteredTasks) ? filteredTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        )) : null}
      </div>

      {Array.isArray(filteredTasks) ? filteredTasks.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Aucune tâche trouvée. Commencez par en créer une.
        </div>
      ): null}
    </div>
  );
};

export default TaskList;