import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, User, ChevronDown, Star, Plus, Minus, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext';
import CartSidebar from './CartSidebar';

// Product images carousel thumbnails
const productImages = [
  '/product-thumb-1.png',
  '/product-thumb-2.png',
  '/product-thumb-3.png',
  '/product-thumb-4.png',
  '/product-thumb-5.png',
];

// Product data
const productData: { [key: string]: any } = {
  '1': {
    id: 1,
    name: 'Huevos al Por Mayor',
    subtitle: 'TORRE DE 10 CUBETAS - 30 HUEVOS CADA UNA',
    description: 'Tus huevos favoritos AVICOLA LAS PALMAS al mejor precio. Torre de 10 cubetas con 30 huevos cada una (300 huevos en total). Elige entre diferentes clasificaciones: Extra, Jumbo, AAA, AA, A y C. Perfectos para negocios, restaurantes o familias grandes. Frescura y calidad garantizada.',
    price: 170000,  // Precio base torre AAA
    originalPrice: 220000,  // Precio Jumbo
    subscriptionPrice: 95000,  // Precio torre C
    image: '📦',
    badge: 'AHORRO',
    hasVarieties: true,
    unit: 'TORRE',
  },
  '2': {
    id: 2,
    name: 'Huevos Campesinos',
    subtitle: 'CUBETA DE 30 HUEVOS',
    description: 'Huevos de gallinas criadas en libertad, alimentadas de forma natural. Sabor auténtico y yemas más intensas.',
    price: 39000,
    originalPrice: null,
    subscriptionPrice: 37050, // 5% discount
    image: '🌿',
    badge: 'POPULAR',
    hasVarieties: false,
    unit: 'CUBETA',
  },
  '3': {
    id: 3,
    name: 'Huevos por Cubeta',
    subtitle: 'CUBETA DE 30 HUEVOS',
    description: 'Huevos frescos de excelente calidad vendidos por cubeta. Disponibles en diferentes clasificaciones según tus necesidades. Perfectos para familias y consumo regular.',
    price: 75,
    originalPrice: null,
    subscriptionPrice: 60,
    image: '🥚',
    badge: null,
    hasVarieties: true,
    unit: 'CUBETA',
  },
};

// Flavor options with prices - Al Por Mayor (precio por torre de 10 cubetas)
const flavorsWholesale = [
  { id: 1, name: 'Jumbo', emoji: '🥚', color: 'from-yellow-100 to-amber-100', price: 220000, weight: 'Más de 78g' },
  { id: 2, name: 'Extra', emoji: '🥚', color: 'from-orange-100 to-yellow-100', price: 200000, weight: '70g a 77.9g' },
  { id: 3, name: 'AAA', emoji: '🥚', color: 'from-amber-100 to-orange-200', price: 170000, weight: '64g a 69.9g' },
  { id: 4, name: 'AA', emoji: '🥚', color: 'from-yellow-200 to-amber-200', price: 135000, weight: '60g a 63.9g' },
  { id: 5, name: 'A', emoji: '🥚', color: 'from-amber-200 to-yellow-300', price: 125000, weight: '53g a 59.9g' },
  { id: 6, name: 'B', emoji: '🥚', color: 'from-yellow-300 to-orange-200', price: 113000, weight: '46g a 52.9g' },
  { id: 7, name: 'C', emoji: '🥚', color: 'from-yellow-300 to-orange-300', price: 95000, weight: 'Menos de 46g' },
];

// Flavor options with prices - Al Detal (precio por cubeta de 30 huevos)
const flavorsRetail = [
  { id: 1, name: 'Jumbo', emoji: '🥚', color: 'from-yellow-100 to-amber-100', price: 25500, weight: 'Más de 78g' },
  { id: 2, name: 'Extra', emoji: '🥚', color: 'from-orange-100 to-yellow-100', price: 23000, weight: '70g a 77.9g' },
  { id: 3, name: 'AAA', emoji: '🥚', color: 'from-amber-100 to-orange-200', price: 19800, weight: '64g a 69.9g' },
  { id: 4, name: 'AA', emoji: '🥚', color: 'from-yellow-200 to-amber-200', price: 16500, weight: '60g a 63.9g' },
  { id: 5, name: 'A', emoji: '🥚', color: 'from-amber-200 to-yellow-300', price: 14900, weight: '53g a 59.9g' },
  { id: 6, name: 'B', emoji: '🥚', color: 'from-yellow-300 to-orange-200', price: 13000, weight: '46g a 52.9g' },
  { id: 7, name: 'C', emoji: '🥚', color: 'from-yellow-300 to-orange-300', price: 11000, weight: 'Menos de 46g' },
];

function ProductDetail() {
  const { id } = useParams();
  const product = productData[id || '1'];
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [quantity, setQuantity] = useState(5); // Mínimo 5 torres
  const [deliveryFrequency, setDeliveryFrequency] = useState('30');
  const minQuantity = 5; // Cantidad mínima de torres
  const { addItem, getTotalItems } = useCart();

  const handleAddToCart = () => {
    // Agregar la cantidad especificada al carrito
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id.toString(),
        name: product.name,
        description: product.subtitle,
        price: purchaseType === 'subscribe' ? product.subscriptionPrice : product.price,
        image: product.image,
      });
    }
    setIsCartOpen(true);
  };

  // Select the correct flavors array based on product
  const flavors = id === '1' ? flavorsWholesale : id === '3' ? flavorsRetail : flavorsWholesale;

  // Get current price based on selected flavor
  const getCurrentPrice = () => {
    if (product.hasVarieties && (id === '1' || id === '3')) {
      const selectedVariety = flavors.find(f => f.id === selectedFlavor);
      return selectedVariety?.price || product.price;
    }
    return product.price;
  };

  const getCurrentSubscriptionPrice = () => {
    return getCurrentPrice(); // Sin descuento adicional
  };

  const currentPrice = getCurrentPrice();
  const currentSubscriptionPrice = getCurrentSubscriptionPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 z-50">
        <div className="flex items-center justify-between max-w-full pl-6 pr-6 py-5">
          {/* Left Side - Logo + Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
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

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Encuéntranos Button */}
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

              {/* Nuestros productos with dropdown */}
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

          {/* Right Side - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {/* Build Your Bundle Button */}
            <div className="relative hidden md:block group">
              <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold z-10 bg-white text-amber-600">
                POPULAR
              </span>
              <Link to="/arma-tu-paquete">
                <button className="px-7 py-3 rounded-full font-bold text-base border-2 bg-amber-600 text-white border-amber-600 cursor-pointer">
                  ARMA TU PAQUETE
                </button>
              </Link>
            </div>

            {/* User Icon */}
            <Link to={user ? "/dashboard" : "/login"}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${
                  user ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'
                }`}
              >
                <User className={`w-6 h-6 ${user ? 'text-green-600' : 'text-gray-700'}`} />
              </motion.button>
            </Link>

            {/* Cart Icon */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold bg-amber-600 text-white">
                  {getTotalItems()}
                </span>
              )}
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
              {/* Product 1 */}
              <Link to="/producto/1" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">📦</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS AL POR MAYOR</h4>
              </Link>

              {/* Product 2 */}
              <Link to="/producto/2" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">🌿</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS ORGÁNICOS</h4>
              </Link>

              {/* Product 3 */}
              <Link to="/producto/3" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl p-6 hover:shadow-xl transition-shadow w-full mb-3">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-8xl">🥚</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-amber-600 bg-white px-4 py-2 rounded-full">HUEVOS POR CUBETA</h4>
              </Link>

              {/* Product 4 */}
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

      {/* Product Detail Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Product Images */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {productImages.map((_img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-2xl border-2 transition-all overflow-hidden ${
                      selectedImage === index
                        ? 'border-amber-600 shadow-lg'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                      <span className="text-3xl">🥚</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-white rounded-3xl p-12 shadow-xl">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="relative">
                    <span className="text-[250px]">{product.image}</span>
                    {product.badge && (
                      <div className="absolute top-0 right-0 bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                        {product.badge}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div>
              {/* Product Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl font-bold text-amber-900 mb-2">
                  {product.name.toUpperCase()}
                </h1>
                <p className="text-xl font-semibold text-orange-600 mb-4">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-bold text-amber-900">3,370 Reseñas</span>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Nutritional Link */}
                <button className="text-amber-700 font-bold underline mb-6 hover:text-amber-800">
                  Ver Información Nutricional
                </button>

                {/* Weight Information - Only show if product has varieties */}
                {product.hasVarieties && (id === '1' || id === '3') && (
                  <div className="mb-8">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        <span className="font-bold text-amber-900">{flavors.find(f => f.id === selectedFlavor)?.name}:</span> {flavors.find(f => f.id === selectedFlavor)?.weight} por huevo
                      </span>
                    </div>
                  </div>
                )}

                {/* Choose Flavor - Only show if product has varieties */}
                {product.hasVarieties && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-amber-900 mb-4">1: ELIGE TU VARIEDAD</h3>
                    <div className="grid grid-cols-7 gap-3">
                      {flavors.map((flavor) => (
                        <button
                          key={flavor.id}
                          onClick={() => setSelectedFlavor(flavor.id)}
                          className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                            selectedFlavor === flavor.id
                              ? 'border-amber-600 shadow-lg bg-amber-50'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${flavor.color} flex items-center justify-center mb-2`}>
                            <span className="text-2xl">{flavor.emoji}</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700 text-center">{flavor.name}</span>
                          <span className="text-xs text-amber-600 font-semibold mt-1">${(flavor.price / 1000).toFixed(0)}k</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Choose Frequency */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">{product.hasVarieties ? '2: ' : ''}ELIGE TU FRECUENCIA</h3>

                  {/* One-time Purchase */}
                  <div
                    onClick={() => setPurchaseType('one-time')}
                    className={`p-5 rounded-2xl border-2 mb-4 cursor-pointer transition-all ${
                      purchaseType === 'one-time'
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          purchaseType === 'one-time' ? 'border-amber-600' : 'border-gray-300'
                        }`}>
                          {purchaseType === 'one-time' && (
                            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                          )}
                        </div>
                        <span className="font-bold text-amber-900">COMPRA ÚNICA</span>
                      </div>
                      <div className="text-right">
                        <div>
                          {quantity > 1 && (
                            <div className="text-sm text-gray-600 mb-1">
                              ${currentPrice.toLocaleString()} × {quantity} {product.unit}s
                            </div>
                          )}
                          <span className="text-2xl font-bold text-amber-900">${(currentPrice * quantity).toLocaleString()}</span>
                          {quantity > 1 && <span className="text-gray-600 text-sm ml-1">TOTAL</span>}
                          {quantity === 1 && <span className="text-gray-600 text-sm ml-1">/ {product.unit}</span>}
                        </div>
                        {product.hasVarieties && id === '1' && (
                          <div className="text-xs text-gray-500 mt-1">
                            ${(currentPrice / 10).toLocaleString()}/cubeta · ${Math.round(currentPrice / 300).toLocaleString()}/huevo
                          </div>
                        )}
                        {product.hasVarieties && id === '3' && (
                          <div className="text-xs text-gray-500 mt-1">
                            ${Math.round(currentPrice / 30).toLocaleString()}/huevo
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subscribe & Save */}
                  <div
                    onClick={() => setPurchaseType('subscribe')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      purchaseType === 'subscribe'
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          purchaseType === 'subscribe' ? 'border-amber-600' : 'border-gray-300'
                        }`}>
                          {purchaseType === 'subscribe' && (
                            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                          )}
                        </div>
                        <span className="font-bold text-amber-900">SUSCRIPCIÓN (Entregas automáticas)</span>
                      </div>
                      <div className="text-right">
                        <div>
                          {quantity > 1 && (
                            <div className="text-sm text-gray-600 mb-1">
                              ${currentPrice.toLocaleString()} × {quantity} {product.unit}s
                            </div>
                          )}
                          <span className="text-2xl font-bold text-amber-900">${(currentPrice * quantity).toLocaleString()}</span>
                          {quantity > 1 && <span className="text-gray-600 text-sm ml-1">TOTAL</span>}
                          {quantity === 1 && <span className="text-gray-600 text-sm ml-1">/ {product.unit}</span>}
                        </div>
                        {product.hasVarieties && id === '1' && (
                          <div className="text-xs text-gray-500 mt-1">
                            ${(currentPrice / 10).toLocaleString()}/cubeta · ${Math.round(currentPrice / 300).toLocaleString()}/huevo
                          </div>
                        )}
                        {product.hasVarieties && id === '3' && (
                          <div className="text-xs text-gray-500 mt-1">
                            ${Math.round(currentPrice / 30).toLocaleString()}/huevo
                          </div>
                        )}
                      </div>
                    </div>

                    {purchaseType === 'subscribe' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-amber-200"
                      >
                        {/* Delivery Frequency */}
                        <div className="mb-4">
                          <select
                            value={deliveryFrequency}
                            onChange={(e) => setDeliveryFrequency(e.target.value)}
                            className="w-full p-3 rounded-xl border-2 border-amber-300 bg-white font-semibold text-amber-900 cursor-pointer"
                          >
                            <option value="15">ENTREGA CADA 15 DÍAS</option>
                            <option value="30">ENTREGA CADA 30 DÍAS</option>
                            <option value="45">ENTREGA CADA 45 DÍAS</option>
                            <option value="60">ENTREGA CADA 60 DÍAS</option>
                          </select>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">✓</span>
                            <span className="text-gray-700">Recetario gratis con tu primer pedido</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">✓</span>
                            <span className="text-gray-700">Cambia sabores cuando quieras</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">✓</span>
                            <span className="text-gray-700">Ofertas exclusivas para suscriptores</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">✓</span>
                            <span className="text-gray-700">Pausa o cancela cuando quieras</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-amber-900">CANTIDAD</span>
                      <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border-2 border-amber-600">
                        <button
                          onClick={() => setQuantity(Math.max(minQuantity, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-amber-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={quantity <= minQuantity}
                        >
                          <Minus className="w-4 h-4 text-amber-900" />
                        </button>
                        <span className="text-xl font-bold text-amber-900 w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-amber-100 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-amber-900" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-amber-600 text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-amber-700 transition-colors shadow-xl"
                    >
                      AGREGAR AL CARRITO
                    </button>
                  </div>

                  {/* Alert for small orders */}
                  {id === '1' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        i
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-900">
                          <span className="font-bold">¿Necesitas menos torres?</span> Para pedidos de 2-4 torres,{' '}
                          <Link to="/arma-tu-paquete" className="text-blue-600 hover:text-blue-700 underline font-bold">
                            arma tu paquete aquí
                          </Link>
                          {' '}y obtén descuentos especiales.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Guarantee */}
                <p className="text-center text-sm text-gray-600">
                  Pruébalo sin riesgo, garantía de satisfacción del 100%.{' '}
                  <button className="text-amber-700 underline hover:text-amber-800">
                    Ver términos de uso
                  </button>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side */}
            <div className="space-y-8">
              {/* Logo */}
              <div>
                <h2 className="text-5xl font-bold flex flex-col leading-none font-serif">
                  <span>AVICOLA</span>
                  <span>LAS PALMAS</span>
                </h2>
              </div>

              {/* Links */}
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

              {/* Contact Button & Social */}
              <div className="flex items-center gap-6">
                <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all">
                  CONTÁCTANOS
                </button>

                {/* Social Icons */}
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

              {/* Copyright */}
              <p className="text-sm text-gray-400">
                © 2026 Aura
              </p>
            </div>

            {/* Right Side - Newsletter */}
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

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default ProductDetail;
