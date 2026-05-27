import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Lock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

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
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
              {items.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                </p>
              )}
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                /* Empty Cart */
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Agrega productos para comenzar tu compra
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/comprar');
                    }}
                    className="bg-amber-600 text-white px-6 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors"
                  >
                    Ir a la Tienda
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{item.image}</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight pr-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {item.description && (
                          <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                        )}

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-600 hover:bg-amber-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="text-sm font-bold text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-gray-500">
                              ${item.price.toLocaleString()} c/u
                            </span>
                          </div>
                          <span className="text-base font-bold text-amber-600">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    TOTAL ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})
                  </span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-3 rounded-full font-bold text-base hover:bg-amber-700 transition-colors mb-2 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  PROCEDER AL PAGO
                </button>

                {/* Terms */}
                <p className="text-xs text-center text-gray-500 leading-tight">
                  Envío gratis en todos los pedidos
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;
