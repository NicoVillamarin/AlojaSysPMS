import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
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
      description: 'Sincronización de disponibilidad y reservas. Conectado.'
    },
    {
      icon: <Airbnb size="32" />,
      title: 'Airbnb',
      description: 'Actualización automática del calendario. Conectado.'
    },
    {
      icon: <FileText size={32} />,
      title: 'AFIP',
      description: 'Facturación electrónica integrada. Conectado.'
    },
    {
      icon: <GoogleCalendar size="32" />,
      title: 'Google Calendar',
      description: 'Eventos de reservas en tiempo real. Conectado.'
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
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6 } }
  }

  return (
    <section id="integraciones" className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="features-title">Integraciones que impulsan tu operación</h2>
          <p className="features-subtitle">Conectamos tu hotel con las plataformas clave del mercado</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((i, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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


