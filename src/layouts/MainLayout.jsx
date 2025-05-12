// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const MainLayout = () =>{
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         logout();
//         navigate("/login");}
//     return (
//         <>
//         <div>To jest nagłówek strony
//             {user ? ( 
//                 <>
//                     <NavLink to="">Home</NavLink>
//                     <NavLink to="/products">Produkty</NavLink>
//                     <button onClick={handleLogout}>Wyloguj się</button>
//                 </>
//             ) : (
//                 <>
//                     <NavLink to="/login">Logowanie</NavLink>
//                     <NavLink to="/register">Rejestracja</NavLink>
//                 </>
//             )}

//         </div>
//             <Outlet/>
//             <footer>Stopka</footer>
//         </>
//     )
// }

// export default MainLayout;

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import Cart from "../routes/Cart"

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleLogout = () => {
    logout(); // wyloguj użytkownika
    navigate("/"); // przenieś na stronę główną
  };

  return (
    <>
      <p>Przedmioty w koszyku: {cartItems?.lenght} | Cena całkowita: {cartSum}zł</p>
      <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-medium">To jest nagłówek strony</div>
        <div className="flex gap-4">
          {user ? (
            <>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
              <NavLink to="/products" className="hover:underline">
                Produkty
              </NavLink>
              <NavLink to="/cart" className="hover:underline">
                Koszyk ({cartItems.length})
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:underline">
                Logowanie
              </NavLink>
              <NavLink to="/register" className="hover:underline">
                Rejestracja
              </NavLink>
            </>
          )}
        </div>
      </div>

      <Outlet />

      <footer className="text-center text-gray-500 text-sm p-4">
        This is the footer
      </footer>
    </>
  );
};

export default MainLayout;