import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="principal" className="relative overflow-hidden min-h-auto md:min-h-[calc(100vh-64px)] flex items-start md:items-center py-10 md:py-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-start md:justify-center text-center">
        {/* Blurred glow behind logo */}
        <motion.div
          className="absolute top-[5%] md:top-[10%] left-1/2 -translate-x-1/2 w-[280px] md:w-[900px] h-[180px] md:h-[350px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2 }}
        >
          <img
            src="/imagenes/virus3d-logo-principal.png"
            alt=""
            className="w-full h-auto blur-[40px] md:blur-[80px] opacity-60"
          />
        </motion.div>

        {/* Logo — top half */}
        <motion.img
          src="/imagenes/virus3d-logo-principal.png"
          alt="El Virus 3D Logo"
          className="relative z-10 h-auto w-[92%] max-w-[340px] md:max-w-[580px] mb-6 md:mb-8 mt-4 md:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Text content — bottom half */}
        <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 max-w-2xl mx-auto">
          <motion.p
            className="text-xs md:text-xl text-secondary font-display font-bold tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            INDIE GAME STUDIO
          </motion.p>

          <motion.p
            className="text-[13px] md:text-base text-muted-foreground leading-relaxed px-4 md:px-0 opacity-90 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            El Virus 3D es un espacio donde convergen videojuegos, creatividad y tecnología desde Uruguay hacia el mundo.
          </motion.p>

          <motion.div
            className="flex flex-row items-center justify-center gap-3 mt-4 md:mt-6 w-full px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="#noticias" className="flex-1 max-w-[180px] md:max-w-none text-center px-4 md:px-8 py-3.5 md:py-5 rounded-xl bg-primary text-primary-foreground font-display text-[11px] md:text-sm font-bold tracking-widest hover:bg-primary/90 transition-all hover:scale-105 glow-box">
              VER NOTICIAS
            </a>
            <a href="#juegos" className="flex-1 max-w-[180px] md:max-w-none text-center px-4 md:px-8 py-3.5 md:py-5 rounded-xl border-2 border-primary/30 text-primary font-display text-[11px] md:text-sm font-bold tracking-widest hover:bg-primary/10 transition-all hover:scale-105 backdrop-blur-sm">
              JUEGOS
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
