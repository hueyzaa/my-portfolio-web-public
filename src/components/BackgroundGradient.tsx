import React from 'react';
import { motion } from 'framer-motion';

const BackgroundGradient: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#000000',
    }}>
      {/* Smoky Background Blobs */}
      <motion.div 
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          rotate: [0, 45, -45, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }} 
      />
      
      <motion.div 
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -50, 0],
          rotate: [0, -45, 45, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }} 
      />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }} />
    </div>
  );
};

export default BackgroundGradient;

