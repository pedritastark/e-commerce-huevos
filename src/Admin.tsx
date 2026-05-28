import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  Search,
  Filter,
  Eye,
  RefreshCw,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  total: number;
  payment_method: string;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  email_sent: boolean;
  created_at: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price_per_unit: number;
  total: number;
}

interface Stats {
  totalOrders: number;
  pendingRevenue: number;
  processingRevenue: number;
  completedRevenue: number;
  canceledRevenue: number;
  todayOrders: number;
}

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingRevenue: 0,
    processingRevenue: 0,
    completedRevenue: 0,
    canceledRevenue: 0,
    todayOrders: 0
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);

      // Load orders with items
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_name,
            quantity,
            price_per_unit,
            total
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user emails
      const ordersWithEmails = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: userData } = await supabase
            .from('profiles')
            .select('email:id')
            .eq('id', order.user_id)
            .single();

          return {
            ...order,
            customer_email: userData?.email || 'N/A',
            items: order.order_items
          };
        })
      );

      setOrders(ordersWithEmails);

      // Calculate stats by status
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = ordersWithEmails.filter(o =>
        o.created_at.startsWith(today)
      ).length;

      const pendingRevenue = ordersWithEmails
        .filter(o => o.status === 'pendiente')
        .reduce((sum, o) => sum + o.total, 0);

      const processingRevenue = ordersWithEmails
        .filter(o => o.status === 'en_proceso')
        .reduce((sum, o) => sum + o.total, 0);

      const completedRevenue = ordersWithEmails
        .filter(o => o.status === 'completado')
        .reduce((sum, o) => sum + o.total, 0);

      const canceledRevenue = ordersWithEmails
        .filter(o => o.status === 'cancelado')
        .reduce((sum, o) => sum + o.total, 0);

      setStats({
        totalOrders: ordersWithEmails.length,
        pendingRevenue,
        processingRevenue,
        completedRevenue,
        canceledRevenue,
        todayOrders
      });

    } catch (error: any) {
      console.error('Error loading orders:', error);
      toast.error('Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(o =>
        o.order_number.toLowerCase().includes(term) ||
        o.customer_name.toLowerCase().includes(term) ||
        o.customer_email.toLowerCase().includes(term) ||
        o.customer_phone.includes(term)
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Estado actualizado');
      loadOrders();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Error al actualizar estado');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'pendiente': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendiente' },
      'en_proceso': { color: 'bg-blue-100 text-blue-800', icon: RefreshCw, label: 'En Proceso' },
      'completado': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Completado' },
      'cancelado': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelado' }
    };

    const badge = badges[status as keyof typeof badges] || badges.pendiente;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-2xl font-bold text-amber-600">
                AVÍCOLA LAS PALMAS
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Admin: {user?.email}
              </span>
              <button
                onClick={() => logout()}
                className="text-sm text-red-600 hover:text-red-700 font-bold"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h2>
          <p className="text-gray-600">
            Gestiona todos los pedidos de la tienda
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                {stats.totalOrders}
              </span>
            </div>
            <p className="text-xs text-gray-600">Total Pedidos</p>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow p-4 border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-1">
              <Clock className="w-6 h-6 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-900">
                ${stats.pendingRevenue.toLocaleString('es-CO')}
              </span>
            </div>
            <p className="text-xs text-yellow-700 font-medium">⏳ Pendientes</p>
          </div>

          <div className="bg-blue-50 rounded-lg shadow p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-1">
              <RefreshCw className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">
                ${stats.processingRevenue.toLocaleString('es-CO')}
              </span>
            </div>
            <p className="text-xs text-blue-700 font-medium">🔄 En Proceso</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow p-4 border-2 border-green-200">
            <div className="flex items-center justify-between mb-1">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="text-sm font-bold text-green-900">
                ${stats.completedRevenue.toLocaleString('es-CO')}
              </span>
            </div>
            <p className="text-xs text-green-700 font-medium">✅ Completados</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow p-4 border-2 border-red-200">
            <div className="flex items-center justify-between mb-1">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="text-sm font-bold text-red-900">
                ${stats.canceledRevenue.toLocaleString('es-CO')}
              </span>
            </div>
            <p className="text-xs text-red-700 font-medium">❌ Cancelados</p>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Pedidos de Hoy</p>
              <p className="text-white text-3xl font-bold">{stats.todayOrders}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-white/30" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por orden, cliente, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 appearance-none"
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <button
            onClick={loadOrders}
            className="mt-4 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No se encontraron pedidos
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {order.order_number}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.payment_method}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customer_phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${order.total.toLocaleString('es-CO')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('es-CO')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-amber-600 hover:text-amber-700 font-bold"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Detalles del Pedido
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Order Info */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Número de Orden</p>
                    <p className="font-bold text-gray-900">{selectedOrder.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-medium text-gray-900">{selectedOrder.customer_name}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="text-sm text-gray-900">{selectedOrder.delivery_address}</p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.delivery_city}, {selectedOrder.delivery_state}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Productos</p>
                  <div className="border border-gray-200 rounded-lg divide-y">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="p-3 flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.product_name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">
                          ${item.total.toLocaleString('es-CO')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <p className="text-lg font-bold text-gray-900">TOTAL</p>
                  <p className="text-2xl font-bold text-amber-600">
                    ${selectedOrder.total.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>

              {/* Change Status */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-bold text-gray-700 mb-2">Cambiar Estado</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'en_proceso');
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm"
                  >
                    En Proceso
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'completado');
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-sm"
                  >
                    Completado
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'cancelado');
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-bold text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Admin;
