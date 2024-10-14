import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from './context/Auth/AuthProvider'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import CartProvider from './context/Cart/CartProvider'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import MyOrdersPage from './pages/MyOrdersPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<ErrorPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/order-success' element={<OrderSuccessPage />} />
              <Route path='/my-orders' element={<MyOrdersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
