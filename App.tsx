/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Balloons from './components/Balloons';
import MusicPlayer from './components/MusicPlayer';
import Rafale from './components/Rafale';
import WavingFlag from './components/WavingFlag';

const messages = [
  "🇮🇳 उन वीर शहीदों को नमन, जिनकी कुर्बानी से आज हम आज़ाद हैं। आपको स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ।",
  "🇮🇳 तिरंगे की शान हमेशा ऊँची रहे और भारत का नाम दुनिया में रोशन रहे। स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ।",
  "🇮🇳 मिट्टी की खुशबू, तिरंगे की शान और देश के वीरों की कुर्बानी को सलाम। आपको स्वतंत्रता दिवस की शुभकामनाएँ।",
  "🇮🇳 आज़ादी सिर्फ एक दिन का जश्न नहीं, बल्कि उन वीरों की याद है जिन्होंने देश के लिए अपना जीवन न्योछावर कर दिया।",
  "🇮🇳 भारत माता के वीर सपूतों को नमन। आपको और आपके परिवार को स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ।"
];

export default function App() {
  const [name, setName] = useState('');
  const [generatedCard, setGeneratedCard] = useState<{ name: string; message: string } | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [receivedName, setReceivedName] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get('n');
    const m = params.get('m');
    
    if (n && m) {
      // Decode and sanitize basic HTML
      const decodeHtmlEntities = (str: string) => {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
      setReceivedName(decodeHtmlEntities(n));
      setReceivedMessage(decodeHtmlEntities(m));
    }
  }, []);

  const handleGenerate = () => {
    if (!name.trim()) return;
    setInteracted(true);
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setGeneratedCard({ name: name.trim(), message: randomMsg });
    
    // Trigger confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleShare = () => {
    if (!generatedCard) return;
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('n', generatedCard.name);
    shareUrl.searchParams.set('m', generatedCard.message);
    
    const whatsappMsg = `${generatedCard.name} की तरफ से आपके लिए स्वतंत्रता दिवस की शुभकामनाएँ\n\n${generatedCard.message}\n\nयहां देखें: ${shareUrl.toString()}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };

  const currentDisplay = generatedCard || (receivedName ? { name: receivedName, message: receivedMessage } : null);

  return (
    <div 
      className="relative min-h-screen w-full bg-[#0a0f1c] text-white font-sans overflow-x-hidden"
      onClick={() => setInteracted(true)}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9933]/10 via-transparent to-[#138808]/10 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF9933]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#138808]/15 blur-[120px] pointer-events-none" />

      <Balloons />
      <Rafale />
      <MusicPlayer interacted={interacted} />

      <main className="relative z-20 flex flex-col items-center min-h-screen pb-24 max-w-lg mx-auto w-full px-4 sm:px-6">
        
        {/* Ad Space Top (Reserved, kept clean) */}
        <div className="w-full h-8 mt-2" />

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-4 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,153,51,0.15)] ring-1 ring-white/10"
        >
          <div className="aspect-[4/3] w-full relative">
            <img 
              src="./banner.webp" 
              alt="Independence Day Hero" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image not found
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/20 to-transparent" />
            
            {/* Waving flags */}
            <div className="absolute top-4 left-4 z-10">
              <WavingFlag className="text-5xl" />
            </div>
            <div className="absolute top-4 right-4 z-10 transform scale-x-[-1]">
              <WavingFlag className="text-5xl" />
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                <span className="text-[#FF9933]">Happy </span>
                <span className="text-white">Independence </span>
                <span className="text-[#138808]">Day</span>
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Display Card (Received or Generated) */}
        {currentDisplay && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full mt-8 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-2xl blur opacity-30 animate-pulse" />
            <div className="relative w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 p-6 sm:p-8 text-center shadow-2xl overflow-hidden">
              {/* Flag watermark */}
              <div className="absolute top-[-20px] right-[-20px] text-8xl opacity-10 rotate-12 select-none">
                🇮🇳
              </div>
              
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl font-bold mb-6 text-white/90"
              >
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">🇮🇳</span>
                  <span><span className="text-[#FF9933] drop-shadow-md font-black">{currentDisplay.name}</span> की तरफ से आपके लिए</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-transparent bg-clip-text drop-shadow-sm">
                    स्वतंत्रता दिवस की शुभकामनाएँ
                  </div>
                  <span className="text-2xl drop-shadow-md">🇮🇳</span>
                </div>
              </motion.h2>

              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl font-medium leading-relaxed text-white drop-shadow-md mb-8"
              >
                {currentDisplay.message}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-right text-[#138808] font-bold text-lg"
              >
                — {currentDisplay.name}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Interaction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-8 flex flex-col gap-4"
        >
          {generatedCard ? (
            <button
              onClick={handleShare}
              className="group relative w-full overflow-hidden rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center justify-center gap-3 text-lg">
                <Share2 className="w-6 h-6" />
                WhatsApp पर शेयर करें
              </div>
            </button>
          ) : (
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अपना नाम लिखें..."
                  maxLength={40}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all text-lg text-center"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={!name.trim()}
                className="relative overflow-hidden w-full rounded-xl bg-gradient-to-r from-[#FF9933] via-[#FFB366] to-[#FF9933] px-6 py-4 font-bold text-black shadow-[0_0_20px_rgba(255,153,51,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2 text-lg">
                  <span className="text-xl">🇮🇳</span>
                  शुभकामना बनाएं
                </div>
              </button>
            </div>
          )}
        </motion.div>

        {/* Ad Space Bottom */}
        <div className="w-full mt-12 mb-8 flex justify-center">
          <div className="w-[300px] h-[250px] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/30 text-sm backdrop-blur-sm">
            Advertisement Space
          </div>
        </div>
      </main>
    </div>
  );
}

