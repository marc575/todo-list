import React from 'react'
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/useAuth';

function Calendar() {
  const { tasks } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fonctions de navigation
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Génération des jours du mois
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  // Couleurs par priorité
  const priorityColors = {
    high: 'bg-red-100 border-red-200 text-red-800',
    medium: 'bg-yellow-100 border-yellow-200 text-yellow-800',
    low: 'bg-green-100 border-green-200 text-green-800'
  };

  // Tâches du jour sélectionné
  const selectedDayTasks = Array.isArray(tasks) ? tasks.filter(task => 
    isSameDay(new Date(task.dueDate), selectedDate)
  ) : [];

  return (
    <Layout>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Détails des tâches du jour sélectionné */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-800 mb-3">
              Tâches pour le {format(selectedDate, 'PPPP', { locale: fr })}
            </h3>
            
            {selectedDayTasks.length > 0 ? (
              <ul className="space-y-2">
                {selectedDayTasks.map(task => (
                  <li 
                    key={task.id}
                    className={`p-3 rounded-lg border ${priorityColors[task.priority]}`}
                  >
                    <div className={`font-medium ${task.status ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-600 mt-1">{task.description}</div>
                    )}
                    <div className="text-xs mt-2">
                      Priorité: {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune tâche prévue ce jour</p>
            )}
          </div>
          {/* En-tête du calendrier */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <button 
              onClick={prevMonth}
              className="btn btn-ghost btn-circle"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </h2>
            
            <button 
              onClick={nextMonth}
              className="btn btn-ghost btn-circle"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
    
          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* En-têtes des jours */}
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
    
            {/* Jours du mois */}
            {daysInMonth.map((day) => {
              const dayTasks = Array.isArray(tasks) ? tasks.filter(task => 
                isSameDay(new Date(task.dueDate), day)
              ) : [];
    
              return (
                <div 
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`bg-white min-h-24 p-1 border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${isSameMonth(day, currentDate) ? '' : 'text-gray-400 bg-gray-50'}
                    ${isSameDay(day, selectedDate) ? 'ring-2 ring-indigo-500' : ''}
                  `}
                >
                  <div className="text-right p-1">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full
                      ${isSameDay(day, new Date()) ? 'bg-indigo-100 text-indigo-800 font-medium' : ''}
                    `}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  
                  {/* Tâches pour ce jour */}
                  <div className="space-y-1 mt-1">
                    {dayTasks.slice(0, 2).map(task => (
                      <div 
                        key={task.id}
                        className={`text-xs p-1 rounded border ${priorityColors[task.priority]} truncate ${task.status ? 'line-through text-gray-400' : 'text-gray-700'}`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayTasks.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </Layout>
  )
}

export default Calendar
