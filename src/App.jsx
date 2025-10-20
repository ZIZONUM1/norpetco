
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './componants/Login/Login'
import UserData from './componants/userData/UserData'
import LoadingScreen from './componants/Loadingscreen/Loadingscreen'

function App() {
  
const router = createBrowserRouter([{
path:"/",
element:<Login />,
},
{
  path:"/userData",
  element:<UserData />,
},
{
  path:"/loading",
  element:<LoadingScreen />,
}])
  return<>
   <RouterProvider router={router} />
  </>
  
}

export default App
