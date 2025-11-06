import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { RevealOrigin, RevealType } from '../hooks/useScrollReveal'

interface ScrollRevealProps {
  children: React.ReactNode
  origin?: RevealOrigin
  distance?: string
  duration?: number
  delay?: number
  type?: RevealType
  once?: boolean
  threshold?: number
  reset?: boolean
  className?: string
  stagger?: number // Delay entre elementos hijos (para listas)
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  origin = 'bottom',
  distance = '50px',
  duration = 0.6,
  delay = 0,
  type = 'fade',
  once = false,
  threshold = 0.1,
  reset = true,
  className = '',
  stagger = 0
}) => {
  const { ref, variants, initial, animate } = useScrollReveal({
    origin,
    distance,
    duration,
    delay,
    type,
    once,
    threshold,
    reset
  })

  // Si tiene stagger, crear variants con staggerChildren
  const containerVariants = stagger > 0 ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  } : undefined

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={stagger > 0 ? 'hidden' : initial}
      animate={stagger > 0 ? 'visible' : animate}
      variants={stagger > 0 ? containerVariants : variants}
    >
      {stagger > 0 ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={variants}
            initial={initial}
            animate={animate}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  )
}

export default ScrollReveal

