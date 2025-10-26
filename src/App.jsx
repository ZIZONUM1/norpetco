
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from './contexts/AuthContexts'
import RouterComponent from './Router/AppRouter'


function App() {

  return<>
  <Router>
    <AuthProvider>
      <RouterComponent />
       <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
    </AuthProvider>
  </Router>
  </>
  
}

export default App
