import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import { systemRoles } from "../../utils/systemRoles";
import { jwtDecode } from "jwt-decode";



const UserRoute = () => {
  const { isAuthenticated , token } = useAuth();
  let Decodedtoken;
  if(token){
    Decodedtoken = jwtDecode(token);
  };
  // If user isn’t logged in → redirect to /login
  return isAuthenticated && Decodedtoken?.role!== systemRoles.ADMIN ? <Outlet /> :isAuthenticated && Decodedtoken?.role=== systemRoles.ADMIN ?<Navigate to="/admin-panel" replace /> :  <Navigate to="/login" replace />;
};

const GuestRoute = () => {
  const { isAuthenticated , token } = useAuth(); 
  return  isAuthenticated && token  ? <Navigate to="/" replace />: <Outlet />;
};


const AdminRoute = () => {
  const { isAuthenticated , token } = useAuth();   
   
   let Decodedtoken;
  if(token){
    Decodedtoken = jwtDecode(token);
  };
  
  return isAuthenticated && Decodedtoken?.role === systemRoles.ADMIN ? <Outlet /> : <Navigate to="/login" replace />;
}
export { UserRoute, AdminRoute , GuestRoute };