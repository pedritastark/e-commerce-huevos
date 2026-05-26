import { motion } from 'framer-motion';
import { ShoppingCart, User, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CircularText from './CircularText';
import CartSidebar from './CartSidebar';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600">
      {/* Header */}
      <header className={`z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-white border-b border-gray-100'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between max-w-full pl-6 pr-6 py-5">
          {/* Left Side - Logo + Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold relative"
            >
              <span className={`transition-colors flex flex-col leading-none font-serif ${isMenuOpen ? 'text-amber-600' : 'text-white'}`}>
                <span>AVICOLA</span>
                <span>LAS PALMAS</span>
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Encuéntranos Button with Location Icon */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className={`px-5 py-2 rounded-full font-bold text-base transition-colors border-2 flex items-center gap-2 ${
                  isMenuOpen
                    ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700'
                    : 'bg-white text-amber-600 border-white hover:bg-white/90'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Encuéntranos
              </motion.button>

              {/* Other Navigation Items */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`font-bold text-lg transition-colors flex items-center gap-1 group ${
                  isMenuOpen
                    ? 'text-gray-700 hover:text-amber-600'
                    : 'text-white hover:text-white/80'
                }`}
              >
                Nuestros productos
                <ChevronDown className={`w-5 h-5 transition-all ${
                  isMenuOpen
                    ? 'opacity-50 group-hover:opacity-100'
                    : 'opacity-70 group-hover:opacity-100'
                }`} />
              </motion.button>

              <Link to="/granja">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`font-bold text-lg transition-colors ${
                    isMenuOpen
                      ? 'text-gray-700 hover:text-amber-600'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Nuestra Granja
                </motion.button>
              </Link>

              <Link to="/recetas">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`font-bold text-lg transition-colors ${
                    isMenuOpen
                      ? 'text-gray-700 hover:text-amber-600'
                      : 'text-white hover:text-white/80'
                  }`}
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
              <span className={`absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold z-10 transition-colors ${
                isMenuOpen
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-amber-600'
              }`}>
                POPULAR
              </span>
              <Link to="/arma-tu-paquete">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full font-bold text-base transition-all duration-300 bg-white text-amber-600 border-2 border-white hover:bg-gradient-to-r hover:from-red-500 hover:to-fuchsia-500 hover:text-white hover:border-transparent"
                >
                  ARMA TU PAQUETE
                </motion.button>
              </Link>
            </div>

            {/* User Icon */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${
                  isMenuOpen
                    ? 'hover:bg-gray-100'
                    : 'hover:bg-white/20'
                }`}
              >
                <User className={`w-6 h-6 transition-colors ${
                  isMenuOpen ? 'text-gray-700' : 'text-white'
                }`} />
              </motion.button>
            </Link>

            {/* Cart Icon */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors relative ${
                isMenuOpen
                  ? 'hover:bg-gray-100'
                  : 'hover:bg-white/20'
              }`}
            >
              <ShoppingCart className={`w-6 h-6 transition-colors ${
                isMenuOpen ? 'text-gray-700' : 'text-white'
              }`} />
              <span className={`absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold transition-colors ${
                isMenuOpen
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600'
              }`}>
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
          className="absolute top-[110px] left-0 right-0 bg-white z-40 shadow-lg py-12"
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

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 overflow-hidden pt-20">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Hero Image - Positioned absolutely to left edge */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block z-10 w-1/2"
        >
          <motion.img
            src="/hero-image.png"
            alt="Huevos Premium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-auto object-contain object-left drop-shadow-2xl"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left Side - Empty space for image */}
            <div className="hidden lg:block"></div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Reviews Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white text-white" />
                  ))}
                </div>
                <span className="font-bold text-lg">5,000+ RESEÑAS 5-ESTRELLAS</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-6xl font-bold leading-tight mb-12"
              >
                Desayuno real.{' '}
                <span className="block">Energía constante.</span>
              </motion.h1>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-row gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-amber-600 px-16 py-3.5 rounded-full font-bold text-xl hover:bg-gray-50 transition-colors shadow-2xl whitespace-nowrap"
                >
                  VER PRODUCTOS
                </motion.button>

                <Link to="/arma-tu-paquete">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-amber-600 px-16 py-3.5 rounded-full font-bold text-xl hover:bg-gray-50 transition-colors shadow-2xl whitespace-nowrap"
                  >
                    ARMA TU PAQUETE
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="bg-gradient-to-b from-yellow-100 to-orange-200 py-20">
        <div className="max-w-full mx-auto px-[4.5rem]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl lg:text-7xl font-bold text-amber-900 mb-8 leading-tight">
                Huevos frescos directo a tu puerta cada semana
              </h2>

              <p className="text-3xl font-bold text-amber-800 mb-10">
                Suscríbete y Ahorra 20%
              </p>

              <div className="space-y-6 mb-12">
                {/* Benefit 1 */}
                <div className="flex items-start gap-4">
                  <svg className="w-9 h-9 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-2xl text-amber-900 font-medium">
                    Recetario gratis con tu primer pedido
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-4">
                  <svg className="w-9 h-9 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <p className="text-2xl text-amber-900 font-medium">
                    Cambia tu paquete cuando quieras
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-4">
                  <svg className="w-9 h-9 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-2xl text-amber-900 font-medium">
                    Pausa o cancela tu entrega cuando quieras
                  </p>
                </div>
              </div>

              <Link to="/arma-tu-paquete">
                <motion.button
                  className="bg-orange-700 text-white px-20 py-6 rounded-full font-bold text-2xl hover:bg-orange-600 transition-all shadow-2xl"
                >
                  ARMA TU PAQUETE
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-[110%] overflow-hidden rounded-3xl">
                <img
                  src="/subscription-image.png"
                  alt="AVICOLA LAS PALMAS Huevos Premium"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-gradient-to-b from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-7xl font-bold text-center text-amber-900 mb-16"
          >
            NUESTROS MÁS VENDIDOS
          </motion.h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Product 1 - Torre de huevos A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl transition-shadow relative"
            >
              {/* Best Seller Badge */}
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                MÁS VENDIDO
              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center h-56 mb-6">
                <span className="text-9xl">🥚</span>
              </div>

              {/* Price */}
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-amber-900">$45 </span>
                <span className="text-2xl text-gray-400 line-through">$50</span>
              </div>

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-amber-900 text-center mb-5">
                TORRE DE HUEVOS A
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-center text-lg text-gray-600 mb-8">1,245 Reviews</p>

              {/* Shop Button */}
              <button className="w-full bg-orange-600 text-white py-4 text-lg rounded-full font-bold cursor-pointer">
                Comprar Ahora
              </button>
            </motion.div>

            {/* Product 2 - Huevos campesino */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-56 mb-6">
                <span className="text-9xl">🐔</span>
              </div>

              {/* Price */}
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-amber-900">$52 </span>
                <span className="text-2xl text-gray-400 line-through">$60</span>
              </div>

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-amber-900 text-center mb-5">
                HUEVOS CAMPESINO
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-center text-lg text-gray-600 mb-8">892 Reviews</p>

              {/* Shop Button */}
              <button className="w-full bg-orange-600 text-white py-4 text-lg rounded-full font-bold cursor-pointer">
                Comprar Ahora
              </button>
            </motion.div>

            {/* Product 3 - Cubeta de huevos AA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-56 mb-6">
                <span className="text-9xl">🪣</span>
              </div>

              {/* Price */}
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-amber-900">$38</span>
              </div>

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-amber-900 text-center mb-5">
                CUBETA DE HUEVOS AA
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-center text-lg text-gray-600 mb-8">657 Reviews</p>

              {/* Shop Button */}
              <button className="w-full bg-orange-600 text-white py-4 text-lg rounded-full font-bold cursor-pointer">
                Comprar Ahora
              </button>
            </motion.div>

            {/* Product 4 - Arma tu propio paquete */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-56 mb-6">
                <span className="text-9xl">📦</span>
              </div>

              {/* Price */}
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-amber-900">$55+</span>
              </div>

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-amber-900 text-center mb-5">
                ARMA TU PROPIO PAQUETE
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-center text-lg text-gray-600 mb-8">2,341 Reviews</p>

              {/* Shop Button */}
              <button className="w-full bg-orange-600 text-white py-4 text-lg rounded-full font-bold cursor-pointer">
                Comprar Ahora
              </button>
            </motion.div>
          </div>

          {/* Shop All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button className="bg-orange-600 text-white px-20 py-6 rounded-full font-bold text-2xl cursor-pointer shadow-xl">
              VER TODOS LOS PRODUCTOS
            </button>
          </motion.div>
        </div>
      </section>

      {/* Nutritional Benefits Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left Side - Benefits */}
          <div className="bg-orange-600 text-amber-50 py-20 px-16 flex items-center justify-center">
            <div className="max-w-xs space-y-12 text-center">
              {/* Benefit 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-6xl font-bold mb-6 leading-none">
                  Proteína Real
                </h3>
                <p className="text-2xl leading-none">
                  12g-14g de proteína de alta calidad.
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-6xl font-bold mb-6 leading-none">
                  Sin Rellenos
                </h3>
                <p className="text-2xl leading-none">
                  Sin conservantes, sin antibióticos.
                </p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-6xl font-bold mb-6 leading-none">
                  Sabor de Granja
                </h3>
                <p className="text-2xl leading-none">
                  Color que solo un huevo de calidad tiene.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Full Height Image */}
          <div className="relative min-h-[700px]">
            <motion.img
              src="/benefits-image.png"
              alt="Huevos AVICOLA LAS PALMAS Premium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Circular Text Badge */}
            <div className="absolute bottom-8 right-8 z-20">
              <CircularText
                text="avicola*las*palmas*"
                onHover="speedUp"
                spinDuration={20}
                className="circular-text-custom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews and Availability Section */}
      <section className="bg-gradient-to-b from-orange-50 to-orange-200 py-20">
        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Stars */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl lg:text-7xl font-bold text-amber-900 mb-8 leading-tight">
                Reseñas increíbles & calidad superior
              </h2>

              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-10 h-10 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-2xl font-bold text-amber-900 ml-2">5,000+ RESEÑAS 5-ESTRELLAS</span>
              </div>
            </motion.div>

            {/* Right Side - Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Navigation Arrows */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="bg-white rounded-3xl p-12 shadow-2xl">
                <p className="text-2xl text-amber-900 font-medium text-center mb-8 leading-relaxed">
                  "Me sorprendió descubrir la diferencia en sabor y calidad. Estos huevos son incomparables."
                </p>

                {/* Decorative wave */}
                <div className="flex justify-center mb-6">
                  <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
                    <path d="M0 4C5 4 5 0 10 0C15 0 15 4 20 4C25 4 25 0 30 0C35 0 35 4 40 4C45 4 45 0 50 0C55 0 55 4 60 4" stroke="#F59E0B" strokeWidth="2"/>
                  </svg>
                </div>

                <p className="text-3xl font-bold text-amber-900 text-center">El Universal</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Available Nationwide Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-amber-900 text-center mb-12">
            DISPONIBLE EN TODO EL PAÍS
          </h3>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Store logos - duplicated for infinite scroll effect */}
              {[...Array(3)].map((_, setIndex) => (
                ['Walmart', 'Kroger', 'Whole Foods', 'Sprouts', 'Target'].map((store, index) => (
                  <div
                    key={`${store}-${setIndex}-${index}`}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg flex items-center justify-center min-h-[120px] min-w-[200px] flex-shrink-0"
                  >
                    <span className="text-2xl font-bold text-amber-900">{store}</span>
                  </div>
                ))
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
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

export default App;
