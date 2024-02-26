
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Explore from './components/Explore/Explore'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from "./components/LoginSignUp/Login"
import { useState } from 'react';

const App = () => {
  const [chatMembers, setChatMembers] = useState(null);
 
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path= "/" element= { <Sidebar />  } errorElement={<ErrorPage />}>
      <Route path='' element= { <Dashboard chatMembers={chatMembers} /> } />
      <Route path='explore' element= { <Explore chatMembers={chatMembers} /> } />
      <Route path='setting' element= { <Settings chatMembers={chatMembers} /> } />
    </Route>
    <Route path='/login' element={<Login setChatMembers={setChatMembers} />} />
    </>
  ))

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>    
    </div>
  );
}

export default App


{/* <Route path= "/" element= { chatMembers ? <Sidebar /> : <Navigate to="/login" /> } errorElement={<ErrorPage />}> */}
