import './App.css'
import Header from './assets/components/Header'
import ProductList from './assets/components/product/ProductList'
import LoginForm from './assets/components/Forms/LoginForm'
import RegisterForm from './assets/components/Forms/RegisterForm'
import NewProduct from './assets/components/Forms/NewProduct'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './routes/Login'
import RegisterPage from './routes/Register'
import ProductsPage from './routes/Products'
import HomePage from './routes/Home'




function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/products" element={<ProductsPage/>} />
    </Routes>
  )
}

export default App
