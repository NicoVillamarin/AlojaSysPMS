import React from 'react'
import { motion } from 'framer-motion'
import { Hotel, Calendar, CreditCard, BarChart3, Users, Settings, DollarSign } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Modules: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const modules = [
    {
      icon: <Hotel size={40} />,
      title: "Gestión de Hoteles",
      description: "Configura y administra la información básica de cada hotel en el sistema.",
      features: ["Datos del hotel", "Información legal", "Horarios de check-in/out", "Zona horaria"]
    },
    {
      icon: <Hotel size={40} />,
      title: "Gestión de Habitaciones",
      description: "Administra todas las habitaciones: tipos, precios, capacidad y estado.",
      features: ["Tipos de habitaciones", "Precios base", "Capacidad máxima", "Estados en tiempo real"]
    },
    {
      icon: <Calendar size={40} />,
      title: "Gestión de Reservas",
      description: "Maneja todo el ciclo de vida de una reserva, desde la consulta hasta el check-out.",
      features: ["Consulta de disponibilidad", "Creación de reservas", "Estados de reserva", "Validaciones automáticas"]
    },
    {
      icon: <CreditCard size={40} />,
      title: "Sistema de Pagos",
      description: "Procesa pagos de manera segura y flexible, con políticas configurables.",
      features: ["Mercado Pago integrado", "Pagos manuales", "Políticas configurables", "Cálculo automático"]
    },
    {
      icon: <DollarSign size={40} />,
      title: "Gestión de Tarifas",
      description: "Configura precios dinámicos, promociones e impuestos de manera flexible.",
      features: ["Precios dinámicos", "Promociones", "Impuestos automáticos", "Restricciones de venta"]
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Dashboard y Reportes",
      description: "Proporciona métricas y análisis del negocio en tiempo real.",
      features: ["Métricas de habitaciones", "Métricas de reservas", "Métricas financieras", "Reportes automáticos"]
    },
    {
      icon: <Calendar size={40} />,
      title: "Calendario de Reservas",
      description: "Vista visual e interactiva de todas las reservas del hotel.",
      features: ["Vista mensual/semanal/diaria", "Colores por estado", "Filtros avanzados", "Gestión desde calendario"]
    },
    {
      icon: <Users size={40} />,
      title: "Gestión de Usuarios",
      description: "Administra el acceso y permisos del personal del hotel.",
      features: ["Perfiles de usuario", "Tipos de usuarios", "Asignación de hoteles", "Control de acceso"]
    },
    {
      icon: <Settings size={40} />,
      title: "Gestión de Empresas",
      description: "Administra empresas que pueden tener múltiples hoteles.",
      features: ["Estructura empresarial", "Configuraciones globales", "Personal compartido", "Reportes consolidados"]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
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
      scale: 0.9,
      rotateX: -10
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section id="modulos" className="modules">
      <div className="modules-container">
        <motion.div 
          className="modules-header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="modules-title">Módulos del Sistema</h2>
          <p className="modules-subtitle">
            Cada módulo está diseñado para cubrir una función específica de la gestión hotelera
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="modules-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {modules.map((module, index) => (
            <motion.div 
              key={index} 
              className="module-card"
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
                rotateY: 5
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              <motion.div 
                className="module-icon"
                whileHover={{ 
                  scale: 1.15,
                  rotate: 10
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {module.icon}
              </motion.div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
              <motion.ul 
                className="module-features"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {module.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="module-feature"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <motion.span 
                      className="feature-check"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      ✓
                    </motion.span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Modules
