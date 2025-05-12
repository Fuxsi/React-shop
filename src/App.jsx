
// import Header from './assets/components/Header';
// import ProductList from './assets/components/product/ProductList';
// import LoginForm from './assets/components/Forms/LoginForm';
// import RegisterForm from './assets/components/Forms/RegisterForm';
// import NewProduct from './assets/components/Forms/NewProduct';

import './App.css'
import { Routes, Route, Navigate} from 'react-router-dom';

import HomePage from "./routes/Home"
import RegisterPage from "./routes/Register";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "../src/assets/components/ProtectedRoute"
import Cart from "./routes/Cart";
import { useAuth } from "./hooks/useAuth";
import useSWR from "swr";
import { AuthProvider } from "./context/AuthContext";
import { fetcher } from './utils/fetch';
import LoginPage from "./routes/Login"
import { lazy, Suspense } from 'react';





function App() {
  const {user} = useAuth();
  const {data} = useSWR(`https://fakestoreapi.com/users`, fetcher);
  const ProductsPage = lazy(() => import('./routes/Products.tsx'));
  


  return (
   
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout/>}/>
        <Route path="/products" element={ <Suspense><ProductsPage /></Suspense> } />
        <Route path="/products/:id" element={user ? <ProductsDetailsPage/> : <Navigate to="/login" replace/>} />
        <Route path="/" index  element={<HomePage/>} />
        <Route 
          path="/products"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Ładowanie...</div>}>
                <ProductsPage/>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" replace/> } />
        <Route path="/products/:id" element={user ? <ProductsDetailsPage/> : <Navigate to="/login" replace/>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
