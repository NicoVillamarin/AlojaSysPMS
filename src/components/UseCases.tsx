import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Hotel, CalendarDays } from 'lucide-react'

const UseCases: React.FC = () => {
  const cases = [
    {
      icon: <Hotel size={28} />,
      title: 'Hotel Boutique (20 habitaciones)',
      highlights: [
        '50% adelanto + 50% al check‑in',
        'Promos de fin de semana',
        'Cancelación gratuita 24h'
      ],
      benefit: 'Gestión simple, pagos automatizados y control de ocupación en tiempo real.'
    },
    {
      icon: <Building2 size={28} />,
      title: 'Cadena de Alojamientos (5 propiedades)',
      highlights: [
        'Configuraciones estándar por alojamiento',
        'Personal compartido multi‑alojamiento',
        'Reportes consolidados del grupo'
      ],
      benefit: 'Gestión centralizada con métricas comparativas entre propiedades.'
    },
    {
      icon: <CalendarDays size={28} />,
      title: 'Hotel de Temporada',
      highlights: [
        'Precios dinámicos por temporada',
        'Códigos promo para baja',
        'Restricciones CTA/CTD'
      ],
      benefit: 'Maximiza ingresos adaptando tarifas y reglas según la demanda.'
    }
  ]

  return (
    <section id="casos" className="use-cases">
      <div className="use-cases-container">
        <motion.div 
          className="use-cases-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="use-cases-title">Casos de Uso Reales</h2>
          <p className="use-cases-subtitle">Cómo hoteles, hostels y alojamientos usan AlojaSys día a día</p>
        </motion.div>

        <motion.div 
          className="use-cases-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
          }}
        >
          {cases.map((c, index) => (
            <motion.div
              key={index}
              className="use-case-card"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <div className="use-case-header">
                <div className="use-case-icon">{c.icon}</div>
                <div className="use-case-title">{c.title}</div>
              </div>
              <ul className="use-case-list">
                {c.highlights.map((h, i) => (
                  <li key={i} className="use-case-item">✓ {h}</li>
                ))}
              </ul>
              <div className="use-case-benefit">{c.benefit}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default UseCases


