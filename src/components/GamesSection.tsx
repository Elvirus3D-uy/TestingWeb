import { motion } from "framer-motion";
import { Gamepad2, ExternalLink } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AdminPinDialog from "./AdminPinDialog";
import AdminGameForm from "./AdminGameForm";

const games = [
  {
    title: "Proyecto Infernal",
    image: "/Recursos/ProyectoInfernal1.webp",
    description: "Título publicado en Steam. Un juego de acción y supervivencia desarrollado por El Virus 3D.",
    status: "Publicado",
    link: "https://store.steampowered.com/app/2999690/Proyecto_infernal/",
    platform: "Steam",
  },
  {
    title: "Virus Fútbol Web",
    image: "/Recursos/VirusFutbolWeb.webp",
    description: "Demostración jugable de Virus Fútbol 3D adaptada para el navegador. Simulá una liga ficticia y llevá a tu club a la gloria deportiva.",
    status: "Jugable",
    link: "https://elvirus3d.itch.io/virus-futbol-web",
    platform: "itch.io",
  },
  {
    title: "El Secreto de Mi Abuela",
    image: "/Recursos/ElSecretoDeMiAbuela.webp",
    description: "Juego desarrollado en la Global Game Jam 2026 bajo la temática \"Máscaras\". Una experiencia narrativa y conceptual.",
    status: "Publicado",
    link: "https://oa.itch.io/el-secreto-de-mi-abuela",
    platform: "itch.io",
  },
  {
    title: "Virusmania",
    image: "/Recursos/Virusmania.webp",
    description: "Desarrollado en Unity, te pone en la piel de un virus en un nivel donde el objetivo es sobrevivir el mayor tiempo posible eliminando enemigos.",
    status: "Publicado",
    link: "https://elvirus3d.itch.io/virusmania",
    platform: "itch.io",
  },
  {
    title: "Virus Fútbol 3D",
    image: "/Recursos/VirusFutbol3D0.webp",
    description: "Simulación de la vida en el fútbol desde la perspectiva de un club de la tercera división latinoamericana. El jugador gestiona contratos, entrenamientos y tácticas, combinando mecánicas de Football Manager con gameplay interactivo.\n\nDesarrollo en curso con enfoque narrativo y progresión de equipo a largo plazo.",
    status: "En desarrollo",
    link: "#",
    platform: "PC",
  },
  {
    title: "Caperuza Escarlata",
    image: "/Recursos/Caperuza0.webp",
    description: "Parte de la colección: Cuentos Codificados. En un futuro postapocalíptico dominado por lobos androides, Caperuza Escarlata debe atravesar zonas hostiles para llegar al punto de control donde se esconde su abuela. Inspirado en el cuento clásico de Caperucita Roja, este juego de plataformas reimagina la historia en un mundo tecnológico decadente, lleno de peligros y secretos. Con un estilo de juego al mejor estilo Super Mario Bros, el jugador debe saltar, esquivar y avanzar en niveles desafiantes mientras descubre fragmentos narrativos que conectan el pasado con el presente.",
    status: "En desarrollo",
    link: "#",
    platform: "PC",
  },
];

const statusColors: Record<string, string> = {
  Publicado: "bg-green-500/20 text-green-400 border-green-500/30",
  Jugable: "bg-secondary/20 text-secondary border-secondary/30",
  "En desarrollo": "bg-primary/20 text-primary border-primary/30",
};

const CLICKS_REQUIRED = 5;
const CLICK_WINDOW_MS = 3000;

const GamesSection = () => {
  const clickTimestamps = useRef<number[]>([]);
  const [showPin, setShowPin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTitleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < CLICK_WINDOW_MS
    );
    if (clickTimestamps.current.length >= CLICKS_REQUIRED) {
      clickTimestamps.current = [];
      setShowPin(true);
    }
  }, []);

  return (
    <section id="juegos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2 select-none cursor-default" onClick={handleTitleClick}>
          <Gamepad2 className="w-7 h-7 text-primary" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground glow-text">
            JUEGOS
          </h2>
        </div>
        <p className="text-muted-foreground mb-10 text-sm">
          Desde títulos publicados en Steam hasta prototipos jugables en tu navegador.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <Dialog key={game.title}>
              <motion.div
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:glow-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <DialogTrigger className="w-full text-left h-full flex flex-col focus:outline-none">
                  <div className="relative overflow-hidden w-full">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-display font-semibold tracking-wider px-2.5 py-1 rounded-full border ${statusColors[game.status]}`}>
                        {game.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                        {game.link !== "#" ? (
                          <span className="hover:text-primary transition-colors">
                            {game.title}
                          </span>
                        ) : (
                          game.title
                        )}
                      </h3>
                      {game.link !== "#" && (
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 whitespace-pre-line line-clamp-3">
                      {game.description}
                    </p>
                    <div className="mt-auto">
                      <span className="text-[10px] font-display tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                        {game.platform.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
              </motion.div>

              <DialogContent className="sm:max-w-xl border-border bg-card p-0 overflow-hidden gap-0">
                <div className="w-full h-48 sm:h-72 relative">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] sm:text-xs font-display font-semibold tracking-wider px-3 py-1 rounded-full border ${statusColors[game.status]} backdrop-blur-md bg-opacity-70`}>
                      {game.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {game.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed whitespace-pre-line">
                      {game.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex items-center justify-between mt-8">
                    <span className="text-xs font-display tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 bg-secondary/5">
                      {game.platform.toUpperCase()}
                    </span>
                    
                    {game.link !== "#" && (
                      <Button asChild className="font-display font-bold tracking-wider rounded-lg" size="lg">
                        <a href={game.link} target="_blank" rel="noopener noreferrer">
                          {game.platform === "Steam" ? "Ir a Steam" : game.platform === "itch.io" ? "Jugar en itch.io" : "Ver Proyecto"}
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      <AdminPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onSuccess={() => setShowForm(true)}
      />

      <AdminGameForm open={showForm} onOpenChange={setShowForm} />
    </section>
  );
};

export default GamesSection;
