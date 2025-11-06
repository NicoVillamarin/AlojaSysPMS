import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Heart, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation({ once: false }) // Se revierte

  const values = [
    {
      icon: <MapPin size={32} />,
      title: "Hecho en Argentina",
      description: "Desarrollado en Mar del Plata por un equipo que conoce el mercado hotelero local"
    },
    {
      icon: <Users size={32} />,
      title: "Soporte Local",
      description: "Atención personalizada en español, cuando lo necesites"
    },
    {
      icon: <Heart size={32} />,
      title: "Enfocado en Hoteles",
      description: "Creado específicamente para las necesidades reales de hoteles argentinos"
    },
    {
      icon: <Zap size={32} />,
      title: "Simple y Rápido",
      description: "Sin complicaciones. Configuración rápida y uso intuitivo desde el primer día"
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
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
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Se revierte al hacer scroll
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
              Nuestra Historia
            </motion.h2>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AlojaSys nació en Mar del Plata, Buenos Aires, Argentina, de la necesidad real de 
              hoteles que buscan una solución moderna, simple y económica. Desarrollado por un 
              equipo local que conoce las particularidades del mercado hotelero argentino.
            </motion.p>
            
            <motion.p 
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Creemos que gestionar un hotel no debería ser complicado. Por eso, AlojaSys está 
              diseñado para ser intuitivo desde el primer día, sin necesidad de ser experto en 
              tecnología. Nuestro objetivo es que tu hotel funcione mejor, más simple y más eficiente.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="about-values"
            variants={containerVariants}
          >
            <motion.h3 
              className="values-title"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Nuestros Valores
            </motion.h3>
            
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="value-card"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="value-icon"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
