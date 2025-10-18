import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Target, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Roadmap: React.FC = () => {
  const { ref, isInView } = useScrollAnimation()

  const phases = [
    {
      icon: <CheckCircle size={32} />,
      status: "Completada",
      statusColor: "var(--accent-color)",
      title: "Sistema Core",
      description: "La base sólida de AlojaSys. Todo lo esencial para gestionar un hotel de manera profesional.",
      features: [
        "Gestión completa de hoteles y habitaciones",
        "Sistema de reservas con validaciones avanzadas",
        "Integración completa con Mercado Pago",
        "Dashboard con métricas en tiempo real",
        "Calendario interactivo de reservas",
        "Gestión de usuarios y permisos granulares"
      ],
      iconColor: "var(--accent-color)"
    },
    {
      icon: <CheckCircle size={32} />,
      status: "Completada",
      statusColor: "var(--accent-color)",
      title: "Funcionalidades Avanzadas",
      description: "Características profesionales que te diferencian de la competencia.",
      features: [
        "Políticas de cancelación flexibles y configurables",
        "Sistema completo de vouchers de crédito",
        "Reembolsos automáticos 24/7 con múltiples métodos",
        "Sistema de notificaciones inteligente en tiempo real",
        "Gestión multi-hotel y multi-empresa",
        "Motor de tarifas dinámicas y promociones"
      ],
      iconColor: "var(--accent-color)"
    },
    {
      icon: <CheckCircle size={32} />,
      status: "Completada",
      statusColor: "var(--accent-color)",
      title: "Sistema de Pagos Completo",
      description: "Procesamiento de pagos, políticas y reembolsos totalmente implementado.",
      features: [
        "Políticas de pago configurables por hotel",
        "Procesamiento automático de reembolsos",
        "Sistema de vouchers con códigos únicos",
        "Integración con múltiples pasarelas de pago",
        "Gestión de penalidades por NO_SHOW",
        "Tareas automáticas con Celery y Redis"
      ],
      iconColor: "var(--accent-color)"
    },
    {
      icon: <CheckCircle size={32} />,
      status: "Completada",
      statusColor: "var(--accent-color)",
      title: "Análisis y Reportes",
      description: "Métricas completas y análisis del negocio en tiempo real.",
      features: [
        "Dashboard con métricas en tiempo real",
        "Cálculo automático de ocupación y ADR",
        "Reportes financieros detallados",
        "Análisis por tipo de habitación",
        "Métricas de huéspedes y reservas",
        "Sistema de notificaciones automáticas"
      ],
      iconColor: "var(--accent-color)"
    }
  ]

  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  }

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

  const phaseVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      scale: 0.9,
      rotateX: -10
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const featureVariants = {
    hidden: { 
      x: -20, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  }

  const commitmentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="roadmap" className="roadmap">
      <div className="roadmap-container">
        <motion.div
          className="roadmap-header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="roadmap-title">
            Nuestro <span className="roadmap-title-accent">Roadmap</span> de Desarrollo
          </h2>
          <p className="roadmap-subtitle">
            Un vistazo a lo que hemos logrado y hacia dónde nos dirigimos, con total transparencia.
          </p>
        </motion.div>

        <div className="roadmap-timeline">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`roadmap-phase ${index % 2 === 0 ? 'roadmap-phase-left' : 'roadmap-phase-right'}`}
              initial={{ 
                y: 80, 
                opacity: 0,
                scale: 0.9,
                rotateX: -10
              }}
              whileInView={{ 
                y: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2
              }}
            >
              <motion.div 
                className="roadmap-phase-content"
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
                  rotateY: 5
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className="roadmap-phase-header">
                  <motion.div 
                    className="roadmap-phase-icon" 
                    style={{ color: phase.iconColor }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: 10
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {phase.icon}
                  </motion.div>
                  <div className="roadmap-phase-info">
                    <p 
                      className="roadmap-status-badge" 
                      style={{ borderColor: phase.statusColor, color: phase.statusColor }}
                    >
                      {phase.status}
                    </p>
                    <h3 className="roadmap-phase-title">{phase.title}</h3>
                    <p className="roadmap-phase-description">{phase.description}</p>
                  </div>
                </div>
                <motion.ul 
                  className="roadmap-phase-features"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.5 + (index * 0.2) }}
                >
                  {phase.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="roadmap-phase-feature"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                        delay: (index * 0.2) + (featureIndex * 0.1),
                        duration: 0.4
                      }}
                    >
                      <motion.span 
                        className="roadmap-feature-check" 
                        style={{ background: phase.statusColor }}
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 360 
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        ✓
                      </motion.span>
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

            <motion.div
              className="roadmap-commitment"
              variants={commitmentVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="roadmap-commitment-title">Nuestro Compromiso Contigo</h3>
              <div className="roadmap-commitment-stats">
                <div className="roadmap-stat">
                  <p className="roadmap-stat-number">100%</p>
                  <p className="roadmap-stat-label">Transparencia</p>
                  <p className="roadmap-stat-description">Creemos en la honestidad y la comunicación abierta en cada paso.</p>
                </div>
                <div className="roadmap-stat">
                  <p className="roadmap-stat-number">24/7</p>
                  <p className="roadmap-stat-label">Soporte</p>
                  <p className="roadmap-stat-description">Siempre estamos aquí para ayudarte a crecer y resolver tus dudas.</p>
                </div>
                <div className="roadmap-stat">
                  <p className="roadmap-stat-number">∞</p>
                  <p className="roadmap-stat-label">Potencial</p>
                  <p className="roadmap-stat-description">Un sistema diseñado para escalar y evolucionar junto a tu negocio.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="roadmap-cta"
              variants={ctaVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="roadmap-cta-text">¿Quieres ser uno de nuestros primeros hoteles?</p>
              <a href="#contact" className="roadmap-cta-button">Solicitar Demo</a>
            </motion.div>
      </div>
    </section>
  )
}

export default Roadmap
