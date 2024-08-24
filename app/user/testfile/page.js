"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [boxVisible, setBoxVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = event.clientX;
    const y = event.clientY;

    setMousePosition({ x, y });

    // Check if the mouse is within 100px of the center
    if (Math.abs(x - centerX) <= 150 && Math.abs(y - centerY) <= 150) {
      setBoxVisible(false); // Hide the box
    } else {
      setBoxVisible(true); // Show the box
    }
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <AnimatePresence>
        {boxVisible && (
          <motion.div
            style={{
              position: 'absolute',
              top: mousePosition.y - 25,
              left: mousePosition.x - 25,
              width: 100,
              height: 100,
              backgroundColor: 'blue',
              borderRadius: "50%",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ color: 'white' }}>
              hello
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
