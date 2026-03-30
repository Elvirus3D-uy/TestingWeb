import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import AdminPinDialog from "./AdminPinDialog";
import AdminNewsForm from "./AdminNewsForm";

const newsItems = [
  {
    image: "/Recursos/VirusFutbolWeb.webp",
    date: "Domingo, 1 de marzo del 2026",
    title: "Virus Fútbol Web",
    content:
      "Disfrutá desde la pestaña Juegos de Virus Fútbol Web, una nueva experiencia dentro del universo de El Virus 3D. Esta versión web funciona como una demostración jugable de lo que será Virus Fútbol 3D, adaptada especialmente para el navegador. En esta primera entrega, el jugador podrá simular una liga ficticia con el objetivo de llevar a su club a la gloria deportiva.",
  },
  {
    image: "/Recursos/ElSecretoDeMiAbuela.webp",
    date: "Lunes, 2 de febrero del 2026",
    title: "Global Game Jam 2026",
    content:
      "El pasado fin de semana participé en la Global Game Jam. Durante 48 horas, en las instalaciones de Globant, asumimos el desafío de crear un juego completo bajo la temática \"Máscaras\". De esa colaboración nació \"El secreto de mi abuela\", un juego desarrollado íntegramente en el marco de la jam.",
  },
  {
    image: "/Recursos/Virusmania.webp",
    date: "Martes, 12 de agosto del 2025",
    title: "Virusmania",
    content:
      "El equipo de El Virus 3D trabajó intensamente en Virusmania para dejarlo listo para su lanzamiento. Este juego, desarrollado en Unity, te pone en la piel de un virus en un único nivel donde el objetivo es sobrevivir el mayor tiempo posible. A medida que eliminas enemigos, aparecen nuevos, aumentando el desafío constantemente.",
  },
];

const CLICKS_REQUIRED = 5;
const CLICK_WINDOW_MS = 3000;

const NewsSection = () => {
  const clickTimestamps = useRef<number[]>([]);
  const [showPin, setShowPin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTitleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    // Keep only clicks within the time window
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < CLICK_WINDOW_MS
    );
    if (clickTimestamps.current.length >= CLICKS_REQUIRED) {
      clickTimestamps.current = [];
      setShowPin(true);
    }
  }, []);

  return (
    <section id="noticias" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 glow-text select-none cursor-default"
          onClick={handleTitleClick}
        >
          NOTICIAS
        </h2>
        <div className="h-1 w-20 bg-primary rounded-full mb-10" />

        <div className="space-y-8">
          {newsItems.map((item, i) => (
            <motion.article
              key={i}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="md:flex">
                <div className="md:w-80 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary mb-2 font-display tracking-wider">
                    {item.date}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Hidden Admin: PIN Dialog */}
      <AdminPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onSuccess={() => setShowForm(true)}
      />

      {/* Hidden Admin: News Form */}
      <AdminNewsForm open={showForm} onOpenChange={setShowForm} />
    </section>
  );
};

export default NewsSection;
