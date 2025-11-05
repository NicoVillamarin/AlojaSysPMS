// Configuración de EmailJS
// Reemplaza estos valores con los tuyos de EmailJS

export const EMAILJS_CONFIG = {
  // Tu Service ID de EmailJS
  SERVICE_ID: 'service_inrl53p',
  
  // Template ID para contacto general
  TEMPLATE_ID: 'template_bcn739s',
  
  // Template ID para solicitudes de demo
  DEMO_TEMPLATE_ID: 'template_r8gld09',
  
  // Tu Public Key de EmailJS
  PUBLIC_KEY: 'q4D0A1CJaZ9Z35WBs',
  
  // Email de destino
  TO_EMAIL: 'admin@alojasys.com',
  
  // Número de WhatsApp (formato internacional sin +)
  WHATSAPP_NUMBER: '542236976929'
}

// Template de email que se enviará
export const EMAIL_TEMPLATE = {
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  message: '{{message}}',
  to_email: '{{to_email}}'
}
