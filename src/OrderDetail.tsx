import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useAuth } from './contexts/AuthContext';

// Helper function to get status color and label
const getStatusDisplay = (status: string) => {
  const statusMap: { [key: string]: { label: string; color: string } } = {
    pendiente: { label: 'Pendiente', color: 'bg-yellow-500' },
    en_proceso: { label: 'En Proceso', color: 'bg-blue-500' },
    completado: { label: 'Completado', color: 'bg-green-500' },
    cancelado: { label: 'Cancelado', color: 'bg-red-500' }
  };
  return statusMap[status] || { label: status, color: 'bg-gray-500' };
};

// Mock orders data - DEPRECATED, now using Supabase
const defaultOrders = [
  {
    id: 'ORD-001',
    date: '2026-05-25',
    total: 95000,
    status: 'Entregado',
    statusColor: 'bg-green-500',
    items: [
      {
        name: 'Huevos al Por Mayor',
        description: 'Torre de 10 cubetas',
        quantity: 10,
        unit: 'cubetas',
        eggsPerUnit: 30,
        pricePerUnit: 9500,
        price: 95000,
        image: '📦'
      }
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
      {
        name: 'Huevos Campesinos',
        description: 'Cubeta de huevos campesinos',
        quantity: 3,
        unit: 'cubetas',
        eggsPerUnit: 30,
        pricePerUnit: 13000,
        price: 39000,
        image: '🌿'
      },
      {
        name: 'Huevos por Cubeta (AA)',
        description: 'Cubeta de huevos categoría AA',
        quantity: 1,
        unit: 'cubeta',
        eggsPerUnit: 30,
        pricePerUnit: 11000,
        price: 11000,
        image: '🥚'
      }
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
      {
        name: 'Huevos Campesinos',
        description: 'Cubeta de huevos campesinos',
        quantity: 3,
        unit: 'cubetas',
        eggsPerUnit: 30,
        pricePerUnit: 13000,
        price: 39000,
        image: '🌿'
      }
    ],
    address: 'Avenida 68 #25-30, Bogotá, Colombia',
    paymentMethod: 'PSE',
    estimatedDelivery: '2026-05-30'
  }
];

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Cargar pedido desde Supabase
  useEffect(() => {
    const loadOrder = async () => {
      if (!user || !orderId) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_name,
              product_description,
              quantity,
              price_per_unit,
              total
            )
          `)
          .eq('order_number', orderId)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setOrder({
            id: data.order_number,
            date: data.created_at,
            total: data.total,
            status: data.status,
            items: data.order_items?.map((item: any) => ({
              name: item.product_name,
              description: item.product_description || '',
              quantity: item.quantity,
              pricePerUnit: item.price_per_unit,
              price: item.total,
              image: '📦'
            })) || [],
            address: `${data.delivery_address}, ${data.delivery_city}, ${data.delivery_state}`,
            paymentMethod: data.payment_method === 'efectivo' ? 'Efectivo' : 'Transferencia',
            customerName: data.customer_name,
            customerPhone: data.customer_phone
          });
        }
      } catch (error) {
        console.error('Error loading order:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, orderId, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedido...</p>
        </div>
      </div>
    );
  }

  // Si no se encuentra la orden, redirigir
  if (!order) {
    navigate('/dashboard');
    return null;
  }

  // Calcular subtotal
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Envío gratis
  const total = subtotal + shipping;

  // Calcular fecha estimada de entrega basada en el estado
  const getEstimatedDelivery = () => {
    const orderDate = new Date(order.date);
    const daysToAdd = order.status === 'pendiente' ? 5 : order.status === 'en_proceso' ? 3 : 0;

    if (daysToAdd === 0) return null; // No mostrar para completado o cancelado

    const estimatedDate = new Date(orderDate);
    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
    return estimatedDate;
  };

  const estimatedDelivery = getEstimatedDelivery();

  // Timeline según el estado (solo muestra pasos relevantes)
  const getTimeline = () => {
    const status = order.status;

    // Define todos los pasos posibles
    const allSteps = [
      { label: 'Pedido Recibido', icon: CheckCircle, status: 'pendiente' },
      { label: 'En Proceso', icon: Package, status: 'en_proceso' },
      { label: 'Completado', icon: CheckCircle, status: 'completado' }
    ];

    // Mapeo de estados a índice de paso completado
    const statusToStep: { [key: string]: number } = {
      'pendiente': 0,
      'en_proceso': 1,
      'completado': 2,
      'cancelado': -1 // No mostrar timeline si está cancelado
    };

    const currentStep = statusToStep[status] ?? 0;

    // Si está cancelado, no mostrar timeline
    if (currentStep === -1) {
      return [];
    }

    // Marcar steps como completados según el estado actual
    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentStep
    }));
  };

  return (
    <div className="min-h-screen bg-white">
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
            <span className={`${getStatusDisplay(order.status).color} text-white px-6 py-3 rounded-full text-lg font-bold self-start md:self-center`}>
              {getStatusDisplay(order.status).label}
            </span>
          </div>
        </motion.div>

        {/* Unified Order Detail Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#E8E4D9] rounded-2xl p-8 shadow-md"
        >
          {/* Estado del Envío */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Truck className="w-6 h-6 text-amber-600" />
              Estado del Envío
            </h2>

            <div className="relative">
              {/* Timeline */}
              <div className="flex justify-between items-start mb-6">
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

            {/* Estimated Delivery */}
            {estimatedDelivery && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <p>
                  <span className="font-semibold">Entrega estimada:</span>{' '}
                  {estimatedDelivery.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Productos */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-amber-600" />
              Productos
            </h2>

            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="pb-6 border-b border-gray-300 last:border-0">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                      {/* Detalles del producto */}
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">Cantidad:</span>
                          <span className="text-gray-900">{item.quantity} {item.unit} × {item.eggsPerUnit} huevos = {item.quantity * item.eggsPerUnit} huevos totales</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">Precio por {item.unit === 'cubetas' && item.quantity > 1 ? 'cubeta' : item.unit}:</span>
                          <span className="text-gray-900">${item.pricePerUnit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Precio total del producto */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                      <p className="font-bold text-xl text-amber-600">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Detalles de Envío y Pago */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Dirección de Envío */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Dirección de Envío
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {order.address}
              </p>
            </div>

            {/* Método de Pago */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                Método de Pago
              </h3>
              <p className="text-gray-700">
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Resumen Total */}
          <div className="space-y-2">
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
        </motion.div>
      </main>
    </div>
  );
}

export default OrderDetail;
