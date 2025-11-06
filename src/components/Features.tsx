import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hotel, Calendar, CreditCard, BarChart3, Users, FileText, Globe, CalendarCheck } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Features: React.FC = () => {
  const { ref } = useScrollAnimation({ once: false }) // Se revierte al hacer scroll
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      title: "Gestión de Hoteles y Habitaciones",
      description: "Configura y administra hoteles, habitaciones, tipos, precios y estados en tiempo real.",
      features: ["Datos del hotel e información legal", "Tipos de habitaciones y precios base", "Estados en tiempo real", "Horarios de check-in/out", "Gestión multi-hotel"]
    },
    {
      category: 'reservas',
      icon: <Calendar size={40} />,
      title: "Gestión de Reservas",
      description: "Maneja todo el ciclo de vida de una reserva con validaciones automáticas y calendario visual interactivo.",
      features: ["Consulta de disponibilidad en tiempo real", "Creación y gestión de reservas", "Calendario visual con arrastrar y soltar", "Estados de reserva dinámicos", "Validaciones automáticas"]
    },
    {
      category: 'pagos',
      icon: <CreditCard size={40} />,
      title: "Sistema de Pagos y Tarifas",
      description: "Procesa pagos de manera segura con políticas configurables y gestiona tarifas dinámicas.",
      features: ["Mercado Pago integrado", "Pagos manuales", "Políticas de pago configurables", "Tarifas dinámicas y promociones", "Cálculo automático de impuestos"]
    },
    {
      category: 'integraciones',
      icon: <FileText size={40} />,
      title: "Facturación AFIP",
      description: "Genera facturas electrónicas automáticamente integrado con AFIP de Argentina.",
      features: ["Facturación electrónica automática", "Integración completa con AFIP", "Facturas A, B y C", "Comprobantes automáticos"]
    },
    {
      category: 'integraciones',
      icon: <Globe size={40} />,
      title: "Integraciones con OTAs",
      description: "Sincroniza reservas automáticamente con Booking.com y Airbnb desde un solo lugar.",
      features: ["Booking.com integrado", "Airbnb sincronizado", "Sincronización bidireccional", "Gestión unificada de disponibilidad"]
    },
    {
      category: 'integraciones',
      icon: <CalendarCheck size={40} />,
      title: "Google Calendar",
      description: "Sincroniza todas tus reservas con Google Calendar para una gestión visual completa.",
      features: ["Sincronización automática", "Eventos en tiempo real", "Integración nativa", "Vista unificada"]
    },
    {
      category: 'analisis',
      icon: <BarChart3 size={40} />,
      title: "Dashboard y Reportes",
      description: "Métricas y análisis del negocio en tiempo real con reportes automáticos.",
      features: ["Métricas de habitaciones y ocupación", "Métricas de reservas en tiempo real", "Análisis financiero detallado", "Reportes automáticos personalizables"]
    },
    {
      category: 'core',
      icon: <Users size={40} />,
      title: "Gestión de Usuarios y Empresas",
      description: "Administra el acceso, permisos del personal y estructura empresarial multi-hotel.",
      features: ["Perfiles y tipos de usuarios", "Permisos granulares", "Gestión multi-empresa", "Reportes consolidados"]
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
          <h2 className="features-title">Funcionalidades Completas</h2>
          <p className="features-subtitle">
            Todo lo que necesitas para gestionar tu hotel de manera profesional, desde reservas hasta facturación
          </p>
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
    </section>
  )
}

export default Features
