import { Outlet, Navigate } from "react-router-dom";
import Acceuil from "./components/acceuil";
import Connection from "./components/se_connecter";

const useAuth = () =>{
    const user = localStorage.getItem('user');
    if(user){
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