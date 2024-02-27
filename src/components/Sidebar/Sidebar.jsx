// Sidebar.jsx
import { useState, useRef } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { IoSettingsOutline } from 'react-icons/io5';
import './Sidebar.css';
import Logo from '../../assets/Vector.svg';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    sessionStorage.removeItem("chatId");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  // Function to check if the link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };


  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="sidebar-button inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`sidebar-container fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="sidebar-content h-full px-7 py-4 overflow-y-auto bg-gray-50">
          <a href="" className="brand-logo flex items-center ps-2.5 mb-5 pb-6 py-3">
            <img
              src={Logo}
              className="h-10 me-3 sm:h-10"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Logo</span>
          </a>
          <ul className="sidebar-menu space-y-4 font-medium">
        <li>
          <Link to="/"
            className={`menu-item flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-200 group ${isLinkActive('/') ? 'active' : ''}`}
          >
            <RxDashboard className='text-2xl' />
            <span className="text-base font-bold ms-3">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/setting"
            className={`menu-item flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-200 group ${isLinkActive('/setting') ? 'active' : ''}`}
          >
            <IoSettingsOutline className='text-2xl' />
            <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">Settings</span>
          </Link>
        </li>
      </ul>


          {/* Sign out button */}
          <button
            className="sign-out-button flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-200 group"
            onClick={Logout}
          >
            <BiLogOut className='text-2xl' />
            <span className="text-base font-bold ms-3">Sign Out</span>
          </button>
        </div>
      </aside>
      <Outlet />
    </>
  );
};

export default Sidebar;
