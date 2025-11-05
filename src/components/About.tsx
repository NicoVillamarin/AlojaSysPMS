import React from 'react'
import { motion } from 'framer-motion'
import { Hotel, Users, Calendar, CreditCard, TrendingUp, Shield, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const stats = [
    { 
      number: "Rápido", 
      label: "Configuración", 
      icon: <Hotel size={32} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    { 
      number: "3", 
      label: "Idiomas disponibles", 
      icon: <TrendingUp size={32} />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    { 
      number: "100%", 
      label: "Configurable", 
      icon: <Shield size={32} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    { 
      number: "24/7", 
      label: "Soporte local", 
      icon: <Zap size={32} />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    }
  ]

  const benefits = [
    {
      icon: <Hotel size={24} />,
      title: "Diseñado para Hoteles",
      description: "Desarrollado específicamente para las necesidades del mercado hotelero"
    },
    {
      icon: <Users size={24} />,
      title: "Super Intuitivo",
      description: "Interfaz fácil de usar que cualquier persona puede dominar rápidamente"
    },
    {
      icon: <Calendar size={24} />,
      title: "3 Idiomas",
      description: "Español, inglés y portugués para hoteles internacionales"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Super Configurable",
      description: "Adaptable a cualquier tipo de hotel y necesidades específicas"
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
        duration: 0.8
      }
    }
  }

  const statsVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  const benefitVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6
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
              ¿Por qué elegir AlojaSys?
            </motion.h2>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AlojaSys nació en Mar del Plata, Buenos Aires, Argentina, de la necesidad real de 
              hoteles que buscan una solución moderna, simple y económica. Desarrollado por un 
              equipo local que conoce las particularidades del mercado hotelero.
            </motion.p>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              No necesitás ser experto en tecnología. AlojaSys está diseñado para ser intuitivo 
              desde el primer día, con soporte en español y atención personalizada para que 
              tu hotel funcione mejor que nunca.
            </motion.p>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Con integraciones con Booking.com, Airbnb, facturación electrónica AFIP y 
              sincronización con Google Calendar, AlojaSys te permite gestionar todas tus 
              reservas desde un solo lugar, sin importar de dónde vengan.
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
              Nuestras ventajas
            </motion.h3>
            <motion.div 
              className="stats-grid"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className={`stat-item stat-card ${stat.bgColor}`}
                  variants={statVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -3
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="stat-icon-wrapper"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + index * 0.1
                    }}
                  >
                    <div className={`stat-icon ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="stat-number"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + index * 0.1
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <motion.div 
                    className="stat-label"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.9 + index * 0.1
                    }}
                  >
                    {stat.label}
                  </motion.div>
                  
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

