# ✅ Todo List App

Une application web moderne de gestion de tâches construite avec **React.js**, **TailwindCSS**, **DaisyUI**, **Axios**, **Laravel**. Elle permet aux utilisateurs de s'inscrire, se connecter, créer, modifier, supprimer et filtrer leurs tâches quotidiennes, avec une interface responsive et fluide.

---

## ✨ Fonctionnalités

- 🔐 Authentification sécurisée (connexion, inscription, déconnexion)
- 📝 CRUD des tâches (Créer, Lire, Modifier, Supprimer)
- 🔍 Recherche et filtrage des tâches
- 📅 Intégration d’un calendrier interactif avec visualisation des tâches
- 📱 Responsive design (mobile, tablette, desktop)
- ⚙️ Transitions fluides entre les pages
- 🔔 Gestion des priorités et échéances

---

## 🛠️ Technologies utilisées

- [React.js](https://reactjs.org)
- [React Router](https://reactrouter.com)
- [TailwindCSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Axios](https://axios-http.com)
- [Framer Motion](https://www.framer.com/motion/) (pour les animations)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Structure du projet

```bash
src/
│
├── components/         # Composants réutilisables (Header, Sidebar, TaskItem...)
├── pages/              # Pages (Accueil, Login, Register, Dashboard, NotFound...)
├── context/            # Contexte AuthContext
├── hooks/              # Custom hooks (useAuth, etc.)
├── styles/             # Fichiers de style (optionnel)
├── App.jsx             # Configuration des routes
├── main.jsx            # Point d’entrée principal
└── ...
```

## 🚀 Installation
Prérequis :

```bash
Node.js ≥ 16
npm ou yarn
```

## Étapes

# Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/todo-list-app.git
cd todo-list-app
```

## Installer les dépendances
```bash
npm install
```

## Démarrer le serveur
```bash
npm run dev
```

📝 L'API backend doit être lancée séparément. Assurez-vous que les routes /api/login, /api/register, /api/tasks, etc., soient accessibles via Axios.


## 🤝 Contribuer
- Fork le repo

- Crée ta branche (git checkout -b feature/amélioration)

- Commit tes changements (git commit -am 'feat: ajout de ...')

- Push (git push origin feature/amélioration)

- Crée une Pull Request

## 🧑‍💻 Auteur

Tatchou Marc — [https://linkedin.com/in/marc-tatchou](https://www.linkedin.com/in/marc-tatchou-85891a243/)
