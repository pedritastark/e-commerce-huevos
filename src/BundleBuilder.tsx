import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, ChevronDown, Info } from 'lucide-react';
import { useState } from 'react';

// Varieties for "Huevos por Cubeta"
const cubetaVarieties = [
  { id: 'jumbo', name: 'Jumbo', price: 25500, weight: 'Más de 78g', emoji: '🥚' },
  { id: 'extra', name: 'Extra', price: 23000, weight: '70g a 77.9g', emoji: '🥚' },
  { id: 'aaa', name: 'AAA', price: 19800, weight: '64g a 69.9g', emoji: '🥚' },
  { id: 'aa', name: 'AA', price: 16500, weight: '60g a 63.9g', emoji: '🥚' },
  { id: 'a', name: 'A', price: 14900, weight: '53g a 59.9g', emoji: '🥚' },
  { id: 'b', name: 'B', price: 13000, weight: '46g a 52.9g', emoji: '🥚' },
  { id: 'c', name: 'C', price: 11000, weight: 'Menos de 46g', emoji: '🥚' },
];

interface Product {
  id: string;
  name: string;
  type: 'campesinos' | 'cubeta';
  variety?: string;
  price: number;
  emoji: string;
}

function BundleBuilder() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bundleSize, setBundleSize] = useState(3);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('subscribe');
  const [deliveryFrequency, setDeliveryFrequency] = useState('30');

  const addProduct = (product: Product) => {
    if (selectedProducts.length < bundleSize) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return selectedProducts.reduce((sum, product) => sum + product.price, 0);
  };

  const getBundleSavings = () => {
    if (bundleSize === 3) return 2000;
    if (bundleSize === 4) return 5000;
    return 0;
  };

  const basePrice = getTotalPrice() - getBundleSavings();
  const originalPrice = getTotalPrice();
  const subscriptionPrice = Math.round(basePrice * 0.95); // 5% discount
  const subscriptionOriginalPrice = originalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 z-50">
        <div className="flex items-center justify-between max-w-full pl-6 pr-6 py-5">
          <div className="flex items-center gap-10">
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

            <nav className="hidden lg:flex items-center gap-8">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className="px-5 py-2 rounded-full font-bold text-base transition-colors border-2 flex items-center gap-2 bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Encuéntranos
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-lg transition-colors text-gray-700 hover:text-amber-600 flex items-center gap-1"
              >
                Nuestros productos
                <ChevronDown className="w-5 h-5" />
              </motion.button>

              <Link to="/granja">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-bold text-lg transition-colors text-gray-700 hover:text-amber-600"
                >
                  Nuestra Granja
                </motion.button>
              </Link>

              <Link to="/recetas">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-lg transition-colors text-gray-700 hover:text-amber-600"
                >
                  Recetas
                </motion.button>
              </Link>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative hidden md:block group">
              <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold z-10 bg-white text-amber-600">
                POPULAR
              </span>
              <button className="px-7 py-3 rounded-full font-bold text-base border-2 bg-amber-600 text-white border-amber-600 cursor-pointer">
                ARMA TU PAQUETE
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="w-6 h-6 text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold bg-amber-600 text-white">
                0
              </span>
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-[80px] left-0 right-0 bg-white z-40 shadow-lg py-12"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xl font-bold text-amber-600 mb-8">PRODUCTOS DESTACADOS</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/producto/1" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">📦</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS AL POR MAYOR</h4>
              </Link>

              <Link to="/producto/2" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">🌿</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS CAMPESINOS</h4>
              </Link>

              <Link to="/producto/3" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">🥚</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS POR CUBETA</h4>
              </Link>

              <Link to="/comprar" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">🛒</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">VER TODOS</h4>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_500px] gap-8">
          {/* Left Side - Best Sellers */}
          <div>
            <h2 className="text-4xl font-bold text-amber-900 mb-8">PRODUCTOS DESTACADOS</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Huevos Campesinos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-100 rounded-3xl p-4 border-2 border-amber-900 flex flex-col"
              >
                <div className="bg-white rounded-2xl mb-3 aspect-[3/4] flex items-center justify-center">
                  <span className="text-7xl">🌿</span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <h3 className="text-sm font-bold text-amber-900 text-center">HUEVOS CAMPESINOS</h3>
                  <Info className="w-4 h-4 text-amber-900" />
                </div>
                <button
                  onClick={() => addProduct({
                    id: 'campesinos',
                    name: 'Huevos Campesinos',
                    type: 'campesinos',
                    price: 39000,
                    emoji: '🌿'
                  })}
                  disabled={selectedProducts.length >= bundleSize}
                  className="w-full bg-amber-900 text-white py-2 rounded-full font-bold text-sm hover:bg-amber-800 transition-colors disabled:bg-gray-400"
                >
                  + AGREGAR
                </button>
              </motion.div>

              {/* Huevos por Cubeta - Varieties */}
              {cubetaVarieties.map((variety, index) => (
                <motion.div
                  key={variety.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-amber-100 rounded-3xl p-4 border-2 border-amber-900 flex flex-col"
                >
                  <div className="bg-white rounded-2xl mb-3 aspect-[3/4] flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl">{variety.emoji}</span>
                      <div className="text-xs font-bold text-amber-900 mt-2">{variety.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <h3 className="text-sm font-bold text-amber-900 text-center">HUEVOS {variety.name.toUpperCase()}</h3>
                    <Info className="w-4 h-4 text-amber-900" />
                  </div>
                  <button
                    onClick={() => addProduct({
                      id: `cubeta-${variety.id}`,
                      name: `Huevos ${variety.name}`,
                      type: 'cubeta',
                      variety: variety.id,
                      price: variety.price,
                      emoji: variety.emoji
                    })}
                    disabled={selectedProducts.length >= bundleSize}
                    className="w-full bg-amber-900 text-white py-2 rounded-full font-bold text-sm hover:bg-amber-800 transition-colors disabled:bg-gray-400"
                  >
                    + AGREGAR
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Bundle Builder */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-amber-100 rounded-3xl p-6 border-4 border-amber-900">
              {/* Step 1: Choose Bundle Size */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">Elige el Tamaño</h3>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBundleSize(2);
                      setSelectedProducts([]);
                    }}
                    className={`flex-1 px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${
                      bundleSize === 2
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-amber-900 border-amber-900'
                    }`}
                  >
                    2 CUBETAS
                  </button>

                  <button
                    onClick={() => {
                      setBundleSize(3);
                      setSelectedProducts([]);
                    }}
                    className={`flex-1 px-4 py-2 rounded-full font-bold text-sm border-2 transition-all relative ${
                      bundleSize === 3
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-amber-900 border-amber-900'
                    }`}
                  >
                    3 CUBETAS
                    <span className="absolute -top-1.5 -right-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold bg-yellow-300 text-amber-900">
                      -$2.000
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setBundleSize(4);
                      setSelectedProducts([]);
                    }}
                    className={`flex-1 px-4 py-2 rounded-full font-bold text-sm border-2 transition-all relative ${
                      bundleSize === 4
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-amber-900 border-amber-900'
                    }`}
                  >
                    4 CUBETAS
                    <span className="absolute -top-1.5 -right-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold bg-yellow-300 text-amber-900">
                      -$5.000
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Choose Products */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">Elige tus Productos</h3>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
                    {selectedProducts.length}
                  </div>
                  <div className="flex-1 h-0.5 bg-amber-300 mx-2"></div>
                  <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
                    {bundleSize}
                  </div>
                </div>

                {/* Product Slots */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {Array.from({ length: Math.min(bundleSize, 6) }).map((_, index) => (
                    <div
                      key={index}
                      onClick={() => selectedProducts[index] && removeProduct(index)}
                      className={`aspect-square border-3 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                        selectedProducts[index]
                          ? 'border-amber-900 bg-white hover:bg-amber-50'
                          : 'border-amber-300 bg-transparent'
                      }`}
                    >
                      {selectedProducts[index] ? (
                        <div className="text-center">
                          <span className="text-3xl">{selectedProducts[index].emoji}</span>
                          <div className="text-xs font-bold text-amber-900 mt-0.5">
                            {selectedProducts[index].type === 'campesinos' ? 'Campesinos' : selectedProducts[index].name.replace('Huevos ', '')}
                          </div>
                        </div>
                      ) : (
                        <span className="text-4xl text-amber-300">+</span>
                      )}
                    </div>
                  ))}
                </div>

                {bundleSize > 6 && (
                  <button className="w-full text-amber-900 font-bold text-xs flex items-center justify-center gap-1">
                    Mostrar Todo <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Step 3: Choose Frequency */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">Elige tu Frecuencia</h3>
                </div>

                {/* One-time Purchase */}
                <div
                  onClick={() => setPurchaseType('one-time')}
                  className={`p-3 rounded-xl border-2 mb-2 cursor-pointer transition-all ${
                    purchaseType === 'one-time'
                      ? 'border-amber-900 bg-white'
                      : 'border-transparent bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === 'one-time' ? 'border-amber-900' : 'border-gray-400'
                      }`}>
                        {purchaseType === 'one-time' && (
                          <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                        )}
                      </div>
                      <span className="font-bold text-amber-900 text-sm">COMPRA ÚNICA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-amber-900">${basePrice.toLocaleString()}</span>
                      {getBundleSavings() > 0 && (
                        <span className="text-xs text-gray-500 line-through ml-1">${originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subscribe & Save */}
                <div
                  onClick={() => setPurchaseType('subscribe')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    purchaseType === 'subscribe'
                      ? 'border-amber-900 bg-white'
                      : 'border-transparent bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === 'subscribe' ? 'border-amber-900' : 'border-gray-400'
                      }`}>
                        {purchaseType === 'subscribe' && (
                          <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                        )}
                      </div>
                      <span className="font-bold text-amber-900 text-sm">SUSCRÍBETE Y AHORRA (5%)</span>
                      <Info className="w-3 h-3 text-amber-900" />
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-amber-900">${subscriptionPrice.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 line-through ml-1">${subscriptionOriginalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {purchaseType === 'subscribe' && (
                    <select
                      value={deliveryFrequency}
                      onChange={(e) => setDeliveryFrequency(e.target.value)}
                      className="w-full p-2 rounded-lg border-2 border-amber-900 bg-white font-semibold text-amber-900 cursor-pointer text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="15">Entrega cada 15 días</option>
                      <option value="30">Entrega cada 30 días</option>
                      <option value="45">Entrega cada 45 días</option>
                      <option value="60">Entrega cada 60 días</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={selectedProducts.length !== bundleSize}
                className="w-full bg-amber-900 text-white py-3 rounded-full font-bold text-base hover:bg-amber-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-xl mb-3"
              >
                {selectedProducts.length < bundleSize
                  ? `AGREGA ${bundleSize - selectedProducts.length} MÁS`
                  : `AGREGAR AL CARRITO - $${(purchaseType === 'subscribe' ? subscriptionPrice : basePrice).toLocaleString()}`
                }
              </button>

              <p className="text-center text-xs text-amber-900">
                Pruébalo sin riesgo, garantía de satisfacción del 100%. Ver términos de uso.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold flex flex-col leading-none font-serif">
                  <span>AVICOLA</span>
                  <span>LAS PALMAS</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <a href="#" className="hover:text-amber-400 transition-colors">Términos de Uso</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Política de Privacidad</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Preguntas Frecuentes</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Ubicaciones</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Reseñas</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Trabaja con Nosotros</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Rastrear Pedido</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Sobre Nosotros</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-400 transition-colors">Política de Reembolso</a>
              </div>

              <div className="flex items-center gap-6">
                <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all">
                  CONTÁCTANOS
                </button>

                <div className="flex gap-4">
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                © 2026 Avicola Las Palmas
              </p>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-xl mb-6 font-semibold">
                No te pierdas nuestras novedades:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-amber-400 hover:text-white transition-all">
                  SUSCRIBIRSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BundleBuilder;
