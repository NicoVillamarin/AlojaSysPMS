import React from 'react'
import { motion } from 'framer-motion'
import { Hotel, Calendar, CreditCard, BarChart3, FileText, Globe, CalendarCheck } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Features: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const features = [
    {
      icon: <Hotel size={32} />,
      title: "Gestión Completa",
      description: "Habitaciones, reservas, pagos y reportes desde una sola plataforma intuitiva."
    },
    {
      icon: <Calendar size={32} />,
      title: "Calendario Visual",
      description: "Vista clara de ocupación con arrastrar y soltar para gestionar reservas fácilmente."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Pagos Locales",
      description: "Integración con Mercado Pago y procesamiento manual adaptado a Argentina."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Reportes Automáticos",
      description: "Métricas clave, ocupación e ingresos que se actualizan automáticamente."
    },
    {
      icon: <FileText size={32} />,
      title: "Facturación AFIP",
      description: "Genera facturas electrónicas automáticamente integrado con AFIP de Argentina."
    },
    {
      icon: <Globe size={32} />,
      title: "Integraciones OTAs",
      description: "Sincroniza automáticamente con Booking.com y Airbnb desde un solo lugar."
    },
    {
      icon: <CalendarCheck size={32} />,
      title: "Google Calendar",
      description: "Sincroniza todas tus reservas con Google Calendar para gestión visual completa."
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
        duration: 0.8
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
        duration: 0.6
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
          <h2 className="features-title">Características Clave</h2>
          <p className="features-subtitle">
            Las funcionalidades principales que hacen la diferencia, incluyendo integraciones con OTAs y facturación AFIP
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

