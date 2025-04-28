import LoginForm from "../assets/components/Forms/LoginForm"
import { NavLink } from "react-router-dom";

const LoginPage =() => {
    return (
        <>
            <LoginForm/>
                <div>
                    Pierwszy raz? <NavLink to="/register">Zarejestruj się</NavLink>
                </div>
        </>
    );
}

export default LoginPage;