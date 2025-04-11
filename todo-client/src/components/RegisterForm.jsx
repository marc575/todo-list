import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, password_confirmation });
      navigate("/dashboard");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100"
    >
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nom complet</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
            className="input input-bordered"
            required
          />
        </div>
        
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="input input-bordered"
            required
          />
        </div>
        
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input input-bordered"
            required
          />
        </div>
        
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Confirmation</span>
          </label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="••••••••"
            className="input input-bordered"
            required
          />
        </div>

        {password && password_confirmation && password !== password_confirmation && (
          <div className="alert alert-warning p-2 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Les mots de passe ne correspondent pas</span>
          </div>
        )}

        <div className="form-control mt-6">
          <button 
            type="submit" 
            className="btn btn-primary w-full"
          >
            S'inscrire
          </button>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-sm">Déjà inscrit ? </span>
          <a href="/login" className="link link-primary text-sm">Se connecter</a>
        </div>
      </div>
    </form>
  );
}
