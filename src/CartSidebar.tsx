import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  deliveryDays?: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Torre de Huevos A - 1 Caja (4 docenas)',
      image: '🥚',
      price: 31.20,
      originalPrice: 39.00,
      quantity: 1,
      deliveryDays: 30,
    },
    {
      id: 2,
      name: 'Huevos Campesino - 4 Paquetes',
      image: '🐔',
      price: 0.00,
      originalPrice: 9.75,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Cubeta de Huevos AA - Regalo de suscriptor',
      image: '🪣',
      price: 0.00,
      originalPrice: 39.00,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[200]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  ← SEGUIR COMPRANDO
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{item.image}</span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900 text-xs leading-tight pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5 text-gray-600" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5 text-gray-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-amber-600">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && item.originalPrice !== item.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Delivery Info */}
                      {item.deliveryDays && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Entregado cada {item.deliveryDays} días
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer - Checkout */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {/* Savings */}
              {savings > 0 && (
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-gray-700">AHORROS</span>
                  <span className="text-xs font-bold text-green-600">+${savings.toFixed(2)}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-900">
                  SUBTOTAL ({totalItems} ARTÍCULO{totalItems !== 1 ? 'S' : ''})
                </span>
                <span className="text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-full font-bold text-sm hover:bg-orange-700 transition-colors mb-2 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                PAGAR SEGURO
              </button>

              {/* Terms */}
              <p className="text-[10px] text-center text-gray-500 leading-tight">
                Prueba sin riesgo. 100% garantía de satisfacción. Ver términos de uso.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;
