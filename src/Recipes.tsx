import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import { useCart } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext';

// Recipe data
const recipes = {
  'Revueltos': {
    title: 'REVUELTOS',
    subtitle: 'SARTÉN / MANTEQUILLA / HUEVO',
    quote: 'La paz interior es el camino a la perfección.',
    steps: [
      'Tu mantra: fuego bajo y cocción lenta.',
      'Prepara la sartén con mantequilla (1/2 cucharada para 4 huevos).',
      'Bate los huevos en un tazón. Vierte en la sartén.',
      'Revuelve suavemente. Sé paciente.',
    ],
    image: '/scrambled-eggs.png',
  },
  'Fritos': {
    title: 'FRITOS',
    subtitle: 'SARTÉN / ACEITE / HUEVO',
    quote: 'Bordes crujientes, yema perfecta.',
    steps: [
      'Calienta aceite en la sartén a fuego medio-alto.',
      'Rompe el huevo directamente en la sartén.',
      'Cocina hasta que los bordes estén crujientes y dorados.',
      'Voltea si deseas huevos volteados.',
    ],
    image: '/fried-eggs.png',
  },
  'Poché': {
    title: 'POCHÉ',
    subtitle: 'AGUA / VINAGRE / HUEVO',
    quote: 'Elegancia en la simplicidad.',
    steps: [
      'Lleva el agua a fuego lento, agrega vinagre.',
      'Crea un remolino suave en el agua.',
      'Rompe el huevo en un tazón pequeño.',
      'Desliza el huevo en el centro del remolino.',
      'Cocina por 3-4 minutos hasta que la clara esté firme.',
    ],
    image: '/poached-eggs.png',
  },
  'Cocidos': {
    title: 'COCIDOS',
    subtitle: 'OLLA / AGUA / HUEVO',
    quote: 'Simple, nutritivo, perfecto.',
    steps: [
      'Coloca los huevos en una olla y cubre con agua fría.',
      'Lleva a ebullición a fuego alto.',
      'Retira del fuego y tapa por 9-12 minutos.',
      'Transfiere a un baño de hielo para detener la cocción.',
    ],
    image: '/boiled-eggs.png',
  },
  'Omelette': {
    title: 'OMELETTE',
    subtitle: 'SARTÉN / MANTEQUILLA / HUEVO',
    quote: 'Un lienzo para tu creatividad.',
    steps: [
      'Bate los huevos con sal y pimienta.',
      'Calienta mantequilla en sartén antiadherente a fuego medio.',
      'Vierte los huevos y deja que se asienten ligeramente.',
      'Agrega el relleno, dobla por la mitad y sirve.',
    ],
    image: '/omelette-eggs.png',
  },
};

function Recipes() {
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8E4D9]">
      {/* Header */}
      <header className={`z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-white border-b border-gray-100'
          : 'bg-[#E8E4D9]'
      }`}>
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
              {/* Encuéntranos Button with Location Icon */}
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

              {/* Other Navigation Items */}
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
                  className="font-bold text-lg transition-colors text-amber-600"
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

      {/* Recipes Section - How Do You Like Your Eggs */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4"
          >
            ¿CÓMO TE GUSTAN TUS HUEVOS?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center text-red-600 mb-16"
          >
            DOMINA LOS MÉTODOS BÁSICOS DE COCCIÓN
          </motion.p>

          {/* Cooking Methods Grid - Pyramid Layout */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* First Row - 3 items */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { name: 'Revueltos', emoji: '🍳', description: 'Scrambled', image: '/scrambled-eggs.png' },
                { name: 'Fritos', emoji: '🍳', description: 'Fried', image: '/fried-eggs.png' },
                { name: 'Poché', emoji: '🥚', description: 'Poached', image: '/poached-eggs.png' },
              ].map((method, index) => (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div
                    onClick={() => setSelectedRecipe(method.name)}
                    className="w-40 h-40 rounded-full bg-[#D4CFC1] flex items-center justify-center mb-4 cursor-pointer shadow-lg overflow-hidden relative group"
                  >
                    {method.image ? (
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                    ) : (
                      <span className="text-6xl transition-opacity duration-300 group-hover:opacity-0">{method.emoji}</span>
                    )}
                    {/* Red overlay on hover */}
                    <div className="absolute inset-0 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-xl font-bold uppercase tracking-wide text-center px-4">
                        {method.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - 2 items centered */}
            <div className="grid grid-cols-6 gap-8">
              <div className="col-span-1"></div>
              {[
                { name: 'Cocidos', emoji: '🥚', description: 'Boiled', image: '/boiled-eggs.png' },
                { name: 'Omelette', emoji: '🍳', description: 'Omelette', image: '/omelette-eggs.png' },
              ].map((method, index) => (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="flex flex-col items-center col-span-2"
                >
                  <div
                    onClick={() => setSelectedRecipe(method.name)}
                    className="w-40 h-40 rounded-full bg-[#D4CFC1] flex items-center justify-center mb-4 cursor-pointer shadow-lg overflow-hidden relative group"
                  >
                    {method.image ? (
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                    ) : (
                      <span className="text-6xl transition-opacity duration-300 group-hover:opacity-0">{method.emoji}</span>
                    )}
                    {/* Red overlay on hover */}
                    <div className="absolute inset-0 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-xl font-bold uppercase tracking-wide text-center px-4">
                        {method.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="col-span-1"></div>
            </div>

            {/* Instruction Indicator - Below circles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center mt-12"
            >
              <p className="text-[#B8B3A3] font-bold text-lg flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Haz click en un tipo de huevo para ver su receta
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && recipes[selectedRecipe as keyof typeof recipes] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecipe(null)}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#E8E4D9] rounded-3xl max-w-6xl w-full my-auto shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left Side - Image */}
                <div className="relative h-64 md:h-auto md:min-h-[600px]">
                  <img
                    src={recipes[selectedRecipe as keyof typeof recipes].image}
                    alt={recipes[selectedRecipe as keyof typeof recipes].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right Side - Recipe Content */}
                <div className="p-6 md:p-12 flex flex-col justify-center">
                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-3 md:mb-4">
                    {recipes[selectedRecipe as keyof typeof recipes].title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">
                    {recipes[selectedRecipe as keyof typeof recipes].subtitle}
                  </p>

                  {/* Quote */}
                  <p className="text-lg md:text-2xl font-medium text-gray-800 mb-6 md:mb-12 italic">
                    {recipes[selectedRecipe as keyof typeof recipes].quote}
                  </p>

                  {/* Steps */}
                  <ol className="space-y-4 md:space-y-6 pb-6 md:pb-0">
                    {recipes[selectedRecipe as keyof typeof recipes].steps.map((step, index) => (
                      <li key={index} className="flex gap-3 md:gap-4">
                        <span className="text-xl md:text-2xl font-bold text-gray-900 flex-shrink-0">{index + 1}.</span>
                        <span className="text-base md:text-xl text-gray-800 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Recipes;
