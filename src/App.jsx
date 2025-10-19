
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './componants/Login/Login'
import UserData from './componants/userData/UserData'

function App() {
  
const router = createBrowserRouter([{
path:"/",
element:<Login />,
},
{
  path:"/userData",
  element:<UserData />,
}])
  return<>
   <RouterProvider router={router} />
  </>
  
}

export default App
