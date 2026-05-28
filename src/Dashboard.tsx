import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Package, Edit3, Save, X } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import toast from 'react-hot-toast';
import type { Order } from './lib/supabase';

// Helper function to map status to display format
const getStatusDisplay = (status: Order['status']) => {
  const statusMap = {
    pendiente: { label: 'Pendiente', color: 'bg-yellow-500' },
    confirmado: { label: 'Confirmado', color: 'bg-blue-500' },
    en_camino: { label: 'En Camino', color: 'bg-purple-500' },
    entregado: { label: 'Entregado', color: 'bg-green-500' },
    cancelado: { label: 'Cancelado', color: 'bg-red-500' }
  };
  return statusMap[status] || { label: 'Desconocido', color: 'bg-gray-500' };
};

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  // Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: 'Cundinamarca'
  });
  const [originalProfileData, setOriginalProfileData] = useState({...profileData});

  const userName = user?.email || 'Usuario';

  // Cargar perfil del usuario
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, phone, address, city, state')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          const profile = {
            full_name: data.full_name || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || 'Cundinamarca'
          };
          setProfileData(profile);
          setOriginalProfileData(profile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [user]);

  // Cargar pedidos de Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              product_name,
              quantity,
              price_per_unit,
              total
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
        } else if (data) {
          // Transformar datos para el formato del componente
          const transformedOrders = data.map((order: any) => {
            const statusDisplay = getStatusDisplay(order.status);
            return {
              id: order.order_number,
              date: new Date(order.created_at).toISOString().split('T')[0],
              total: order.total,
              status: statusDisplay.label,
              statusColor: statusDisplay.color,
              items: order.order_items.map((item: any) => ({
                name: item.product_name,
                quantity: item.quantity,
                price: item.total
              })),
              address: `${order.delivery_address}, ${order.delivery_city}, ${order.delivery_state}`,
              paymentMethod: order.payment_method === 'efectivo' ? 'Efectivo' : 'Transferencia bancaria'
            };
          });
          setOrders(transformedOrders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
          address: profileData.address,
          city: profileData.city,
          state: profileData.state
        })
        .eq('id', user.id);

      if (error) throw error;

      setOriginalProfileData(profileData);
      setIsEditingProfile(false);
      toast.success('Perfil actualizado correctamente');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleCancelEdit = () => {
    setProfileData(originalProfileData);
    setIsEditingProfile(false);
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
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            ¡Hola, {profileData.full_name || userName.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tus pedidos y actualiza tu perfil
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 px-2 font-bold text-lg transition-colors relative ${
                activeTab === 'orders'
                  ? 'text-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Mis Pedidos
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm font-bold">
                  {orders.length}
                </span>
              </div>
              {activeTab === 'orders' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-2 font-bold text-lg transition-colors relative ${
                activeTab === 'profile'
                  ? 'text-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Mi Perfil
              </div>
              {activeTab === 'profile' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600"
                />
              )}
            </button>
          </div>
        </div>

        {/* Orders Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mis Pedidos</h2>
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

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#E8E4D9] rounded-2xl p-12 text-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando pedidos...</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && orders.length === 0 && (
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
        )}

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-bold transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold text-sm mb-2">
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                    disabled={!isEditingProfile}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-sm ${
                      isEditingProfile
                        ? 'border-gray-200 focus:outline-none focus:border-amber-600'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                    placeholder="Juan Pérez"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-bold text-sm mb-2">
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditingProfile}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-sm ${
                      isEditingProfile
                        ? 'border-gray-200 focus:outline-none focus:border-amber-600'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                    placeholder="3001234567"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-gray-700 font-bold text-sm mb-2">
                    CIUDAD
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    disabled={!isEditingProfile}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-sm ${
                      isEditingProfile
                        ? 'border-gray-200 focus:outline-none focus:border-amber-600'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                    placeholder="Bogotá"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold text-sm mb-2">
                    DIRECCIÓN
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditingProfile}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-sm ${
                      isEditingProfile
                        ? 'border-gray-200 focus:outline-none focus:border-amber-600'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                    placeholder="Calle 123 # 45-67"
                  />
                </div>

                {/* State */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold text-sm mb-2">
                    DEPARTAMENTO
                  </label>
                  <input
                    type="text"
                    value={profileData.state}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-100 rounded-xl text-sm text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Por ahora solo operamos en Cundinamarca
                  </p>
                </div>
              </div>

              {isEditingProfile && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    💡 <strong>Tip:</strong> Mantén tu información actualizada para que tus pedidos lleguen correctamente.
                  </p>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Información de Cuenta</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de Pedidos:</span>
                  <span className="font-medium text-gray-900">{orders.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
