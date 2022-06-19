import { Outlet, Navigate } from "react-router-dom";
import Acceuil from "./components/acceuil";
import Connection from "./components/se_connecter";

const useAuth = () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role == "admin"){
        return true;
    }
    else{
        return false;
    }
}

const ProtectedRoutes = () =>{
    const auth = useAuth();
    return auth?<Outlet/>: <Navigate to="/"/>
};

export default ProtectedRoutes;