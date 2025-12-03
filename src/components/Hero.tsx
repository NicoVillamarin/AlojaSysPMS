import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Hotel, Calendar, BarChart3, Users, Globe, CalendarCheck, Zap, Bell, Receipt, Wallet, Lock, Activity } from 'lucide-react'
import FloatingElements from './FloatingElements'
import VideoBackground from './VideoBackground'
import DemoModal from './DemoModal'
import ParallaxElement from './ParallaxElement'

const Hero: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Array de videos - usando los videos desde Cloudinary
  const videos = [
    'https://res.cloudinary.com/dsozqrhns/video/upload/v1760367161/videoUno_yqogk0.mp4', // videoUno
    'https://res.cloudinary.com/dsozqrhns/video/upload/v1760367481/videoDos_bz8lcu.mp4', // videoDos
    'https://res.cloudinary.com/dsozqrhns/video/upload/v1760367293/videoTres_tyma8r.mp4'  // videoTres
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } }
  }

  return (
    <section id="inicio" className="hero">
      <VideoBackground videos={videos} />
      <FloatingElements />

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={titleVariants}>
            Gestión hotelera
            <motion.span
              className="hero-title-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {" "}simple y profesional
            </motion.span>
          </motion.h1>

          <motion.div
            className="hero-slogan"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="slogan-text">El PMS completo para hoteles, hostels y alojamientos</span>
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            Todo lo que necesitas para gestionar tu alojamiento en una sola plataforma. 
            Con múltiples integraciones que automatizan y mejoran tu gestión diaria.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              onClick={() => setIsDemoModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Solicitar Demo Gratis
              <ArrowRight size={20} />
            </motion.button>
            {/*
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Play size={20} />
              Ver Video
            </motion.button> 
             */}
          </motion.div>
        </motion.div>

        {/* Burbujas flotantes modernas - Más pequeñas y profesionales */}
        <div className={`floating-bubbles-container ${isMobile ? 'no-animations' : ''}`}>
          {/* Burbuja 1 - Reservas rápidas */}
          <ParallaxElement speed={0.2} direction="up" className="bubble-parallax bubble-1">
            <motion.div
              className="floating-bubble bubble-size-md"
              initial={{ opacity: 0, scale: 0.3, x: -40, y: -30 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -6, 0],
                rotate: [0, 1.5, -1.5, 0]
              }}
              transition={{
                delay: 1.2,
                duration: 1.2,
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.12, y: -8 }}
            >
              <div className="bubble-icon">
                <CalendarCheck size={18} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Reservas rápidas</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 2 - Dashboard */}
          <ParallaxElement speed={0.25} direction="down" className="bubble-parallax bubble-2">
            <motion.div
              className="floating-bubble bubble-size-lg bubble-featured"
              initial={{ opacity: 0, scale: 0.3, x: 50, y: -35 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -7, 0],
                rotate: [0, -1.8, 1.8, 0]
              }}
              transition={{
                delay: 1.4,
                duration: 1.2,
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.15, y: -10, boxShadow: "0 12px 35px rgba(212, 175, 55, 0.4)" }}
            >
              <div className="bubble-icon bubble-icon-featured">
                <BarChart3 size={20} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Dashboard</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 3 - Multi-alojamiento */}
          <ParallaxElement speed={0.18} direction="up" className="bubble-parallax bubble-3">
            <motion.div
              className="floating-bubble bubble-size-sm"
              initial={{ opacity: 0, scale: 0.3, x: -60, y: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -5, 0],
                rotate: [0, 1.2, -1.2, 0]
              }}
              transition={{
                delay: 1.6,
                duration: 1.2,
                rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.12, y: -8 }}
            >
              <div className="bubble-icon">
                <Hotel size={16} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Multi-alojamiento</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 4 - Integraciones */}
          <ParallaxElement speed={0.22} direction="down" className="bubble-parallax bubble-4">
            <motion.div
              className="floating-bubble bubble-size-md bubble-featured"
              initial={{ opacity: 0, scale: 0.3, x: 65, y: 10 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, 6, 0],
                rotate: [0, -1.5, 1.5, 0]
              }}
              transition={{
                delay: 1.8,
                duration: 1.2,
                rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.15, y: -10, boxShadow: "0 12px 35px rgba(212, 175, 55, 0.4)" }}
            >
              <div className="bubble-icon bubble-icon-featured">
                <Globe size={18} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Booking & Airbnb</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 5 - Facturación */}
          <ParallaxElement speed={0.15} direction="up" className="bubble-parallax bubble-5">
            <motion.div
              className="floating-bubble bubble-size-sm"
              initial={{ opacity: 0, scale: 0.3, x: -45, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -4, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{
                delay: 2.0,
                duration: 1.2,
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.12, y: -8 }}
            >
              <div className="bubble-icon">
                <Receipt size={16} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Facturación AFIP</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 6 - Reportes */}
          <ParallaxElement speed={0.2} direction="down" className="bubble-parallax bubble-6">
            <motion.div
              className="floating-bubble bubble-size-md"
              initial={{ opacity: 0, scale: 0.3, x: 55, y: 45 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, 5, 0],
                rotate: [0, -1.2, 1.2, 0]
              }}
              transition={{
                delay: 2.2,
                duration: 1.2,
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.12, y: -8 }}
            >
              <div className="bubble-icon">
                <Activity size={17} />
              </div>
              <div className="bubble-content">
                <div className="bubble-text">Reportes</div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Burbuja 7 - Pagos */}
          <motion.div
            className="floating-bubble bubble-7 bubble-size-sm"
            initial={{ opacity: 0, scale: 0.3, x: -35, y: -15 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, -4, 0],
              rotate: [0, 1.3, -1.3, 0]
            }}
            transition={{
              delay: 2.4,
              duration: 1.2,
              rotate: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, y: -8 }}
          >
            <div className="bubble-icon">
              <Wallet size={15} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Mercado Pago</div>
            </div>
          </motion.div>

          {/* Burbuja 8 - Seguridad */}
          <motion.div
            className="floating-bubble bubble-8 bubble-size-sm"
            initial={{ opacity: 0, scale: 0.3, x: 38, y: -18 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, 4, 0],
              rotate: [0, -1.4, 1.4, 0]
            }}
            transition={{
              delay: 2.6,
              duration: 1.2,
              rotate: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, y: -8 }}
          >
            <div className="bubble-icon">
              <Lock size={15} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Seguro</div>
            </div>
          </motion.div>

          {/* Burbuja 9 - Notificaciones */}
          <motion.div
            className="floating-bubble bubble-9 bubble-size-sm"
            initial={{ opacity: 0, scale: 0.3, x: 25, y: 8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, -5, 0],
              rotate: [0, 1.6, -1.6, 0]
            }}
            transition={{
              delay: 2.8,
              duration: 1.2,
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, y: -8 }}
          >
            <div className="bubble-icon">
              <Bell size={15} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Notificaciones</div>
            </div>
          </motion.div>

          {/* Burbuja 10 - Velocidad */}
          <motion.div
            className="floating-bubble bubble-10 bubble-size-sm"
            initial={{ opacity: 0, scale: 0.3, x: -28, y: 28 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, 5, 0],
              rotate: [0, -1.4, 1.4, 0]
            }}
            transition={{
              delay: 3.0,
              duration: 1.2,
              rotate: { duration: 6.3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.1, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, y: -8 }}
          >
            <div className="bubble-icon">
              <Zap size={15} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Rápido</div>
            </div>
          </motion.div>

          {/* Burbuja 11 - Google Calendar */}
          <motion.div
            className="floating-bubble bubble-11 bubble-size-md bubble-featured"
            initial={{ opacity: 0, scale: 0.3, x: 42, y: 32 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, -6, 0],
              rotate: [0, 1.7, -1.7, 0]
            }}
            transition={{
              delay: 3.2,
              duration: 1.2,
              rotate: { duration: 7.2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.7, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10, boxShadow: "0 12px 35px rgba(212, 175, 55, 0.4)" }}
          >
            <div className="bubble-icon bubble-icon-featured">
              <Calendar size={18} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Google Calendar</div>
            </div>
          </motion.div>

          {/* Burbuja 12 - Soporte */}
          <motion.div
            className="floating-bubble bubble-12 bubble-size-sm"
            initial={{ opacity: 0, scale: 0.3, x: -32, y: 35 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, 6, 0],
              rotate: [0, -1.8, 1.8, 0]
            }}
            transition={{
              delay: 3.4,
              duration: 1.2,
              rotate: { duration: 7.8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, y: -8 }}
          >
            <div className="bubble-icon">
              <Users size={15} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Soporte local</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de Demo */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  )
}

export default Hero
