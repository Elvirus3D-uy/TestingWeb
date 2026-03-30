import { motion } from "framer-motion";
import { Code2, Rocket, Lightbulb, Gamepad2 } from "lucide-react";

const highlights = [
  {
    icon: Gamepad2,
    title: "Juegos propios",
    description: "Desde títulos publicados como Infernal Project en Steam, hasta prototipos y minijuegos jugables en tu navegador.",
  },
  {
    icon: Lightbulb,
    title: "Proyectos originales",
    description: "Cuentos Codificados reinventa cuentos clásicos en mundos futuristas. Virus Fútbol 3D es un simulador táctico ambientado en ligas latinoamericanas.",
  },
  {
    icon: Code2,
    title: "Exploraciones técnicas",
    description: "Pruebas con datos, motores gráficos, herramientas educativas y más. Un laboratorio de ideas e innovación.",
  },
  {
    icon: Rocket,
    title: "Camino indie",
    description: "Un recorrido real por el camino de crear videojuegos de forma independiente, desde la idea hasta el producto final.",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 glow-text">
          SOBRE NOSOTROS
        </h2>
        <div className="h-1 w-20 bg-primary rounded-full mb-10" />

        <div className="lg:flex lg:gap-12">
          <motion.div
            className="lg:flex-1 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                El Virus 3D es un espacio donde convergen videojuegos, creatividad y tecnología desde Uruguay hacia el mundo.
                Nacido como un proyecto personal, hoy funciona como estudio indie, portfolio profesional y plataforma de experiencias interactivas, todo en un mismo lugar.
              </p>
              <p>
                Este sitio también funciona como una hoja de vida interactiva: una forma de mostrar lo que hacemos, cómo pensamos y hacia dónde queremos ir.
                Cada juego, línea de código y diseño publicado en El Virus 3D es una invitación a jugar, explorar y compartir.
              </p>
            </div>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <item.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
