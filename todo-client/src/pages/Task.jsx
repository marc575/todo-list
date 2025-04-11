import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

function Task() {
    const { deleteTask } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
  
    const handleEdit = (task) => {
      setCurrentTask(task);
      setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
      try {
        await deleteTask(id);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes Tâches</h1>
          <button
            onClick={() => {
              setCurrentTask(null);
              setIsModalOpen(true);
            }}
            className="btn btn-primary gap-2"
          >
            <FiPlus size={20} />
            Nouvelle Tâche
          </button>
        </div>
  
        <TaskList onEdit={handleEdit} onDelete={handleDelete} />
  
        <TaskForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={currentTask}
        />
      </div>
    </Layout>
    );
}

export default Task
