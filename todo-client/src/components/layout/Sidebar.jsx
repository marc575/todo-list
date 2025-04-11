import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUser,
  FiCheckSquare, 
  FiSettings,
  FiCalendar,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Tableau de bord' },
    { path: '/tasks', icon: FiCheckSquare, label: 'Tâches' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendrier' },
    { path: '/profile', icon: FiUser, label: 'Profil' },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20 md:hidden"
        />
      )}

      <aside className={`
        fixed md:relative top-0 left-0 h-full bg-white shadow-xl z-20
        w-64 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 pt-10 md:pt-0' : '-translate-x-full md:translate-x-0'}
        `}>

        <nav className="mt-6">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    ${location.pathname === item.path 
                      ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'}
                    transition-colors duration-200
                  `}
                >
                  <item.icon className="flex-shrink-0" size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Section utilisateur */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} className="rounded-full text-indigo-600" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate capitalize">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <FiLogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;