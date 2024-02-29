// App.js
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Overview/Overview';
import Settings from './components/Settings/Settings';
import Explore from './components/Explore/Explore';
import Request from './components/RequestID/Request';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from "./components/LoginSignUp/Login";
import { useState } from 'react';

const App = () => {
  const [chatMembers, setChatMembers] = useState(null);

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={ chatMembers ? <Sidebar /> : <Navigate to="/login" /> } errorElement={<ErrorPage />}>
        <Route path="" element={ chatMembers ? <Dashboard chatMembers={chatMembers}  /> : <Navigate to="/login" />} />
        <Route path="/overview" element={ chatMembers ? <Overview />: <Navigate to="/login" />}   />
        <Route path="requests" element={ chatMembers ? <Request />: <Navigate to="/login" />}   />
        <Route path="explore" element={ chatMembers ? <Explore chatMembers={chatMembers} />: <Navigate to="/login" />}   />
        <Route path="setting" element={ chatMembers ? <Settings chatMembers={chatMembers} />: <Navigate to="/login" />}   />
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
