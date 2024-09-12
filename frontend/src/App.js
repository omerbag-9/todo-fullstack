import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


let routers = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ]
  }
])
function App() {

  const { setUserToken } = useContext(UserContext)
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
