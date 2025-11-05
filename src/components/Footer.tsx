import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-text">
                <span className="footer-logo-aloja">Aloja</span><span className="footer-logo-sys">Sys</span>
              </div>
              <div className="footer-tagline">Web Hotel Management</div>
            </div>
            <p className="footer-description">
              Sistema de gestión hotelera completo que permite administrar todos los aspectos 
              de un hotel de manera digital y eficiente.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/alojasys/" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Enlaces rápidos</h4>
            <ul className="footer-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#caracteristicas">Características</a></li>
              <li><a href="#modulos">Módulos</a></li>
              <li><a href="#acerca">Acerca de</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Módulos</h4>
            <ul className="footer-links">
              <li><a href="#modulos">Gestión de Hoteles</a></li>
              <li><a href="#modulos">Gestión de Habitaciones</a></li>
              <li><a href="#modulos">Calendario de Reservas</a></li>
              <li><a href="#modulos">Sistema de Pagos</a></li>
              <li><a href="#modulos">Dashboard y Reportes</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contacto</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>admin@alojasys.com</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+54 223 697 6929</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Roque Saenz Peña 1620</span>
              </div>
              <div className="footer-contact-item">
              <span>Mar del Plata, Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} AlojaSys. Todos los derechos reservados.
          </p>
          <div className="footer-legal">
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

