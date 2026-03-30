import { motion } from "framer-motion";
import { Mail, Globe, Heart, Instagram } from "lucide-react";
import PaypalDonate from "./PaypalDonate";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 glow-text text-center">
          CONTACTO
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-10">
          ¿Querés colaborar, dar feedback o simplemente saludar?
        </p>

        <motion.div
          className="max-w-lg mx-auto rounded-xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <a
              href="mailto:markplay06061990@gmail.com"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition-colors group"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  markplay06061990@gmail.com
                </p>
                <p className="text-xs text-muted-foreground">Email de contacto</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/el.virus_3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition-colors group"
            >
              <Instagram className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  @el.virus_3d
                </p>
                <p className="text-xs text-muted-foreground">Síguenos en Instagram</p>
              </div>
            </a>

            <PaypalDonate
              className="flex items-center gap-4 p-4 rounded-lg border border-secondary/20 bg-secondary/5 hover:border-secondary/50 transition-colors group w-full text-left"
              formClassName="w-full"
            >
              <Heart className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
                  Ayudanos a crecer
                </p>
                <p className="text-xs text-muted-foreground">
                  Podés apoyar al estudio compartiendo nuestros juegos y proyectos.
                </p>
              </div>
            </PaypalDonate>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Gracias por visitar El Virus 3D 💜
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
