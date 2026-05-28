import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
import ForgotPassword from './ForgotPassword.tsx'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import TermsOfService from './TermsOfService.tsx'
import RefundPolicy from './RefundPolicy.tsx'
import Admin from './Admin.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                fontSize: '14px',
                fontWeight: '600',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            } />
            <Route path="/pedido/:orderId" element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />
            <Route path="/terminos" element={<TermsOfService />} />
            <Route path="/reembolsos" element={<RefundPolicy />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
