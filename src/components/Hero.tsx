import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Hotel, Calendar, BarChart3 } from 'lucide-react'
import FloatingElements from './FloatingElements'
import VideoBackground from './VideoBackground'

const Hero: React.FC = () => {
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
            Sistema de Gestión Hotelera
            <motion.span
              className="hero-title-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {" "}AlojaSys
            </motion.span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            Administra tu hotel de manera digital y eficiente. Gestiona reservas, habitaciones, 
            pagos y reportes desde una sola plataforma moderna y fácil de usar.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Solicitar Demo
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Play size={20} />
              Ver Video
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Burbujas flotantes que rodean el contenido central */}
        <div className="floating-bubbles-container">
          {/* Burbuja 1 - Superior izquierda */}
          <motion.div
            className="floating-bubble bubble-1"
            initial={{ opacity: 0, scale: 0.3, x: -60, y: -40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              delay: 1.2, 
              duration: 1.2,
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={20} />
            </div>
            <div className="bubble-content">
              <div className="bubble-number">60%</div>
              <div className="bubble-label">Menos Tiempo</div>
            </div>
          </motion.div>

          {/* Burbuja 2 - Superior derecha */}
          <motion.div
            className="floating-bubble bubble-2"
            initial={{ opacity: 0, scale: 0.3, x: 60, y: -40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -8, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ 
              delay: 1.4, 
              duration: 1.2,
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Hotel size={20} />
            </div>
            <div className="bubble-content">
              <div className="bubble-number">25%</div>
              <div className="bubble-label">Más Ocupación</div>
            </div>
          </motion.div>

          {/* Burbuja 3 - Centro izquierda */}
          <motion.div
            className="floating-bubble bubble-3"
            initial={{ opacity: 0, scale: 0.3, x: -80, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -10, 0],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{ 
              delay: 1.6, 
              duration: 1.2,
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Calendar size={20} />
            </div>
            <div className="bubble-content">
              <div className="bubble-number">1000+</div>
              <div className="bubble-label">Reservas/Mes</div>
            </div>
          </motion.div>

          {/* Burbuja 4 - Centro derecha */}
          <motion.div
            className="floating-bubble bubble-4"
            initial={{ opacity: 0, scale: 0.3, x: 80, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 8, 0],
              rotate: [0, -1.5, 1.5, 0]
            }}
            transition={{ 
              delay: 1.8, 
              duration: 1.2,
              rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={18} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Automatización</div>
            </div>
          </motion.div>

          {/* Burbuja 5 - Inferior izquierda */}
          <motion.div
            className="floating-bubble bubble-5"
            initial={{ opacity: 0, scale: 0.3, x: -50, y: 60 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -6, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              delay: 2.0, 
              duration: 1.2,
              rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Hotel size={18} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Eficiencia</div>
            </div>
          </motion.div>

          {/* Burbuja 6 - Inferior derecha */}
          <motion.div
            className="floating-bubble bubble-6"
            initial={{ opacity: 0, scale: 0.3, x: 50, y: 60 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 6, 0],
              rotate: [0, -1, 1, 0]
            }}
            transition={{ 
              delay: 2.2, 
              duration: 1.2,
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Calendar size={18} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Calidad</div>
            </div>
          </motion.div>

          {/* Burbujas adicionales para mejor distribución */}
          <motion.div
            className="floating-bubble bubble-7"
            initial={{ opacity: 0, scale: 0.3, x: -40, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -5, 0],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{ 
              delay: 2.4, 
              duration: 1.2,
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Gestión</div>
            </div>
          </motion.div>

          <motion.div
            className="floating-bubble bubble-8"
            initial={{ opacity: 0, scale: 0.3, x: 40, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 5, 0],
              rotate: [0, -1.5, 1.5, 0]
            }}
            transition={{ 
              delay: 2.6, 
              duration: 1.2,
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Hotel size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Optimización</div>
            </div>
          </motion.div>

          {/* Burbujas adicionales para llenar espacios intermedios */}
          <motion.div
            className="floating-bubble bubble-9"
            initial={{ opacity: 0, scale: 0.3, x: 30, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              delay: 2.8, 
              duration: 1.2,
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Calendar size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Rendimiento</div>
            </div>
          </motion.div>

          <motion.div
            className="floating-bubble bubble-10"
            initial={{ opacity: 0, scale: 0.3, x: -30, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 6, 0],
              rotate: [0, -1.5, 1.5, 0]
            }}
            transition={{ 
              delay: 3.0, 
              duration: 1.2,
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Innovación</div>
            </div>
          </motion.div>

          {/* Burbujas adicionales para llenar espacios superiores */}
          <motion.div
            className="floating-bubble bubble-11"
            initial={{ opacity: 0, scale: 0.3, x: 45, y: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -6, 0],
              rotate: [0, 1.8, -1.8, 0]
            }}
            transition={{ 
              delay: 3.2, 
              duration: 1.2,
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Hotel size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Tecnología</div>
            </div>
          </motion.div>

          <motion.div
            className="floating-bubble bubble-12"
            initial={{ opacity: 0, scale: 0.3, x: -45, y: 25 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 8, 0],
              rotate: [0, -2.2, 2.2, 0]
            }}
            transition={{ 
              delay: 3.4, 
              duration: 1.2,
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Calendar size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Solución</div>
            </div>
          </motion.div>

          {/* Burbujas adicionales para llenar espacios laterales */}
          <motion.div
            className="floating-bubble bubble-13"
            initial={{ opacity: 0, scale: 0.3, x: 55, y: 5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -7, 0],
              rotate: [0, 2.5, -2.5, 0]
            }}
            transition={{ 
              delay: 3.6, 
              duration: 1.2,
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Digital</div>
            </div>
          </motion.div>

          <motion.div
            className="floating-bubble bubble-14"
            initial={{ opacity: 0, scale: 0.3, x: -55, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 9, 0],
              rotate: [0, -2.8, 2.8, 0]
            }}
            transition={{ 
              delay: 3.8, 
              duration: 1.2,
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Hotel size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Moderno</div>
            </div>
          </motion.div>

          {/* Burbujas adicionales para llenar espacios superiores */}
          <motion.div
            className="floating-bubble bubble-15"
            initial={{ opacity: 0, scale: 0.3, x: 65, y: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              delay: 4.0, 
              duration: 1.2,
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <Calendar size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Inteligente</div>
            </div>
          </motion.div>

          <motion.div
            className="floating-bubble bubble-16"
            initial={{ opacity: 0, scale: 0.3, x: -65, y: 45 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: [0, 10, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              delay: 4.2, 
              duration: 1.2,
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.15, y: -10 }}
          >
            <div className="bubble-icon">
              <BarChart3 size={16} />
            </div>
            <div className="bubble-content">
              <div className="bubble-text">Avanzado</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
