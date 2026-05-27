import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Package } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useState, useEffect } from 'react';

// Mock orders data - En producción vendría del backend
const defaultOrders = [
  {
    id: 'ORD-001',
    date: '2026-05-25',
    total: 95000,
    status: 'Entregado',
    statusColor: 'bg-green-500',
    items: [
      { name: 'Huevos al Por Mayor', quantity: 1, price: 95000 }
    ],
    address: 'Calle 123 #45-67, Bogotá, Colombia',
    paymentMethod: 'Tarjeta de crédito ****1234'
  },
  {
    id: 'ORD-002',
    date: '2026-05-20',
    total: 50000,
    status: 'Enviado',
    statusColor: 'bg-blue-500',
    items: [
      { name: 'Huevos Campesinos', quantity: 1, price: 39000 },
      { name: 'Huevos por Cubeta', quantity: 1, price: 11000 }
    ],
    address: 'Carrera 7 #10-20, Bogotá, Colombia',
    paymentMethod: 'Tarjeta de crédito ****1234',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-003',
    date: '2026-05-15',
    total: 39000,
    status: 'Pendiente',
    statusColor: 'bg-yellow-500',
    items: [
      { name: 'Huevos Campesinos', quantity: 1, price: 39000 }
    ],
    address: 'Avenida 68 #25-30, Bogotá, Colombia',
    paymentMethod: 'PSE'
  }
];

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState(defaultOrders);

  const userName = user?.name || 'Usuario';

  // Cargar pedidos del localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (savedOrders.length > 0) {
      // Combinar pedidos guardados con los de ejemplo
      setOrders([...savedOrders.reverse(), ...defaultOrders]);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
          {/* Left Side - Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold relative cursor-pointer"
            >
              <span className="text-amber-600 flex flex-col leading-none font-serif">
                <span>AVICOLA</span>
                <span>LAS PALMAS</span>
              </span>
            </motion.div>
          </Link>

          {/* Right Side - User Menu */}
          <div className="flex items-center gap-4">
            {/* User Name */}
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-semibold">{userName}</span>
            </div>

            {/* Back to Shop */}
            <Link to="/comprar">
              <button className="px-5 py-2 rounded-full font-bold text-base transition-colors border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                Volver a la Tienda
              </button>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            ¡Hola, {userName.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Aquí puedes ver todos tus pedidos
          </p>
        </motion.div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900">Mis Pedidos</h2>
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {orders.length}
            </span>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/pedido/${order.id}`}>
                  <div className="bg-[#E8E4D9] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-600">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Left Side - Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            Pedido {order.id}
                          </h3>
                          <span className={`${order.statusColor} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                            {order.status}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Fecha:</span> {new Date(order.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>

                        <p className="text-gray-600">
                          <span className="font-semibold">Productos:</span> {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
                        </p>
                      </div>

                      {/* Right Side - Price & Action */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Total</p>
                          <p className="text-3xl font-bold text-amber-600">
                            ${order.total.toLocaleString()}
                          </p>
                        </div>

                        <div className="text-amber-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#E8E4D9] rounded-2xl p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No tienes pedidos aún
              </h3>
              <p className="text-gray-600 mb-6">
                ¡Empieza a comprar nuestros productos frescos!
              </p>
              <Link to="/comprar">
                <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors">
                  Ir a la Tienda
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
