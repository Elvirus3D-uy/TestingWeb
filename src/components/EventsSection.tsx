import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import AdminPinDialog from "./AdminPinDialog";
import AdminEventForm from "./AdminEventForm";

const events = [
  {
    title: "Global Game Jam 2026",
    date: "Febrero 2026",
    location: "Globant, Uruguay",
    image: "/Recursos/ElSecretoDeMiAbuela.webp",
    description:
      "Participación en la Global Game Jam, uno de los eventos de desarrollo de videojuegos más importantes a nivel mundial. Durante 48 horas, bajo la temática \"Máscaras\", el equipo creó \"El secreto de mi abuela\". El equipo estuvo conformado por Luis Robles, Ricardo Gomes y Rodrigo Peralta.",
    result: "El secreto de mi abuela — publicado en itch.io",
    team: ["Luis Robles", "Ricardo Gomes", "Rodrigo Peralta"],
  },
  {
    title: "Lanzamiento Virusmania",
    date: "Agosto 2025",
    location: "Online",
    image: "/Recursos/Virusmania.webp",
    description:
      "El equipo de El Virus 3D trabajó intensamente en Virusmania para dejarlo listo para su lanzamiento. Este juego desarrollado en Unity combina mecánicas simples pero efectivas con una atmósfera vibrante para ofrecer una experiencia adictiva y emocionante.",
    result: "Virusmania disponible en la sección Juegos",
    team: [],
  },
];

const CLICKS_REQUIRED = 5;
const CLICK_WINDOW_MS = 3000;

const EventsSection = () => {
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
    <section id="eventos" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-3 mb-2 select-none cursor-default"
          onClick={handleTitleClick}
        >
          <Calendar className="w-7 h-7 text-primary" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground glow-text">
            EVENTOS
          </h2>
        </div>
        <p className="text-muted-foreground mb-10 text-sm">
          Participaciones, jams y lanzamientos del estudio.
        </p>

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className="rounded-xl border border-border bg-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="md:flex">
                <div className="md:w-96 flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-56 md:h-full object-cover" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-primary" />
                      {event.location}
                    </span>
                    {event.team.length > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Users size={13} className="text-primary" />
                        {event.team.join(", ")}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-display font-semibold tracking-wider w-fit">
                    🏆 {event.result}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AdminPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onSuccess={() => setShowForm(true)}
      />

      <AdminEventForm open={showForm} onOpenChange={setShowForm} />
    </section>
  );
};

export default EventsSection;
