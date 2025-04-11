import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Header fixe */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden pt-14">
        {/* Sidebar - maintenant correctement positionnée */}
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        {/* Contenu principal avec gestion responsive */}
        <main className={`
          flex-1 overflow-y-auto transition-all duration-300
          ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}
          md:p-4 bg-gray-50
        `}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;