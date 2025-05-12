
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../assets/components/Forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const LoginPage =() => {
    const location = useLocation();
    console.log(location);
    const fromRegister = location?.state?.fromRegister;
    const { user, refreshUser} = useAuth();
    // const [user, setUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/products");
    }, [user]);
    return (
        <>
            <LoginForm fromRegister={fromRegister} />
                <div>
                    Pierwszy raz? <NavLink to="/register">Zarejestruj się</NavLink>
                </div>
        </>
    );
}



export default LoginPage;