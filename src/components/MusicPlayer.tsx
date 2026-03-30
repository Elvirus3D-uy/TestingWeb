import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPinDialog from "./AdminPinDialog";
import AdminMusicForm from "./AdminMusicForm";

const playlist = [
  { id: 1, title: "No estás solo", url: "/Recursos/cancion1.mp3" },
  { id: 2, title: "Final de asado", url: "/Recursos/cancion2.mp3" },
  { id: 3, title: "Latinoamérica en llamas", url: "/Recursos/cancion3.mp3" },
  { id: 4, title: "Uruguayez al mango", url: "/Recursos/cancion4.mp3" },
  { id: 5, title: "Interminable 10", url: "/Recursos/Cancion5.mp3" },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  
  // Admin logic
  const [showPin, setShowPin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const clickTimestamps = useRef<number[]>([]);
  const CLICKS_REQUIRED = 5;
  const CLICK_WINDOW_MS = 3000;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Shuffle playlist indices
  const shuffle = useCallback(() => {
    const indices = Array.from({ length: playlist.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setCurrentTrackIndex(0);
  }, []);

  useEffect(() => {
    shuffle();
  }, [shuffle]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = useCallback(() => {
    if (shuffledIndices.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % shuffledIndices.length;
    setCurrentTrackIndex(nextIdx);
    
    // Play next track immediately if it was already playing
    if (audioRef.current && isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error("Error playing next track:", e));
      }, 100);
    }
  }, [currentTrackIndex, shuffledIndices, isPlaying]);

  const handleIconClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < CLICK_WINDOW_MS
    );
    if (clickTimestamps.current.length >= CLICKS_REQUIRED) {
      clickTimestamps.current = [];
      setShowPin(true);
    }
    
    // Toggle controls
    setShowControls(!showControls);
  }, [showControls]);

  const currentTrack = playlist[shuffledIndices[currentTrackIndex]] || playlist[0];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-card/95 backdrop-blur-md border border-border p-3 md:p-4 rounded-2xl shadow-2xl w-56 md:w-64"
          >
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                  <Music className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[8px] md:text-[10px] text-primary font-display font-bold tracking-widest uppercase">Reproduciendo</p>
                  <p className="text-xs md:text-sm font-semibold truncate text-foreground leading-tight">{currentTrack.title}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7 md:h-8 md:w-8 rounded-full" onClick={togglePlay}>
                    {isPlaying ? <Pause className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Play className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 md:h-8 md:w-8 rounded-full" onClick={nextTrack}>
                    <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 flex-1 ml-2 md:ml-4">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted || volume === 0 ? <VolumeX className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" /> : <Volume2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={isMuted ? 0 : volume} 
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          onClick={handleIconClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative group h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 ${
            isPlaying 
              ? "bg-primary border-primary/50 text-white animate-glow-pulse" 
              : "bg-card border-border text-foreground hover:border-primary/50"
          }`}
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Music className={`${isPlaying ? "drop-shadow-sm" : "text-muted-foreground group-hover:text-primary"} w-5 h-5 md:w-6 md:h-6`} />
          </motion.div>
          
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 md:h-4 md:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-primary border-2 border-white/20"></span>
            </span>
          )}
        </motion.button>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
        className="hidden"
      />

      <AdminPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onSuccess={() => setShowForm(true)}
      />

      <AdminMusicForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
};

export default MusicPlayer;
