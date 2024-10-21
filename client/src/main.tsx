import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import { AuthProvider } from './context/auth'
import { CartProvider } from './context/cart'
import { SearchProvider } from './context/search'
import './index.css'
createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)