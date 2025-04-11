import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="card flex-shrink-0 w-full max-w-sm shadow-2xl"
    >
      <div className="card-body space-y-3">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        
        <div className="form-control">
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
        
        <div className="form-control">
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
        
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Mot de passe oublié ?</a>
        </label>
        
        <div className="form-control mt-6">
          <button 
            type="submit" 
            className="btn btn-primary w-full"
          >
            Connexion
          </button>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-sm">Pas encore de compte ? </span>
          <a href="/register" className="link link-primary text-sm">S'inscrire</a>
        </div>
      </div>
    </form>
      );
}