import RegisterForm from "../assets/components/Forms/NewProduct"
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
    return (
    <>
        <RegisterForm/>
            <div>
                 Masz już konto?  <NavLink to="/login">Zaloguj się</NavLink>
            </div>
    </>
    );
}

export default RegisterPage;