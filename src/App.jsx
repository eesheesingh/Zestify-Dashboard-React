
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Explore from './components/Explore/Explore'
import Login from './components/LoginSignUp/Login';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const App = () => {
 
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path= "/" element={<Sidebar />} errorElement={<div>Error page</div>}>
      <Route path='' element={<Dashboard />} />
      <Route path='explore' element={<Explore />} />
      <Route path='setting' element={<Settings />} />
    </Route>

    
      <Route path='login' element={<Login />} />
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
