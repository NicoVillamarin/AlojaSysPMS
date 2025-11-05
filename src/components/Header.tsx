import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/img/logo_new_alone.png'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Función para scroll suave a una sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Altura del header
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false) // Cerrar el menú móvil después del click
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detectar sección activa
      const sections = ['inicio', 'integraciones', 'caracteristicas', 'modulos', 'casos', 'acerca', 'contacto']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="nav">
        <motion.div 
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="nav-logo">
            <motion.img 
              src={logoImg} 
              alt="AlojaSys" 
              className="logo-img"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <div className="logo-text">
              <span className="logo-aloja">Aloja</span><span className="logo-sys">Sys</span>
            </div>
          </div>
        </motion.div>
        
        {/* Menú de escritorio */}
        <div className="nav-menu-desktop">
          <motion.button 
            onClick={() => scrollToSection('inicio')}
            className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Inicio
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('integraciones')}
            className={`nav-link ${activeSection === 'integraciones' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Integraciones
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('caracteristicas')}
            className={`nav-link ${activeSection === 'caracteristicas' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Características
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('modulos')}
            className={`nav-link ${activeSection === 'modulos' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Módulos
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('casos')}
            className={`nav-link ${activeSection === 'casos' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Casos de uso
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('acerca')}
            className={`nav-link ${activeSection === 'acerca' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Acerca de
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('contacto')}
            className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contacto
          </motion.button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="nav-menu nav-menu-active"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button 
                onClick={() => scrollToSection('inicio')}
                className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inicio
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('integraciones')}
                className={`nav-link ${activeSection === 'integraciones' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Integraciones
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('caracteristicas')}
                className={`nav-link ${activeSection === 'caracteristicas' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Características
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('modulos')}
                className={`nav-link ${activeSection === 'modulos' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Módulos
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('casos')}
                className={`nav-link ${activeSection === 'casos' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Casos de uso
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('acerca')}
                className={`nav-link ${activeSection === 'acerca' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Acerca de
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('contacto')}
                className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contacto
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="nav-toggle" 
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header

