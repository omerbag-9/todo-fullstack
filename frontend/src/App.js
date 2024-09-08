import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import UserRoute from './components/UserRoute/UserRoute';


let routers = createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"signup",element:<UserRoute><Signup/></UserRoute>},
    {path:"login",element:<UserRoute><Login/></UserRoute>},
  ]}
])
function App() {
  let {setUserToken} = useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  
  return (
    <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
