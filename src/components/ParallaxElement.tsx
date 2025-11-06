import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion'

interface ParallaxElementProps {
  children: React.ReactNode
  className?: string
  speed?: number // Velocidad del parallax (0.1 = muy lento, 1.0 = normal, 2.0 = rápido)
  direction?: 'up' | 'down' | 'left' | 'right' // Dirección del movimiento
}

/**
 * Componente Parallax - Crea efecto de profundidad moviendo elementos a diferentes velocidades
 * según el scroll de la página
 */
const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'down'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  
  // Usar el scroll de la página completa
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Desde que entra al viewport hasta que sale
  })

  // Calcular transformación según dirección y velocidad
  const multiplier = 150 // Valor para movimiento visible
  
  // Crear motion values para el parallax
  const parallaxY = useMotionValue(0)
  const parallaxX = useMotionValue(0)
  
  // Actualizar valores según scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const movement = (progress - 0.5) * speed * multiplier
      
      switch (direction) {
        case 'up':
          parallaxY.set(-movement)
          break
        case 'down':
          parallaxY.set(movement)
          break
        case 'left':
          parallaxX.set(-movement)
          break
        case 'right':
          parallaxX.set(movement)
          break
      }
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, speed, direction, multiplier, parallaxY, parallaxX])

  // Usar spring para movimiento suave
  const smoothY = useSpring(parallaxY, { stiffness: 50, damping: 20 })
  const smoothX = useSpring(parallaxX, { stiffness: 50, damping: 20 })

  return (
    <div 
      ref={ref} 
      className={className}
    >
      <motion.div
        style={{ 
          y: smoothY, 
          x: smoothX,
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxElement
