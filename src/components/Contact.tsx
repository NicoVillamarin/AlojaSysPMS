import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    alert('¡Mensaje enviado correctamente!')
    setFormData({ name: '', email: '', message: '' })
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
                  <p>info@alojasys.com</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={24} className="contact-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+54 11 1234-5678</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={24} className="contact-icon" />
                <div>
                  <h4>Dirección</h4>
                  <p>Av. Corrientes 1234, Buenos Aires, Argentina</p>
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
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
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
                rows={5}
                className="form-textarea"
              />
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              Enviar mensaje
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

