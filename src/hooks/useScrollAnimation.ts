import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseScrollAnimationOptions {
  once?: boolean // Si es true, solo anima una vez. Si es false, se revierte al salir del viewport
  margin?: string // Margen para activar la animación antes/después de entrar al viewport
  amount?: number // Porcentaje del elemento que debe estar visible (0-1)
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { once = false, margin = "-100px", amount = 0.3 } = options
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, // Si es false, la animación se revierte al salir del viewport
    margin,
    amount // Porcentaje del elemento visible para activar
  })

  return { ref, isInView }
}
