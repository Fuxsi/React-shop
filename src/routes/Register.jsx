import RegisterForm from "../assets/components/Forms/NewProduct"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";



const RegisterPage = () => {
        const location = useLocation();
        console.log(location);
        const fromRegister = location?.state?.fromRegister;
        const [user, setUser] = useState(true);
        const navigate = useNavigate();
    
        useEffect(() => {
            if (user) navigate("/products");
        }, [user]);
    return (
    <>
        <RegisterForm fromRegister={fromRegister}/>
            <div>
                 Masz już konto?  <NavLink to="/login">Zaloguj się</NavLink>
            </div>
    </>
    );
}

export default RegisterPage;