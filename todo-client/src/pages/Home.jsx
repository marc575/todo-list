import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Home = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return (
    <div
      className="min-h-screen bg-base-200 flex items-center justify-center px-4"
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Bienvenue sur Todo-List 🎯
        </h1>
        <p className="text-lg text-base-content mb-8">
          Organise ta journée, gagne en productivité et ne rate plus aucune tâche.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="btn btn-primary w-full sm:w-auto">
            Se connecter
          </Link>
          <Link to="/register" className="btn btn-outline w-full sm:w-auto">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
