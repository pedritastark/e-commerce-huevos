import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './contexts/CartContext';
import CartSidebar from './CartSidebar';
import { useAuth } from './contexts/AuthContext';

function RefundPolicy() {
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-white">
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
                <span className="text-red-600 flex flex-col leading-none font-serif">
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
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

            <Link to={user ? "/dashboard" : "/login"}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${user ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}`}
              >
                <User className={`w-6 h-6 ${user ? 'text-green-600' : 'text-gray-700'}`} />
              </motion.button>
            </Link>

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
          Política de Reembolso
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Garantía</h2>
            <p className="text-gray-700 mb-4">
              En Avícola Las Palmas, nos comprometemos a entregar productos frescos y de la más alta calidad. Si no estás completamente satisfecho con tu compra, estamos aquí para ayudarte.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Productos Elegibles para Reembolso</h2>
            <p className="text-gray-700 mb-4">
              Puedes solicitar un reembolso o cambio si:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>El producto llegó dañado o en mal estado</li>
              <li>Recibiste un producto diferente al que ordenaste</li>
              <li>El producto está defectuoso o no cumple con los estándares de calidad</li>
              <li>Falta algún artículo de tu pedido</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Plazo para Solicitar Reembolso</h2>
            <p className="text-gray-700 mb-4">
              Debido a la naturaleza perecedera de nuestros productos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Debes reportar cualquier problema <strong>dentro de las 24 horas</strong> posteriores a la entrega</li>
              <li>Se requiere evidencia fotográfica del problema (producto dañado, fecha de vencimiento, etc.)</li>
              <li>El producto debe estar en su empaque original</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Productos NO Elegibles</h2>
            <p className="text-gray-700 mb-4">
              No se aceptan devoluciones o reembolsos si:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Han pasado más de 24 horas desde la entrega</li>
              <li>El producto ha sido abierto o consumido parcialmente</li>
              <li>El daño fue causado por mal almacenamiento o manejo del cliente</li>
              <li>Simplemente cambiaste de opinión sobre la compra</li>
              <li>El producto venció después de la fecha de entrega debido a falta de refrigeración adecuada</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Proceso de Reembolso</h2>

            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">Paso 1: Contactar</h3>
            <p className="text-gray-700 mb-4">
              Contacta a nuestro equipo de atención al cliente:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mb-4">
              <li><strong>Email:</strong> avicolalaspalmas01@gmail.com</li>
              <li><strong>Teléfono/WhatsApp:</strong> +57 321 837 2110</li>
              <li><strong>Horario:</strong> Atención 24 horas</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Proporciona:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Número de pedido</li>
              <li>Fotografías del producto y su empaque</li>
              <li>Descripción detallada del problema</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">Paso 2: Evaluación</h3>
            <p className="text-gray-700 mb-4">
              Nuestro equipo revisará tu solicitud dentro de <strong>24-48 horas hábiles</strong> y te contactará para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Confirmar la elegibilidad del reembolso</li>
              <li>Solicitar información adicional si es necesario</li>
              <li>Coordinar la devolución del producto (si aplica)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">Paso 3: Reembolso o Reemplazo</h3>
            <p className="text-gray-700 mb-4">
              Una vez aprobada tu solicitud, puedes elegir:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Reembolso completo:</strong> Se procesará en 5-10 días hábiles al método de pago original</li>
              <li><strong>Reemplazo del producto:</strong> Envío sin costo adicional en la siguiente entrega disponible</li>
              <li><strong>Crédito en tienda:</strong> Disponible inmediatamente para tu próxima compra</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Costos de Envío</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Si el problema es responsabilidad nuestra, cubrimos todos los costos de devolución y reenvío</li>
              <li>Si el cliente se equivocó en el pedido, el costo del envío de devolución corre por su cuenta</li>
              <li>Los costos de envío original no son reembolsables, excepto en caso de productos defectuosos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Casos Especiales</h2>

            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">Entregas Tardías</h3>
            <p className="text-gray-700 mb-4">
              Realizamos entregas semanales en Bogotá. Si tu pedido no llega en la fecha acordada, puedes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Rechazar el pedido sin cargo</li>
              <li>Solicitar un reembolso completo</li>
              <li>Aceptar el pedido con un descuento del 20% en tu próxima compra</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">Entregas No Recibidas</h3>
            <p className="text-gray-700 mb-4">
              Si no recibiste tu pedido:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Verifica con personas en tu dirección o vecinos</li>
              <li>Revisa el estado del pedido en tu cuenta</li>
              <li>Contacta a servicio al cliente dentro de las 48 horas</li>
              <li>Ofreceremos reemplazo o reembolso completo después de investigar con la empresa de logística</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Suscripciones</h2>
            <p className="text-gray-700 mb-4">
              Para pedidos de suscripción:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Puedes pausar o cancelar tu suscripción en cualquier momento desde tu cuenta</li>
              <li>Los cambios deben hacerse al menos 48 horas antes de la próxima entrega programada</li>
              <li>No se hacen reembolsos por entregas ya procesadas</li>
              <li>Puedes modificar frecuencia, productos o saltear entregas sin penalización</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Para cualquier duda sobre nuestra política de reembolso o para iniciar una solicitud:
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

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-bold text-amber-900 mb-2">💡 Consejo</h3>
            <p className="text-amber-800">
              Para garantizar la frescura de tus productos, asegúrate de refrigerarlos inmediatamente después de recibirlos.
              Toma fotos al momento de abrir el empaque para documentar cualquier problema potencial.
            </p>
          </div>
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
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold flex flex-col leading-none font-serif">
                  <span>AVICOLA</span>
                  <span>LAS PALMAS</span>
                </h2>
              </div>

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

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default RefundPolicy;
