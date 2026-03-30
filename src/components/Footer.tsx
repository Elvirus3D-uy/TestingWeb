import { Instagram, Mail, Globe, Heart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import PaypalDonate from "./PaypalDonate";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-16 pb-8 overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.a 
              href="#principal"
              className="mb-6 block group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/imagenes/virus3d-logo-principal.png"
                alt="El Virus 3D"
                className="h-24 md:h-32 w-auto mx-auto lg:mx-0 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
              />
            </motion.a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Estudio de desarrollo de videojuegos indie con sede en Uruguay. 
              Creamos experiencias interactivas que combinan creatividad uruguaya con tecnología de vanguardia.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="https://www.instagram.com/el.virus_3d/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="mailto:markplay06061990@gmail.com" className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Explorar</h3>
            <ul className="space-y-4">
              <li><a href="#principal" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#juegos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Juegos</a></li>
              <li><a href="#eventos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Eventos</a></li>
              <li><a href="#contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Proyectos</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Proyecto Infernal</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Virus Fútbol 3D</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Caperuza Escarlata</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Comunidad</h3>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Tu apoyo nos ayuda a seguir creando. Compartí nuestro contenido o considera hacernos una donación.
            </p>
            <PaypalDonate 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 rounded-lg text-secondary text-xs font-bold transition-all hover:scale-105"
            >
              <Heart size={14} fill="currentColor" />
              Donar por PayPal
            </PaypalDonate>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} El Virus 3D. Uruguay.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 grayscale opacity-60">
              <ShieldCheck size={14} /> 
              Indie Power
            </span>
            <a 
              href="https://www.instagram.com/sixnine.systems/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] opacity-40 hover:opacity-100 hover:text-primary transition-all flex items-center gap-1"
            >
              Diseñado por <span className="font-bold underline decoration-primary/30 underline-offset-2">SixNine Systems</span> 💜
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
