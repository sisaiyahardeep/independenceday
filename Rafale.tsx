import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Rafale() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // Trigger animation periodically
    const interval = setInterval(() => {
      setTrigger((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" key={trigger}>
      <motion.div
        initial={{ x: '-50vw', y: '20vh', scale: 0.5, rotate: 15 }}
        animate={{ x: '150vw', y: '-20vh', scale: 1.2, rotate: 15 }}
        transition={{ duration: 4, ease: 'easeIn', delay: 1 }}
        className="absolute flex items-center justify-center opacity-90 drop-shadow-2xl"
      >
        <div className="relative">
          <img src="./rafale.png" alt="Rafale" className="w-48 md:w-72 object-contain filter drop-shadow-xl blur-[0.5px]" />
          
          {/* Smoke trails */}
          <div className="absolute right-[90%] top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-60">
            <div className="h-2 md:h-3 w-64 md:w-96 bg-gradient-to-r from-transparent to-[#FF9933] rounded-full blur-sm" />
            <div className="h-2 md:h-3 w-64 md:w-96 bg-gradient-to-r from-transparent to-[#FFFFFF] rounded-full blur-sm" />
            <div className="h-2 md:h-3 w-64 md:w-96 bg-gradient-to-r from-transparent to-[#138808] rounded-full blur-sm" />
          </div>
        </div>
      </motion.div>

      {/* Second Jet slightly delayed */}
      <motion.div
        initial={{ x: '-50vw', y: '30vh', scale: 0.4, rotate: 15 }}
        animate={{ x: '150vw', y: '-10vh', scale: 1, rotate: 15 }}
        transition={{ duration: 4.5, ease: 'easeIn', delay: 1.5 }}
        className="absolute flex items-center justify-center opacity-80 drop-shadow-2xl"
      >
        <div className="relative">
          <img src="./rafale.png" alt="Rafale" className="w-40 md:w-60 object-contain filter drop-shadow-xl blur-[1px]" />
          
          {/* Smoke trails */}
          <div className="absolute right-[90%] top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-50">
            <div className="h-1.5 md:h-2 w-48 md:w-72 bg-gradient-to-r from-transparent to-[#FF9933] rounded-full blur-sm" />
            <div className="h-1.5 md:h-2 w-48 md:w-72 bg-gradient-to-r from-transparent to-[#FFFFFF] rounded-full blur-sm" />
            <div className="h-1.5 md:h-2 w-48 md:w-72 bg-gradient-to-r from-transparent to-[#138808] rounded-full blur-sm" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
