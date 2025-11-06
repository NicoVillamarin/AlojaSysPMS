import { useInView, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

export type RevealOrigin = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type RevealType = 'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'

interface UseScrollRevealOptions {
  origin?: RevealOrigin // Desde dónde viene la animación
  distance?: string // Distancia de la animación (ej: '50px', '100%')
  duration?: number // Duración en segundos
  delay?: number // Delay en segundos
  type?: RevealType // Tipo de animación
  once?: boolean // Si solo anima una vez
  threshold?: number // Porcentaje del elemento visible para activar (0-1)
  reset?: boolean // Si se resetea al salir del viewport
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    origin = 'bottom',
    distance = '50px',
    duration = 0.6,
    delay = 0,
    type = 'fade',
    once = false,
    threshold = 0.1,
    reset = true
  } = options

  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once,
    amount: threshold,
    margin: '-50px'
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once && reset) {
      controls.start('hidden')
    }
  }, [isInView, controls, once, reset])

  // Calcular transformaciones según el origen
  const getTransform = () => {
    const distanceValue = distance.includes('%') 
      ? parseFloat(distance) / 100 
      : parseFloat(distance.replace('px', ''))
    
    switch (origin) {
      case 'top':
        return { y: type === 'slide' ? `-${distance}` : 0, x: 0 }
      case 'bottom':
        return { y: type === 'slide' ? distance : 0, x: 0 }
      case 'left':
        return { x: type === 'slide' ? `-${distance}` : 0, y: 0 }
      case 'right':
        return { x: type === 'slide' ? distance : 0, y: 0 }
      case 'center':
        return { x: 0, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const getInitialState = () => {
    const transform = getTransform()
    
    switch (type) {
      case 'fade':
        return { 
          opacity: 0, 
          ...transform 
        }
      case 'slide':
        return { 
          opacity: 0, 
          ...transform 
        }
      case 'zoom':
        return { 
          opacity: 0, 
          scale: 0.8,
          ...transform 
        }
      case 'rotate':
        return { 
          opacity: 0, 
          rotate: -10,
          ...transform 
        }
      case 'flip':
        return { 
          opacity: 0, 
          rotateX: origin === 'top' || origin === 'bottom' ? -90 : 0,
          rotateY: origin === 'left' || origin === 'right' ? -90 : 0,
          ...transform 
        }
      default:
        return { opacity: 0, ...transform }
    }
  }

  const variants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Easing suave y moderno
      }
    }
  }

  return {
    ref,
    variants,
    initial: 'hidden',
    animate: controls
  }
}

