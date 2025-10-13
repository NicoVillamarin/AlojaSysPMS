import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoBackgroundProps {
  videos: string[]
  className?: string
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videos, className = '' }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Cambiar video automáticamente cada 20 segundos
  useEffect(() => {
    if (videos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 20000) // 20 segundos

    return () => clearInterval(interval)
  }, [videos.length])

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1 }
    }
  }

  if (videos.length === 0) {
    return (
      <div className={`video-background ${className}`}>
        <div className="video-overlay" />
      </div>
    )
  }

  return (
    <div className={`video-background ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          className="video-container"
          variants={videoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <video
            className="background-video"
            muted
            loop
            playsInline
            preload="auto"
            autoPlay
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          
          <div className="video-overlay" />
        </motion.div>
      </AnimatePresence>
      
      <div className="video-indicators">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoBackground
