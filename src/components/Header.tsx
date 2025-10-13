import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
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
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
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
              src="/src/assets/img/logo_new_alone.png" 
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
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="nav-menu nav-menu-active"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.a href="#inicio" className="nav-link" variants={linkVariants}>
                Inicio
              </motion.a>
              <motion.a href="#caracteristicas" className="nav-link" variants={linkVariants}>
                Características
              </motion.a>
              <motion.a href="#modulos" className="nav-link" variants={linkVariants}>
                Módulos
              </motion.a>
              <motion.a href="#acerca" className="nav-link" variants={linkVariants}>
                Acerca de
              </motion.a>
              <motion.a href="#contacto" className="nav-link" variants={linkVariants}>
                Contacto
              </motion.a>
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

