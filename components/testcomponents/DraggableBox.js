"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const DraggableBox = () => {
  const [boxVisible, setBoxVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    console.log("Mouse Move:", event.clientX, event.clientY); // Debugging log
    setMousePosition({ x: event.clientX, y: event.clientY });
    if (event.clientX < window.innerWidth / 3 || event.clientX > (2 * window.innerWidth) / 3) {
      setBoxVisible(true);
    } else {
      setBoxVisible(false);
    }
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh', position: 'relative', backgroundColor: '#f0f0f0' }}>
      {boxVisible && (
        <motion.div
          style={{
            position: 'absolute',
            top: mousePosition.y - 25,
            left: mousePosition.x - 25,
            width: 50,
            height: 50,
            backgroundColor: 'red',
            borderRadius: 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default DraggableBox;
