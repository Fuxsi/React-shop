import { Link, NavLink } from "react-router-dom";


const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application</p>
            <Link to="/login">Logowanie</Link>
            <NavLink to="/register">Rejestracja</NavLink>
            <Link to="/products">Lista Produktów</Link>
            
        </div>
        // w rejestreacji do logowanie w logowaniu do rejestracji
    );
}
export default HomePage;