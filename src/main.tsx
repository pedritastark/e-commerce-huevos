import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Recipes from './Recipes.tsx'
import Farm from './Farm.tsx'
import Shop from './Shop.tsx'
import ProductDetail from './ProductDetail.tsx'
import BundleBuilder from './BundleBuilder.tsx'
import Login from './Login.tsx'
import Register from './Register.tsx'
import VerifyEmail from './VerifyEmail.tsx'
import Checkout from './Checkout.tsx'
import Dashboard from './Dashboard.tsx'
import OrderDetail from './OrderDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recetas" element={<Recipes />} />
        <Route path="/granja" element={<Farm />} />
        <Route path="/comprar" element={<Shop />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/arma-tu-paquete" element={<BundleBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pedido/:orderId" element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
