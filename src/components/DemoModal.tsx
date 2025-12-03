import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Hotel, User, Phone, Calendar, Building } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'
import Whasapp from '../assets/icons/Whasapp'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: 'demo' | 'pricing'
  selectedPlan?: string
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, mode = 'demo', selectedPlan }) => {
  const isPricingMode = mode === 'pricing'
  
  const modalTitle = isPricingMode ? 'Consultar Precios de AlojaSys' : 'Solicitar Demo de AlojaSys'
  const modalSubtitle = isPricingMode 
    ? 'Elige cómo prefieres que nos contactemos contigo para conocer los precios'
    : 'Elige cómo prefieres que nos contactemos contigo'
  const emailOptionTitle = isPricingMode ? 'Consultar via Email' : 'Solicitar via Email'
  const whatsappOptionTitle = isPricingMode ? 'Consultar via WhatsApp' : 'Solicitar via WhatsApp'
  const emailFormTitle = isPricingMode ? 'Consultar Precios por Email' : 'Solicitar Demo por Email'
  const whatsappFormTitle = isPricingMode ? 'Consultar Precios por WhatsApp' : 'Solicitar Demo por WhatsApp'
  const submitButtonText = isPricingMode ? 'Enviar consulta de precios' : 'Enviar solicitud de demo'
  const successMessage = isPricingMode 
    ? '¡Consulta enviada! Te contactaremos pronto con información de precios.'
    : '¡Solicitud enviada! Te contactaremos pronto para coordinar la demo.'
  const [selectedOption, setSelectedOption] = useState<'email' | 'whatsapp' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hotel: '',
    company: '',
    position: '',
    preferredDate: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        hotel: formData.hotel,
        company: formData.company,
        position: formData.position,
        preferred_date: formData.preferredDate,
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        reply_to: formData.email,
        request_type: isPricingMode ? 'Consulta de Precios' : 'Solicitud de Demo',
        selected_plan: selectedPlan || (isPricingMode ? 'No especificado' : 'N/A'),
        plan_info: selectedPlan && isPricingMode ? `Plan consultado: ${selectedPlan}` : '',
        current_date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.DEMO_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        hotel: '',
        company: '',
        position: '',
        preferredDate: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitStatus('idle')
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Error al enviar la solicitud de demo:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppClick = () => {
    const name = formData.name || '[Nombre]'
    const hotel = formData.hotel || '[Hotel/Empresa]'
    const position = formData.position || '[Cargo]'
    const phone = formData.phone || '[Teléfono]'
    const preferredDate = formData.preferredDate || '[Fecha preferida]'
    const message = formData.message || '[Sin mensaje adicional]'
    
    const planInfo = selectedPlan && isPricingMode ? `\n📦 *Plan consultado:* ${selectedPlan}` : ''
    
    const whatsappMessage = isPricingMode 
      ? `🏨 *Consulta de Precios - AlojaSys*

Hola! Me interesa conocer los precios de AlojaSys para mi alojamiento.${planInfo}

📋 *Mis datos:*
• Nombre: ${name}
• Hotel/Empresa: ${hotel}
• Cargo: ${position}
• Teléfono: ${phone}
• Fecha preferida: ${preferredDate}

💬 *Mensaje:*
${message}

¿Podrían contactarme con información de precios? ¡Gracias!`
      : `🏨 *Solicitud de Demo - AlojaSys*

Hola! Me interesa solicitar una demo de AlojaSys para mi alojamiento.

📋 *Mis datos:*
• Nombre: ${name}
• Hotel/Empresa: ${hotel}
• Cargo: ${position}
• Teléfono: ${phone}
• Fecha preferida: ${preferredDate}

💬 *Mensaje:*
${message}

¿Podrían contactarme para coordinar la demo? ¡Gracias!`
    
    const whatsappUrl = `https://wa.me/${EMAILJS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const resetModal = () => {
    setSelectedOption(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      hotel: '',
      company: '',
      position: '',
      preferredDate: '',
      message: ''
    })
    setSubmitStatus('idle')
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleClose}>
              <X size={24} />
            </button>

            {!selectedOption ? (
              <motion.div 
                className="modal-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="modal-title">{modalTitle}</h2>
                <p className="modal-subtitle">
                  {modalSubtitle}
                </p>
                
                <div className="option-cards">
                  <motion.button
                    className="option-card"
                    onClick={() => setSelectedOption('email')}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Mail size={48} className="option-icon" />
                    </motion.div>
                      <h3>{emailOptionTitle}</h3>
                      <p>Completa el formulario y te contactaremos por email</p>
                  </motion.button>

                  <motion.button
                    className="option-card"
                    onClick={() => setSelectedOption('whatsapp')}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <Whasapp size={48} className="option-icon" />
                    </motion.div>
                      <h3>{whatsappOptionTitle}</h3>
                      <p>Chatea directamente con nuestro equipo</p>
                  </motion.button>
                </div>
              </motion.div>
            ) : selectedOption === 'email' ? (
              <motion.div 
                className="modal-scroll-container"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                key="email"
              >
                <div className="modal-form">
                  <motion.div 
                    className="form-header"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <motion.button 
                      className="back-button"
                      onClick={() => setSelectedOption(null)}
                      whileHover={{ x: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Volver
                    </motion.button>
                    <h2 className="form-title">{emailFormTitle}</h2>
                  </motion.div>

                  {submitStatus === 'success' && (
                    <div className="form-message form-message-success">
                      <Mail size={20} />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="form-message form-message-error">
                      <X size={20} />
                      <span>Error al enviar la solicitud. Por favor, inténtalo de nuevo.</span>
                    </div>
                  )}

                  <form onSubmit={handleEmailSubmit} className="demo-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          <User size={16} />
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">
                          <Mail size={16} />
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">
                          <Phone size={16} />
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="hotel">
                          <Hotel size={16} />
                          Hotel/Empresa *
                        </label>
                        <input
                          type="text"
                          id="hotel"
                          name="hotel"
                          value={formData.hotel}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="position">
                          <Building size={16} />
                          Cargo/Posición
                        </label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="form-input"
                          placeholder="Ej: Gerente, Recepcionista, etc."
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="preferredDate">
                          <Calendar size={16} />
                          Fecha preferida
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">
                        Mensaje adicional
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isLoading}
                        rows={4}
                        className="form-textarea"
                        placeholder={isPricingMode 
                          ? "Cuéntanos más sobre tu alojamiento y qué plan te interesa..."
                          : "Cuéntanos más sobre tu alojamiento y qué te interesa conocer de AlojaSys..."
                        }
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary form-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          Enviando solicitud...
                        </>
                      ) : (
                        <>
                          <Mail size={20} />
                          {submitButtonText}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="modal-scroll-container"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                key="whatsapp"
              >
                <div className="modal-whatsapp">
                  <motion.div 
                    className="form-header"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <motion.button 
                      className="back-button"
                      onClick={() => setSelectedOption(null)}
                      whileHover={{ x: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Volver
                    </motion.button>
                    <h2 className="form-title">{whatsappFormTitle}</h2>
                  </motion.div>

                  <motion.div 
                    className="whatsapp-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <motion.div 
                      className="whatsapp-header"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <Whasapp size={64} className="whatsapp-icon" />
                      </motion.div>
                      <h3 style={{color: '#25D366', margin: '10px 0', fontSize: '24px', fontWeight: '600'}}>
                        Chatea con nosotros
                      </h3>
                      <p className="whatsapp-text">
                        Te redirigiremos a WhatsApp para que puedas chatear directamente con nuestro equipo de AlojaSys.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="whatsapp-form"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <h4 style={{color: '#0A304A', marginBottom: '15px', fontSize: '16px'}}>
                        Completa tus datos (opcional):
                      </h4>
                      
                      <div className="form-group">
                        <label htmlFor="whatsapp-name">
                          <User size={16} />
                          Tu nombre
                        </label>
                        <input
                          type="text"
                          id="whatsapp-name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="form-input"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="whatsapp-hotel">
                          <Hotel size={16} />
                          Hotel/Empresa
                        </label>
                        <input
                          type="text"
                          id="whatsapp-hotel"
                          value={formData.hotel}
                          onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                          className="form-input"
                          placeholder="Nombre de tu alojamiento o empresa"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="whatsapp-position">
                          <Building size={16} />
                          Cargo/Posición
                        </label>
                        <input
                          type="text"
                          id="whatsapp-position"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                          className="form-input"
                          placeholder="Ej: Gerente, Recepcionista, etc."
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="whatsapp-phone">
                          <Phone size={16} />
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="whatsapp-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="form-input"
                          placeholder="Tu número de teléfono"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="whatsapp-date">
                          <Calendar size={16} />
                          Fecha preferida
                        </label>
                        <input
                          type="date"
                          id="whatsapp-date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="whatsapp-message">
                          Mensaje adicional
                        </label>
                        <textarea
                          id="whatsapp-message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="form-textarea"
                          rows={3}
                          placeholder={isPricingMode 
                            ? "Cuéntanos más sobre tu alojamiento y qué plan te interesa..."
                            : "Cuéntanos más sobre tu alojamiento y qué te interesa conocer de AlojaSys..."
                          }
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="whatsapp-cta"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <motion.button 
                        onClick={handleWhatsAppClick}
                        className="btn btn-whatsapp"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -3,
                          boxShadow: "0 15px 35px rgba(37, 211, 102, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Whasapp size={20} />
                        Abrir WhatsApp
                      </motion.button>
                      <p style={{color: '#6b7280', fontSize: '12px', margin: '10px 0 0 0'}}>
                        Se abrirá WhatsApp con un mensaje predefinido que incluye tus datos
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DemoModal