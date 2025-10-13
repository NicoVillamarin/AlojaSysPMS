import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxElementProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  children, 
  className = '', 
  speed = 0.5 
}) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div 
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxElement
