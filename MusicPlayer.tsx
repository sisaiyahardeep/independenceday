import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const songs = ['./song1.mp3', './song2.mp3', './song3.mp3', './song4.mp3', './song5.mp3'];

export default function MusicPlayer({ interacted }: { interacted: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    // Select random song on mount
    setSongIndex(Math.floor(Math.random() * songs.length));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAudio = async () => {
      try {
        const response = await fetch(songs[songIndex], { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        
        // Only initialize Audio if the file exists and is not an HTML fallback
        if (response.ok && contentType && !contentType.includes('text/html')) {
          if (!audioRef.current && isMounted) {
            audioRef.current = new Audio(songs[songIndex]);
            audioRef.current.loop = true;
            
            if (interacted && !isPlaying) {
              audioRef.current.play().then(() => {
                if (isMounted) setIsPlaying(true);
              }).catch(() => {
                // Autoplay blocked or failed
              });
            }
          }
        } else {
          console.warn(`Audio file ${songs[songIndex]} not found. Please upload it to the public directory.`);
        }
      } catch (err) {
        console.warn('Could not verify audio file.');
      }
    };

    if (!audioRef.current) {
      initAudio();
    } else if (interacted && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    
    return () => { isMounted = false; };
  }, [interacted, songIndex, isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
