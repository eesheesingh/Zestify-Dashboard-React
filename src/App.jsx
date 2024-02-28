// App.js
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Overview/Overview';
import Settings from './components/Settings/Settings';
import Explore from './components/Explore/Explore';
import Profile from './components/Profile/Profile';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from "./components/LoginSignUp/Login";
import { useState } from 'react';

const App = () => {
  const [chatMembers, setChatMembers] = useState(null);

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<Sidebar />} errorElement={<ErrorPage />}>
        <Route path="" element={<Dashboard chatMembers={chatMembers} />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="explore" element={<Explore chatMembers={chatMembers} />} />
        <Route path="setting" element={<Settings chatMembers={chatMembers} />} />
        <Route path="profile" element={<Profile />} /> {/* Add the new profile route */}
      </Route>
      <Route path="/login" element={<Login setChatMembers={setChatMembers} />} />
    </>
  ));

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

export default App;
