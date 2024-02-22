
import { useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashoard';
import Settings from './components/Settings/Settings';
import Explore from './components/Explore/Explore'
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <Sidebar onPageChange={handlePageChange} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'settings' && <Settings />}
        {currentPage === 'explore' && <Explore />}
      </main>
    </div>
  );
}

export default App
