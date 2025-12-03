import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Clock, DollarSign, Users, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import DemoModal from './DemoModal'

const ProblemSolution: React.FC = () => {
  const { ref } = useScrollAnimation({ once: false })
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const problems = [
    {
      icon: <AlertTriangle size={24} />,
      title: "Sistemas complejos",
      description: "PMS difíciles de usar y configurar",
      color: "text-red-500"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Costos altos",
      description: "Precios en dólares y costos ocultos",
      color: "text-red-500"
    },
    {
      icon: <Clock size={24} />,
      title: "Implementación lenta",
      description: "Meses de configuración y capacitación",
      color: "text-red-500"
    },
    {
      icon: <Users size={24} />,
      title: "Soporte limitado",
      description: "Atención en otros idiomas y zonas horarias",
      color: "text-red-500"
    }
  ]

  const solutions = [
    {
      icon: <CheckCircle size={24} />,
      title: "Fácil de usar",
      description: "Intuitivo desde el primer día",
      color: "text-green-500"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Precio transparente",
      description: "Costos claros en pesos argentinos",
      color: "text-green-500"
    },
    {
      icon: <Zap size={24} />,
      title: "Implementación rápida",
      description: "Listo en 1 día",
      color: "text-green-500"
    },
    {
      icon: <Users size={24} />,
      title: "Soporte local",
      description: "Atención en español, horarios argentinos",
      color: "text-green-500"
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

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1
    }
  }

  return (
    <section id="problema-solucion" className="problem-solution">
      <div className="problem-solution-container">
        <motion.div 
          ref={ref}
          className="problem-solution-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Se revierte al hacer scroll
        >
          {/* Header */}
          <motion.div 
            className="problem-solution-header"
            variants={itemVariants}
          >
            <h2 className="problem-solution-title">
              ¿Cansado de sistemas complicados?
            </h2>
            <p className="problem-solution-subtitle">
              Conocemos los desafíos de los alojamientos argentinos. Por eso creamos AlojaSys.
            </p>
          </motion.div>

          {/* Problem and Solution Grid */}
          <div className="problem-solution-grid">
            {/* Problems */}
            <motion.div 
              className="problems-section"
              variants={itemVariants}
            >
              <h3 className="section-title problems-title">
                <AlertTriangle size={20} />
                Los problemas actuales
              </h3>
              <div className="problems-list">
                {problems.map((problem, index) => (
                  <motion.div 
                    key={index}
                    className="problem-item"
                    variants={itemVariants}
                    transition={{ 
                      duration: 0.7,
                      ease: "easeOut",
                      type: "spring", 
                      stiffness: 300 
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 5
                    }}
                  >
                    <div className={`problem-icon ${problem.color}`}>
                      {problem.icon}
                    </div>
                    <div className="problem-content">
                      <h4 className="problem-title">{problem.title}</h4>
                      <p className="problem-description">{problem.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div 
              className="solutions-section"
              variants={itemVariants}
            >
              <h3 className="section-title solutions-title">
                <CheckCircle size={20} />
                Nuestra solución
              </h3>
              <div className="solutions-list">
                {solutions.map((solution, index) => (
                  <motion.div 
                    key={index}
                    className="solution-item"
                    variants={itemVariants}
                    transition={{ 
                      duration: 0.7,
                      ease: "easeOut",
                      type: "spring", 
                      stiffness: 300 
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      x: -5
                    }}
                  >
                    <div className={`solution-icon ${solution.color}`}>
                      {solution.icon}
                    </div>
                    <div className="solution-content">
                      <h4 className="solution-title">{solution.title}</h4>
                      <p className="solution-description">{solution.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="problem-solution-cta"
            variants={itemVariants}
          >
            <h3 className="cta-title">¿Listo para cambiar?</h3>
            <p className="cta-description">
              Cambia a un sistema moderno, fácil y hecho para Argentina.
            </p>
            <motion.button
              className="btn btn-primary cta-button"
              onClick={() => setIsDemoModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Solicitar Demo Gratis
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal de Demo */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  )
}

export default ProblemSolution
