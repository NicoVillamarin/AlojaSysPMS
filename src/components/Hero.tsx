import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Hotel, Calendar, CreditCard, BarChart3 } from 'lucide-react'
import ParallaxElement from './ParallaxElement'
import FloatingElements from './FloatingElements'
import VideoBackground from './VideoBackground'

const Hero: React.FC = () => {
  // Array de videos - usando los videos que subiste
  const videos = [
    new URL('../assets/videos/videoTres.mp4', import.meta.url).href,  // videoTres ahora es el primero
    new URL('../assets/videos/videoUno.mp4', import.meta.url).href,   // videoUno ahora es el segundo
    new URL('../assets/videos/videoDos.mp4', import.meta.url).href    // videoDos ahora es el tercero
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  }

  const dashboardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
          <motion.h1 
            className="hero-title"
            variants={titleVariants}
          >
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
          
          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            Administra tu hotel de manera digital y eficiente. Gestiona reservas, habitaciones, 
            pagos y reportes desde una sola plataforma moderna y fácil de usar.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <motion.button 
              className="btn btn-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Solicitar Demo
              <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Play size={20} />
              Ver Video
            </motion.button>
          </motion.div>
        </motion.div>
        
        <ParallaxElement speed={-0.3}>
          <motion.div 
            className="hero-image"
            variants={dashboardVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="hero-dashboard"
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
             <motion.div 
               className="dashboard-header"
               variants={cardVariants}
               initial="hidden"
               animate="visible"
               transition={{ delay: 1.2 }}
             >
               <div className="dashboard-title">Resultados Comprobados</div>
               <div className="dashboard-stats">
                 <motion.div 
                   className="stat"
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <BarChart3 size={16} />
                   <span>60% Menos Tiempo</span>
                 </motion.div>
                 <motion.div 
                   className="stat"
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <Hotel size={16} />
                   <span>25% Más Ocupación</span>
                 </motion.div>
               </div>
             </motion.div>
             
             <motion.div 
               className="dashboard-content"
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               transition={{ delay: 1.4 }}
             >
               <motion.div 
                 className="dashboard-card"
                 variants={cardVariants}
                 whileHover={{ 
                   y: -5,
                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <BarChart3 size={24} />
                 <h4>Reduce el tiempo de gestión en 60%</h4>
                 <p>Automatiza procesos y optimiza operaciones</p>
               </motion.div>
               <motion.div 
                 className="dashboard-card"
                 variants={cardVariants}
                 whileHover={{ 
                   y: -5,
                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <Hotel size={24} />
                 <h4>Aumenta la ocupación en 25%</h4>
                 <p>Mejora la gestión de reservas y precios</p>
               </motion.div>
               <motion.div 
                 className="dashboard-card"
                 variants={cardVariants}
                 whileHover={{ 
                   y: -5,
                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <Calendar size={24} />
                 <h4>Procesa 1000+ reservas mensuales</h4>
                 <p>Capacidad de alto volumen sin errores</p>
               </motion.div>
             </motion.div>
          </motion.div>
        </motion.div>
        </ParallaxElement>
      </div>
    </section>
  )
}

export default Hero

