import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      // Parámetros del email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      }

      // Enviar email
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID, 
        EMAILJS_CONFIG.TEMPLATE_ID, 
        templateParams, 
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
      
    } catch (error) {
      console.error('Error al enviar el email:', error)
      setSubmitStatus('error')
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Contáctanos</h2>
          <p className="contact-subtitle">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Información de contacto</h3>
            <div className="contact-items">
              <div className="contact-item">
                <Mail size={24} className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>villamarin.nico@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={24} className="contact-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+54 223 697 6929</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={24} className="contact-icon" />
                <div>
                  <h4>Dirección</h4>
                  <p>Roque Saenz Peña 160, Mar del Plata, Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
            
            <div className="contact-cta">
              <h4>Solicita tu demo gratuita</h4>
              <p>Descubre cómo AlojaSys puede transformar la gestión de tu hotel. 
                 Agenda una demostración personalizada sin compromiso.</p>
              <button className="btn btn-primary">
                Solicitar Demo
                <Send size={20} />
              </button>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Envíanos un mensaje</h3>
            
            {/* Mensaje de éxito */}
            {submitStatus === 'success' && (
              <div className="form-message form-message-success">
                <CheckCircle size={20} />
                <span>¡Mensaje enviado correctamente! Te responderemos pronto.</span>
              </div>
            )}
            
            {/* Mensaje de error */}
            {submitStatus === 'error' && (
              <div className="form-message form-message-error">
                <AlertCircle size={20} />
                <span>Error al enviar el mensaje. Por favor, inténtalo de nuevo.</span>
              </div>
            )}
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tu mensaje"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows={5}
                className="form-textarea"
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
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

