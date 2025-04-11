import { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiFlag } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

const TaskForm = ({ isOpen, onClose, task }) => {
  const { addTask, updateTask } = useAuth();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 0
  });

  useEffect(() => {
    if (task) {
      setTaskData({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status
      });
    } else {
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 0
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      {task ? await updateTask(task.id, taskData) : await addTask(taskData)}
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Titre</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={taskData.title}
                onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                value={taskData.description}
                onChange={(e) => setTaskData({...taskData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date d'échéance</span>
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform z-10 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    className="input input-bordered pl-10 w-full"
                    value={new Date(taskData.dueDate).toISOString().split("T")[0]}
                    onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Priorité</span>
                </label>
                <div className="relative">
                  <FiFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-400" />
                  <select
                    className="select select-bordered pl-10 w-full"
                    value={taskData.priority}
                    onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                  >
                    <option value="high">Élevée</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;