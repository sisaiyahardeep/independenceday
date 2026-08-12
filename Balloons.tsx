import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const colors = ['#FF9933', '#FFFFFF', '#138808'];

export default function Balloons() {
  const [balloons, setBalloons] = useState<
    { id: number; left: number; delay: number; duration: number; color: string; scale: number }[]
  >([]);

  useEffect(() => {
    // Generate initial balloons
    const initialBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: 0.6 + Math.random() * 0.4,
    }));
    setBalloons(initialBalloons);

    // Slowly add new balloons to keep it continuous
    const interval = setInterval(() => {
      setBalloons((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map(b => b.id)) + 1 : 1;
        return [
          ...prev.slice(-20), // keep max balloons on screen roughly
          {
            id: nextId,
            left: Math.random() * 100,
            delay: 0,
            duration: 10 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            scale: 0.6 + Math.random() * 0.4,
          }
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', x: 0 }}
          animate={{
            y: '-20vh',
            x: Math.sin(b.id) * 50, // subtle horizontal drift
          }}
          transition={{
            y: { duration: b.duration, repeat: Infinity, ease: 'linear', delay: b.delay },
            x: { duration: b.duration / 2, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' },
          }}
          className="absolute flex flex-col items-center"
          style={{ left: `${b.left}%`, transform: `scale(${b.scale})` }}
        >
          {/* Balloon shape */}
          <div
            className="h-16 w-12 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-inner relative before:content-[''] before:absolute before:w-1.5 before:h-2 before:bottom-[-2px] before:left-1/2 before:-translate-x-1/2 before:rounded-sm"
            style={{ 
              backgroundColor: b.color,
              boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 10px rgba(255,255,255,0.4)`
            }}
          >
            {/* Balloon knot */}
            <div 
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-sm clip-path-polygon-[50%_0,0_100%,100%_100%]"
              style={{ backgroundColor: b.color }}
            />
          </div>
          {/* String */}
          <div className="h-16 w-[1px] bg-white/30 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
