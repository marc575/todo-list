import { useAuth } from '../../context/useAuth';
import { 
    FiMenu, 
    FiSearch , 
    FiBell,
    FiCheckSquare,
} from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30 border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Partie gauche */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none  md:hidden"
          >
            <FiMenu size={20} />
          </button>
          
          <div className="">
            <h2 className="text-xl font-bold text-indigo-600 flex items-center">
              <FiCheckSquare className="mr-2" />
              Todo-List
            </h2>
          </div>
        </div>

        {/* Partie droite */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <FiBell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} className="text-indigo-600 rounded-full" size={16} />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700 capitalize">
              {user?.name?.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;