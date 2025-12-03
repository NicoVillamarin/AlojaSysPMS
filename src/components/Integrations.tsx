import React from 'react'
import { motion } from 'framer-motion'
import { FileText, MessageCircle } from 'lucide-react'
// @ts-ignore
import Booking from '../assets/icons/Booking.jsx'
// @ts-ignore
import Airbnb from '../assets/icons/Airbnb.jsx'
// @ts-ignore
import GoogleCalendar from '../assets/icons/GoogleCalendar.jsx'

const Integrations: React.FC = () => {
  const items = [
    {
      icon: <Booking size="32" />,
      title: 'Booking.com',
      description: 'Sincronización de disponibilidad y reservas.'
    },
    {
      icon: <Airbnb size="32" />,
      title: 'Airbnb',
      description: 'Actualización automática del calendario.'
    },
    {
      icon: <FileText size={32} />,
      title: 'AFIP',
      description: 'Facturación electrónica integrada.'
    },
    {
      icon: <GoogleCalendar size="32" />,
      title: 'Google Calendar',
      description: 'Eventos de reservas en tiempo real.'
    },
    {
      icon: <MessageCircle size={32} />,
      title: 'WhatsApp',
      description: 'Chatbot inteligente para recibir reservas directamente por WhatsApp.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const cardVariants = {
    hidden: { 
      y: 80, 
      opacity: 0, 
      scale: 0.85,
      rotateY: -15
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      rotateY: 0
    }
  }

  return (
    <section id="integraciones" className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Se revierte
        >
          <h2 className="features-title">Integraciones que impulsan tu operación</h2>
          <p className="features-subtitle">Conectamos tu alojamiento con las plataformas clave del mercado</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Se revierte al hacer scroll
        >
          {items.map((i, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              variants={cardVariants}
              transition={{ 
                duration: 0.7,
                ease: "easeOut",
                type: 'spring', 
                stiffness: 300, 
                damping: 20 
              }}
              whileHover={{ 
                y: -12,
                scale: 1.03,
                rotateY: 3,
                boxShadow: '0 30px 60px rgba(212, 175, 55, 0.2)'
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {i.icon}
              </motion.div>
              <h3 className="feature-title">{i.title}</h3>
              <p className="feature-description">{i.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Integrations


