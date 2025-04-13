import { useState, useEffect } from 'react';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiSun, FiMoon, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';
import Layout from '../components/layout/Layout';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const { tasks, todayTasks, user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const currentHour = currentTime.getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18; 

  // Mise à jour de l'heure chaque minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Chargement d'une citation aléatoire
  useEffect(() => {
    const quotes = [
      "Le succès c'est tomber sept fois et se relever huit fois.",
      "Votre limitation n'est que votre imagination.",
      "Le secret pour avancer c'est de commencer.",
      "Faites de chaque jour un chef-d'œuvre.",
      "L'avenir appartient à ceux qui croient en la beauté de leurs rêves."
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Statistiques
  const stats = {
    total: tasks.length,
    completed: Array.isArray(tasks) ? tasks.filter(t => t.status).length : 0,
    overdue: Array.isArray(tasks) ? tasks.filter(t => new Date(t.dueDate) < new Date() && !t.status).length : 0,
    today: todayTasks.length
  };

  return (
    <Layout>
    <div className="p-6 space-y-8">
      {/* En-tête avec message de bienvenue dynamique */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Bonjour, <span className="capitalize">{ user?.name } </span>!
            </h1>
            <p className="mt-2 opacity-90">
              {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} • {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
            {isDaytime ? <FiSun size={32}/> : <FiMoon size={32}/>}
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="italic">"{motivationalQuote}"</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<FiCheckCircle size={24} />}
          title="Tâches terminées"
          value={`${stats.completed}/${stats.total}`}
          color="text-green-500"
        />
        <StatCard 
          icon={<FiClock size={24} />}
          title="A faire aujourd'hui"
          value={stats.today}
          color="text-blue-500"
        />
        <StatCard 
          icon={<FiAlertTriangle size={24} />}
          title="En retard"
          value={stats.overdue}
          color="text-red-500"
        />
        <StatCard 
          icon={<FiCalendar size={24} />}
          title="Taux de complétion"
          value={ stats.completed ? `${Math.round((stats.completed / stats.total) * 100)}%` : "0%" }
          color="text-purple-500"
        />
      </div>

      {/* Tâches du jour */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiClock size={20} />
          Vos tâches aujourd'hui
        </h2>
        
        {Array.isArray(todayTasks) & todayTasks.length > 0 ? (
          <div className="space-y-3">
            {todayTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune tâche prévue pour aujourd'hui</p>
            <p className="text-sm mt-2">Profitez-en pour vous avancer !</p>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;