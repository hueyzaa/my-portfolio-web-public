import React from 'react';
import { motion } from 'framer-motion';

const LogoCloud: React.FC = () => {
  const logos = [
    { name: 'Cooks', icon: '©' },
    { name: 'Opal', icon: '○' },
    { name: 'Dune', icon: '◑' },
    { name: 'Oasis', icon: '✴' },
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4rem',
      marginTop: '4rem',
      opacity: 0.6,
    }}>
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ fontSize: '1.25rem', opacity: 0.8 }}>{logo.icon}</span>
          <span>{logo.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default LogoCloud;
