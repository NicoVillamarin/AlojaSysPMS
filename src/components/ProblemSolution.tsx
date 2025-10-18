import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Clock, DollarSign, Users, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ProblemSolution: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const problems = [
    {
      icon: <AlertTriangle size={24} />,
      title: "Sistemas complicados",
      description: "PMS extranjeros difíciles de usar y configurar",
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
      title: "Setup lento",
      description: "Meses para configurar y capacitar al personal",
      color: "text-red-500"
    },
    {
      icon: <Users size={24} />,
      title: "Soporte lejano",
      description: "Atención en inglés y horarios extranjeros",
      color: "text-red-500"
    }
  ]

  const solutions = [
    {
      icon: <CheckCircle size={24} />,
      title: "Interfaz intuitiva",
      description: "Diseñado para ser fácil de usar desde el primer día",
      color: "text-green-500"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Precio justo",
      description: "Costos transparentes en pesos argentinos",
      color: "text-green-500"
    },
    {
      icon: <Zap size={24} />,
      title: "Setup rápido",
      description: "Configuración completa en 1 día",
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
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  return (
    <section id="problema-solucion" className="problem-solution">
      <div className="problem-solution-container">
        <motion.div 
          ref={ref}
          className="problem-solution-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div 
            className="problem-solution-header"
            variants={itemVariants}
          >
            <h2 className="problem-solution-title">
              ¿Estás cansado de los PMS complicados?
            </h2>
            <p className="problem-solution-subtitle">
              Conocemos los problemas que enfrentan los hoteles argentinos. 
              Por eso creamos AlojaSys.
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
                    whileHover={{ 
                      scale: 1.02,
                      x: 5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
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
                    whileHover={{ 
                      scale: 1.02,
                      x: -5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
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
              Dejá atrás los sistemas complicados y costosos. 
              AlojaSys es la solución que tu hotel necesita.
            </p>
            <motion.button
              className="btn btn-primary cta-button"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Ver Demo Gratis
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemSolution
