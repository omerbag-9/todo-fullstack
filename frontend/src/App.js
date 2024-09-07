import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';


let routers = createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"/signup",element:<Signup/>},
    {path:"/login",element:<Login/>},
  ]}
])
function App() {
  return (
    <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
