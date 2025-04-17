import './App.css'
import Header from './assets/components/Header'
import ProductList from './assets/components/product/ProductList'
import tailwindcss from '@tailwindcss/vite'

const mockUser = {
  name: "John Doe"
}

function App() {
  

  return (
    <div style={{display: "flex", flexDirection: "column"}}> 
      <Header user={mockUser}/> 
      <ProductList/>
    </div>
  )
}

export default App
