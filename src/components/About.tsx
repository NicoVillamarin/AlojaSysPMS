import React from 'react'
import { motion } from 'framer-motion'
import { Hotel, Users, Calendar, CreditCard } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const stats = [
    { number: "100+", label: "Hoteles gestionados" },
    { number: "50,000+", label: "Reservas procesadas" },
    { number: "99.9%", label: "Tiempo de actividad" },
    { number: "24/7", label: "Soporte disponible" }
  ]

  const benefits = [
    {
      icon: <Hotel size={24} />,
      title: "Gestión Completa",
      description: "Administra todos los aspectos de tu hotel desde una sola plataforma"
    },
    {
      icon: <Users size={24} />,
      title: "Multi-Hotel",
      description: "Gestiona múltiples hoteles desde una cuenta centralizada"
    },
    {
      icon: <Calendar size={24} />,
      title: "Calendario Visual",
      description: "Vista clara e intuitiva de todas las reservas y ocupación"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Pagos Seguros",
      description: "Integración con Mercado Pago para transacciones seguras"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const statsVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const benefitVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="acerca" className="about">
      <div className="about-container">
        <motion.div 
          ref={ref}
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="about-text"
            variants={textVariants}
          >
            <motion.h2 
              className="about-title"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ¿Qué es AlojaSys?
            </motion.h2>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AlojaSys es un sistema de gestión hotelera completo que permite administrar 
              todos los aspectos de un hotel de manera digital y eficiente. Es como tener 
              un asistente digital que se encarga de gestionar habitaciones, administrar 
              reservas, procesar pagos y generar reportes.
            </motion.p>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Con su arquitectura modular y flexible, AlojaSys se adapta a cualquier tipo 
              de hotel, desde pequeños establecimientos boutique hasta grandes cadenas hoteleras, 
              proporcionando una base sólida para el crecimiento y la innovación en el sector hotelero.
            </motion.p>
            
            <motion.div 
              className="about-benefits"
              variants={containerVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="about-benefit"
                  variants={benefitVariants}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="benefit-icon"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">{benefit.title}</h4>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="about-stats"
            variants={statsVariants}
          >
            <motion.h3 
              className="stats-title"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Nuestros números
            </motion.h3>
            <motion.div 
              className="stats-grid"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="stat-item"
                  variants={statVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="stat-number"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

