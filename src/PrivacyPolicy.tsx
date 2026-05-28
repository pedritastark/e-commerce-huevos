import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './contexts/CartContext';
import CartSidebar from './CartSidebar';
import { useAuth } from './contexts/AuthContext';

function PrivacyPolicy() {
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-white">
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
                <span className="text-red-600 flex flex-col leading-none font-serif">
                  <span>AVICOLA</span>
                  <span>LAS PALMAS</span>
                </span>
              </motion.div>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className="px-5 py-2 rounded-full font-bold text-base transition-colors border-2 flex items-center gap-2 bg-red-600 text-white border-red-600 hover:bg-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Encuéntranos
              </motion.button>

              <Link to="/comprar">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-bold text-lg transition-colors text-gray-700 hover:text-red-600"
                >
                  Nuestros productos
                </motion.button>
              </Link>

              <Link to="/granja">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-bold text-lg transition-colors text-gray-700 hover:text-red-600"
                >
                  Nuestra Granja
                </motion.button>
              </Link>

              <Link to="/recetas">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-lg transition-colors text-gray-700 hover:text-red-600"
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
              <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold z-10 bg-white text-red-600">
                POPULAR
              </span>
              <Link to="/arma-tu-paquete">
                <button className="px-7 py-3 rounded-full font-bold text-base border-2 bg-red-600 text-white border-red-600 cursor-pointer">
                  ARMA TU PAQUETE
                </button>
              </Link>
            </div>

            {/* User Icon */}
            <Link to={user ? "/dashboard" : "/login"}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${user ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}`}
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
                <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold bg-red-600 text-white">
                  {getTotalItems()}
                </span>
              )}
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-red-600 mb-8"
        >
          Política de Privacidad
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-gray-600 mb-6">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 mb-4">
              En Avícola Las Palmas, recopilamos la siguiente información cuando utilizas nuestro sitio web:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Información de cuenta:</strong> Nombre, apellido, correo electrónico y contraseña.</li>
              <li><strong>Información de pedidos:</strong> Dirección de entrega, número de teléfono, detalles de productos comprados.</li>
              <li><strong>Información de pago:</strong> Los datos de pago son procesados por nuestros proveedores de pasarela de pago y no son almacenados en nuestros servidores.</li>
              <li><strong>Información de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Uso de la Información</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Procesar y entregar tus pedidos</li>
              <li>Comunicarnos contigo sobre tu cuenta y pedidos</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviar promociones y ofertas especiales (solo si has dado tu consentimiento)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Compartir Información</h2>
            <p className="text-gray-700 mb-4">
              No vendemos tu información personal. Solo compartimos tus datos con:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Proveedores de servicios:</strong> Empresas de logística y entrega para cumplir con tus pedidos</li>
              <li><strong>Procesadores de pago:</strong> Para procesar transacciones de forma segura</li>
              <li><strong>Autoridades legales:</strong> Cuando sea requerido por ley</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Seguridad de Datos</h2>
            <p className="text-gray-700 mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, pérdida o alteración.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, recordar tus preferencias y analizar el uso del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Tus Derechos</h2>
            <p className="text-gray-700 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Empresa:</strong> Avícola Las Palmas S.A.S</li>
              <li><strong>NIT:</strong> 901647439-5</li>
              <li><strong>Email:</strong> avicolalaspalmas01@gmail.com</li>
              <li><strong>Teléfono/WhatsApp:</strong> +57 321 837 2110</li>
              <li><strong>Dirección:</strong> Vereda Platanillo (Fosca), Cundinamarca</li>
              <li><strong>Punto de distribución:</strong> Cra 22 #17-60, Paloquemao, Bogotá</li>
              <li><strong>Horario:</strong> Atención 24 horas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cambios a esta Política</h2>
            <p className="text-gray-700">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página con una fecha de actualización revisada.
            </p>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
          >
            Volver al Inicio
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold flex flex-col leading-none font-serif">
                  <span>AVICOLA</span>
                  <span>LAS PALMAS</span>
                </h2>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2 text-sm">
                <Link to="/terminos" className="hover:text-amber-400 transition-colors">Términos de Uso</Link>
                <span>•</span>
                <Link to="/privacidad" className="hover:text-amber-400 transition-colors">Política de Privacidad</Link>
                <span>•</span>
                <Link to="/preguntas-frecuentes" className="hover:text-amber-400 transition-colors">Preguntas Frecuentes</Link>
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
                <Link to="/reembolsos" className="hover:text-amber-400 transition-colors">Política de Reembolso</Link>
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
                  <a href="https://www.facebook.com/profile.php?id=61590297636576" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

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

export default PrivacyPolicy;
