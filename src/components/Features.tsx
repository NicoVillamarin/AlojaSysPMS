import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hotel, Calendar, CreditCard, BarChart3, Users, FileText, Globe, CalendarCheck, Map, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SystemMapModal from './SystemMap'
import capUno from '../assets/img/capUno.png'
import capDos from '../assets/img/capDos.png'
import CapTres from '../assets/img/CapTres.png'
import captCuatro from '../assets/img/captCuatro.png'
import captCingo from '../assets/img/captCingo.png'

const Features: React.FC = () => {
  const { ref } = useScrollAnimation({ once: false }) // Se revierte al hacer scroll
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const showcaseImages = [
    { id: 1, image: capUno, title: 'Dashboard Principal' },
    { id: 2, image: capDos, title: 'Gestión de Reservas' },
    { id: 3, image: CapTres, title: 'Calendario Interactivo' },
    { id: 4, image: captCuatro, title: 'Reportes y Análisis' },
    { id: 5, image: captCingo, title: 'Configuración' }
  ]

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [showcaseImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Categorías principales
  const categories = [
    { id: 'core', label: 'Gestión Core', icon: <Hotel size={20} /> },
    { id: 'reservas', label: 'Reservas', icon: <Calendar size={20} /> },
    { id: 'pagos', label: 'Pagos y Tarifas', icon: <CreditCard size={20} /> },
    { id: 'integraciones', label: 'Integraciones', icon: <Globe size={20} /> },
    { id: 'analisis', label: 'Análisis', icon: <BarChart3 size={20} /> }
  ]

  // Módulos consolidados (sin redundancias)
  const modules = [
    {
      category: 'core',
      icon: <Hotel size={40} />,
      title: "Alojamientos y Habitaciones",
      description: "Administra hoteles, hostels, habitaciones, precios y disponibilidad en tiempo real.",
      features: ["Información del alojamiento", "Tipos de habitaciones y precios", "Estados en tiempo real", "Check-in/out automático", "Multi-alojamiento"]
    },
    {
      category: 'reservas',
      icon: <Calendar size={40} />,
      title: "Reservas",
      description: "Control total del ciclo de vida de reservas con calendario visual interactivo.",
      features: ["Disponibilidad en tiempo real", "Creación rápida de reservas", "Calendario drag & drop", "Estados dinámicos", "Validaciones automáticas"]
    },
    {
      category: 'pagos',
      icon: <CreditCard size={40} />,
      title: "Pagos y Tarifas",
      description: "Procesa pagos seguros con tarifas dinámicas y políticas configurables.",
      features: ["Mercado Pago integrado", "Pagos manuales", "Políticas personalizables", "Tarifas dinámicas", "Impuestos automáticos"]
    },
    {
      category: 'integraciones',
      icon: <FileText size={40} />,
      title: "Facturación AFIP",
      description: "Facturación electrónica automática integrada con AFIP Argentina.",
      features: ["Facturación automática", "Integración AFIP completa", "Facturas A, B y C", "Comprobantes digitales"]
    },
    {
      category: 'integraciones',
      icon: <Globe size={40} />,
      title: "Booking y Airbnb",
      description: "Sincronización automática con las principales OTAs desde un solo lugar.",
      features: ["Booking.com integrado", "Airbnb sincronizado", "Sync bidireccional", "Disponibilidad unificada"]
    },
    {
      category: 'integraciones',
      icon: <CalendarCheck size={40} />,
      title: "Google Calendar",
      description: "Sincroniza reservas con Google Calendar para gestión visual completa.",
      features: ["Sync automática", "Eventos en tiempo real", "Integración nativa", "Vista unificada"]
    },
    {
      category: 'analisis',
      icon: <BarChart3 size={40} />,
      title: "Dashboard y Reportes",
      description: "Métricas y análisis en tiempo real con reportes personalizables.",
      features: ["Ocupación y disponibilidad", "Métricas de reservas", "Análisis financiero", "Reportes automáticos"]
    },
    {
      category: 'core',
      icon: <Users size={40} />,
      title: "Usuarios y Permisos",
      description: "Control de acceso y permisos del personal con estructura multi-empresa.",
      features: ["Perfiles de usuarios", "Permisos granulares", "Multi-empresa", "Reportes consolidados"]
    },
    {
      category: 'core',
      icon: <Sparkles size={40} />,
      title: "Housekeeping",
      description: "Gestión completa de limpieza con asignación automática y checklists.",
      features: ["Asignación automática", "Tareas diarias y checkout", "Checklists personalizables", "Seguimiento en tiempo real", "Gestión de turnos", "Alertas automáticas"]
    },
    {
      category: 'integraciones',
      icon: <MessageCircle size={40} />,
      title: "Chatbot WhatsApp",
      description: "Recibe y gestiona reservas directamente por WhatsApp con un chatbot inteligente.",
      features: ["Chatbot de reservas automático", "Flujo guiado de reservas", "Disponibilidad en tiempo real", "Notificaciones instantáneas", "Reservas desde WhatsApp"]
    }
  ]

  const filteredModules = selectedCategory 
    ? modules.filter(m => m.category === selectedCategory)
    : modules

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger más pronunciado
        delayChildren: 0.1
      }
    }
  }

  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  const cardVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      scale: 0.85,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0
    }
  }

  return (
    <section id="caracteristicas" className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Se revierte
        >
          <h2 className="features-title">Todo lo que necesitas</h2>
          <p className="features-subtitle">
            Gestión completa de tu alojamiento en una sola plataforma
          </p>
          <motion.button
            className="btn-view-map"
            onClick={() => setIsMapModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Map size={20} />
            Ver Mapa y Estructura del Sistema
          </motion.button>
        </motion.div>

        {/* Notebook Showcase */}
        <motion.div
          className="features-showcase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="features-laptop-container">
            <div className="features-laptop-3d">
              {/* Bisagra */}
              <div className="features-laptop-hinge"></div>
              
              {/* Pantalla */}
              <div className="features-laptop-screen-wrapper">
                <div className="features-laptop-screen-frame">
                  <div className="features-laptop-screen-bezel">
                    <div className="features-laptop-camera"></div>
                    <div className="features-laptop-screen-content">
                      <AnimatePresence mode="wait" custom={currentImageIndex}>
                        <motion.img
                          key={currentImageIndex}
                          src={showcaseImages[currentImageIndex].image}
                          alt={showcaseImages[currentImageIndex].title}
                          className="features-laptop-screen-image"
                          custom={currentImageIndex}
                          variants={imageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                        />
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Base del laptop */}
              <div className="features-laptop-base-wrapper">
                <div className="features-laptop-base">
                  <div className="features-laptop-keyboard-area">
                    <div className="features-laptop-keyboard-keys">
                      {Array.from({ length: 56 }).map((_, i) => (
                        <div key={i} className="features-laptop-key"></div>
                      ))}
                    </div>
                  </div>
                  <div className="features-laptop-trackpad-area">
                    <div className="features-laptop-trackpad"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles del carrusel */}
            <div className="features-carousel-controls">
              <button 
                className="features-carousel-btn features-carousel-btn-prev"
                onClick={prevImage}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="features-carousel-indicators">
                {showcaseImages.map((_, index) => (
                  <button
                    key={index}
                    className={`features-carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="features-carousel-btn features-carousel-btn-next"
                onClick={nextImage}
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filtros por categoría */}
        <motion.div 
          className="features-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <button
            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Se revierte al salir del viewport
          key={selectedCategory} // Re-animar al cambiar filtro
        >
          {filteredModules.map((module, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={cardVariants}
              custom={index} // Para stagger personalizado
              transition={{ 
                duration: 0.7,
                ease: "easeOut",
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ 
                y: -12,
                scale: 1.03,
                rotateY: 2,
                boxShadow: "0 30px 60px rgba(212, 175, 55, 0.2)"
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {module.icon}
              </motion.div>
              <h3 className="feature-title">{module.title}</h3>
              <p className="feature-description">{module.description}</p>
              <ul className="feature-list">
                {module.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <SystemMapModal 
        isOpen={isMapModalOpen} 
        onClose={() => setIsMapModalOpen(false)} 
      />
    </section>
  )
}

export default Features
