import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react';

// Mock orders data - debe coincidir con Dashboard
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2026-05-25',
    total: 95000,
    status: 'Entregado',
    statusColor: 'bg-green-500',
    items: [
      { name: 'Huevos al Por Mayor', quantity: 1, price: 95000, image: '📦' }
    ],
    address: 'Calle 123 #45-67, Bogotá, Colombia',
    paymentMethod: 'Tarjeta de crédito ****1234',
    estimatedDelivery: '2026-05-27'
  },
  {
    id: 'ORD-002',
    date: '2026-05-20',
    total: 50000,
    status: 'Enviado',
    statusColor: 'bg-blue-500',
    items: [
      { name: 'Huevos Campesinos', quantity: 1, price: 39000, image: '🌿' },
      { name: 'Huevos por Cubeta', quantity: 1, price: 11000, image: '🥚' }
    ],
    address: 'Carrera 7 #10-20, Bogotá, Colombia',
    paymentMethod: 'Tarjeta de crédito ****1234',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2026-05-28'
  },
  {
    id: 'ORD-003',
    date: '2026-05-15',
    total: 39000,
    status: 'Pendiente',
    statusColor: 'bg-yellow-500',
    items: [
      { name: 'Huevos Campesinos', quantity: 1, price: 39000, image: '🌿' }
    ],
    address: 'Avenida 68 #25-30, Bogotá, Colombia',
    paymentMethod: 'PSE',
    estimatedDelivery: '2026-05-30'
  }
];

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Buscar la orden
  const order = mockOrders.find(o => o.id === orderId);

  // Si no se encuentra la orden, redirigir
  if (!order) {
    navigate('/dashboard');
    return null;
  }

  // Calcular subtotal
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Envío gratis
  const total = subtotal + shipping;

  // Timeline según el estado
  const getTimeline = () => {
    const steps = [
      { label: 'Pedido Recibido', icon: CheckCircle, completed: true },
      { label: 'En Preparación', icon: Package, completed: order.status !== 'Pendiente' },
      { label: 'Enviado', icon: Truck, completed: order.status === 'Enviado' || order.status === 'Entregado' },
      { label: 'Entregado', icon: CheckCircle, completed: order.status === 'Entregado' }
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-[#E8E4D9]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Link to="/dashboard">
            <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Volver a Mis Pedidos
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Pedido {order.id}
              </h1>
              <p className="text-gray-600">
                Realizado el {new Date(order.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <span className={`${order.statusColor} text-white px-6 py-3 rounded-full text-lg font-bold self-start md:self-center`}>
              {order.status}
            </span>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-md mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Truck className="w-6 h-6 text-amber-600" />
            Estado del Envío
          </h2>

          <div className="relative">
            {/* Timeline */}
            <div className="flex justify-between items-start">
              {getTimeline().map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 relative">
                    {/* Line connector */}
                    {index < getTimeline().length - 1 && (
                      <div className={`absolute top-6 left-1/2 w-full h-1 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`} style={{ zIndex: 0 }} />
                    )}

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Label */}
                    <p className={`mt-3 text-sm font-semibold text-center ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600">Número de seguimiento:</p>
              <p className="text-lg font-bold text-amber-600">{order.trackingNumber}</p>
            </div>
          )}

          {/* Estimated Delivery */}
          {order.status !== 'Entregado' && (
            <div className="mt-4 flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <p>
                <span className="font-semibold">Entrega estimada:</span>{' '}
                {new Date(order.estimatedDelivery).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                Productos
              </h2>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-4xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-xl text-amber-600">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                  <span>Total:</span>
                  <span className="text-amber-600">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Dirección de Envío
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {order.address}
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                Método de Pago
              </h3>
              <p className="text-gray-700">
                {order.paymentMethod}
              </p>
            </div>

            {/* Reorder Button */}
            <Link to="/comprar">
              <button className="w-full bg-amber-600 text-white py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg">
                Volver a Pedir
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default OrderDetail;
