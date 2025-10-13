import React from 'react'
import { motion } from 'framer-motion'
import { Hotel, Calendar, CreditCard, BarChart3, Users, Settings, Shield, Clock } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Features: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const features = [
    {
      icon: <Hotel size={32} />,
      title: "Gestión de Habitaciones",
      description: "Administra tipos, precios, capacidad y estado de todas las habitaciones de tu hotel."
    },
    {
      icon: <Calendar size={32} />,
      title: "Calendario de Reservas",
      description: "Vista visual e interactiva de todas las reservas con gestión eficiente y en tiempo real."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Sistema de Pagos",
      description: "Procesa pagos de manera segura con Mercado Pago y múltiples métodos de pago."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Dashboard y Reportes",
      description: "Métricas y análisis del negocio en tiempo real con reportes automáticos."
    },
    {
      icon: <Users size={32} />,
      title: "Gestión de Usuarios",
      description: "Administra el acceso y permisos del personal con perfiles específicos por rol."
    },
    {
      icon: <Settings size={32} />,
      title: "Multi-Hotel",
      description: "Gestiona múltiples hoteles desde una sola plataforma con configuraciones centralizadas."
    },
    {
      icon: <Shield size={32} />,
      title: "Seguro y Confiable",
      description: "Protección de nivel empresarial para todos tus datos y transacciones."
    },
    {
      icon: <Clock size={32} />,
      title: "Disponible 24/7",
      description: "Acceso continuo a la plataforma, cuando y donde lo necesites."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="caracteristicas" className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="features-title">Funcionalidades Principales</h2>
          <p className="features-subtitle">
            Un sistema completo de gestión hotelera con todas las herramientas que necesitas
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
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
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features

