import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Home, Receipt, Rocket, Puzzle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import DemoModal from './DemoModal'

const Pricing: React.FC = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [expandedPlans, setExpandedPlans] = useState<Set<number>>(new Set())
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')

  const plans = [
    {
      name: "Plan Starter",
      target: "Hostels y hoteles pequeños",
      description: "Operación diaria simple con automatizaciones básicas incluidas",
      icon: <Home size={32} />,
      color: "var(--primary-color)",
      included: [
        { category: "Core / Configuración", items: [
          "Gestión de Hoteles",
          "Gestión de Habitaciones",
          "Gestión de Reservas",
          "Gestión de Usuarios básica"
        ]},
        { category: "Operación diaria", items: [
          "Calendario de reservas",
          "Dashboard y reportes básicos",
          "Sistema de notificaciones básico",
          "Housekeeping básico + tarea automática en check-out"
        ]},
        { category: "Pagos y políticas", items: [
          "Sistema de Pagos manuales",
          "Políticas de cancelación simples",
          "Manejo manual de cancelaciones"
        ]},
        { category: "Automatizaciones básicas", items: [
          "Emails automáticos simples (confirmación, cancelación, check-out)",
          "Auto check-in basado en fecha de llegada",
          "Auto check-out según fecha de salida",
          "Auto no-show cuando el huésped no se presenta"
        ]}
      ],
      notIncluded: [
        "Integraciones con OTAs",
        "Facturación electrónica AFIP",
        "Mercado Pago / pagos online",
        "Chatbot de WhatsApp"
      ]
    },
    {
      name: "Plan Pro",
      target: "Hoteles con facturación y pagos online",
      description: "PMS + Pagos online + AFIP + WhatsApp (BYON)",
      icon: <Receipt size={32} />,
      color: "var(--accent-color)",
      featured: true,
      included: [
        { category: "Todo el Plan Starter", items: [] },
        { category: "Pagos avanzados", items: [
          "Integración con Mercado Pago",
          "Links/QR de pago",
          "Sistema de señas y pagos parciales"
        ]},
        { category: "Políticas avanzadas", items: [
          "Políticas de cancelación detalladas",
          "Vouchers de crédito",
          "Reglas ligadas a la seña"
        ]},
        { category: "Facturación", items: [
          "Facturación electrónica AFIP",
          "Comprobantes desde reservas y pagos",
          "Asociación a huéspedes y reservas"
        ]},
        { category: "Automatizaciones de cobro", items: [
          "Envío automático del link de pago de seña por email o WhatsApp",
          "Cambio automático a estado 'Confirmada' cuando entra el pago",
          "Recordatorios automáticos de vencimiento de seña"
        ]},
        { category: "Chatbot WhatsApp", items: [
          "Chatbot de reservas (BYON)",
          "Flujo guiado por WhatsApp",
          "Reservas en estado PENDING",
          "Notificaciones internas"
        ]}
      ],
      notIncluded: [
        "Integraciones con OTAs / Channel Manager",
        "Número WhatsApp administrado por AlojaSys",
        "Housekeeping avanzado",
        "Conciliación bancaria automática"
      ]
    },
    {
      name: "Plan Premium",
      target: "Hoteles que centralizan todo el flujo operativo",
      description: "Todo incluido + OTAs + automatizaciones avanzadas",
      icon: <Rocket size={32} />,
      color: "var(--accent-color)",
      included: [
        { category: "Todo el Plan Pro", items: [] },
        { category: "Integraciones OTAs", items: [
          "Sincronización con Booking, Expedia, etc.",
          "Importación automática de reservas OTA",
          "Channel Manager completo"
        ]},
        { category: "Notificaciones avanzadas", items: [
          "Alertas por overbooking",
          "Conflictos de disponibilidad",
          "Notificaciones de pagos y vencimientos"
        ]},
        { category: "Housekeeping avanzado", items: [
          "Generación automática de tareas",
          "Asignación automática de personal",
          "Checklists configurables",
          "Métricas de desempeño"
        ]},
        { category: "Automatizaciones avanzadas", items: [
          "Reglas de tarifas avanzadas (CTA/CTD, min/max stay, días cerrados)",
          "Automatización de limpieza diaria y de mantenimiento",
          "Alertas inteligentes de overbooking y conflictos con OTAs",
          "Reglas automáticas específicas por canal OTA"
        ]},
        { category: "Opcional", items: [
          "WhatsApp número administrado por AlojaSys"
        ]}
      ],
      notIncluded: [
        "Desarrollo a medida fuera del roadmap"
      ]
    },
    {
      name: "Plan Custom",
      target: "Hoteles pequeños o proyectos especiales",
      description: "A la carta por módulos",
      icon: <Puzzle size={32} />,
      color: "var(--primary-color)",
      included: [
        { category: "Base obligatoria", items: [
          "Gestión de Hoteles",
          "Gestión de Habitaciones",
          "Gestión de Reservas"
        ]},
        { category: "Módulos opcionales", items: [
          "Pagos manuales simples",
          "Pagos avanzados / Mercado Pago",
          "Políticas de cancelación avanzadas",
          "Facturación electrónica AFIP",
          "OTAs / Channel Manager",
          "Chatbot WhatsApp (BYON o administrado)",
          "Housekeeping avanzado",
          "Conciliación bancaria",
          "Reportes adicionales"
        ]}
      ],
      notIncluded: []
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

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

  const cardVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section id="planes" className="pricing">
      <div className="pricing-container">
        <motion.div 
          className="pricing-header"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="pricing-title">Planes que se adaptan a tu negocio</h2>
          <p className="pricing-subtitle">
            Elige el plan que mejor se ajuste a las necesidades de tu alojamiento
          </p>
        </motion.div>

        <motion.div 
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                boxShadow: plan.featured 
                  ? "0 30px 60px rgba(197, 160, 40, 0.3)"
                  : "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              {plan.featured && (
                <div className="pricing-badge" style={{ background: plan.color }}>
                  Más Popular
                </div>
              )}
              
              <div className="pricing-card-header">
                <motion.div 
                  className="pricing-icon"
                  style={{ color: plan.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {plan.icon}
                </motion.div>
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <p className="pricing-target">{plan.target}</p>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-content">
                {plan.included.map((section, sectionIndex) => {
                  const isExpanded = expandedPlans.has(index)
                  const shouldShow = isExpanded || sectionIndex < 2 // Mostrar primeras 2 categorías siempre
                  
                  if (!shouldShow) return null
                  
                  return (
                    <motion.div 
                      key={sectionIndex} 
                      className="pricing-section"
                      initial={sectionIndex >= 2 ? { opacity: 0, y: -10 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: sectionIndex >= 2 ? (sectionIndex - 2) * 0.1 : 0 }}
                    >
                      <h4 className="pricing-section-title">{section.category}</h4>
                      {section.items.length > 0 && (
                        <ul className="pricing-features">
                          {section.items.map((item, itemIndex) => (
                            <li 
                              key={itemIndex}
                              className="pricing-feature"
                            >
                              <Check size={18} className="feature-check-icon" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )
                })}

                <AnimatePresence>
                  {expandedPlans.has(index) && plan.notIncluded.length > 0 && (
                    <motion.div 
                      className="pricing-not-included"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="pricing-section-title">No incluido</h4>
                      <ul className="pricing-features">
                        {plan.notIncluded.map((item, itemIndex) => (
                          <li key={itemIndex} className="pricing-feature not-included">
                            <X size={18} className="feature-x-icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {plan.included.length > 2 && (
                <div className="pricing-expand">
                  <button
                    type="button"
                    className="pricing-expand-button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()

                      const newExpanded = new Set(expandedPlans)
                      const wasExpanded = newExpanded.has(index)
                      
                      if (wasExpanded) {
                        newExpanded.delete(index)
                      } else {
                        newExpanded.add(index)
                      }
                      
                      setExpandedPlans(newExpanded)
                      
                      // Si se colapsa, hacer scroll al inicio de la sección de planes
                      if (wasExpanded) {
                        setTimeout(() => {
                          const planesSection = document.getElementById('planes')
                          if (planesSection) {
                            const headerHeight = 80
                            const sectionTop = planesSection.offsetTop - headerHeight
                            
                            window.scrollTo({
                              top: sectionTop,
                              behavior: 'smooth'
                            })
                          }
                        }, 100)
                      }
                    }}
                  >
                    {expandedPlans.has(index) ? (
                      <>
                        Ver menos
                        <ChevronUp size={18} />
                      </>
                    ) : (
                      <>
                        Ver más detalles
                        <ChevronDown size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="pricing-cta">
                <button
                  className="btn btn-primary pricing-cta-button"
                  onClick={() => {
                    setSelectedPlanName(plan.name)
                    setIsPricingModalOpen(true)
                  }}
                >
                  Consultar precio
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <DemoModal
        isOpen={isPricingModalOpen}
        onClose={() => {
          setIsPricingModalOpen(false)
          setSelectedPlanName('')
        }}
        mode="pricing"
        selectedPlan={selectedPlanName}
      />
    </section>
  )
}

export default Pricing

