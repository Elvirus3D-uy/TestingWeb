import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import AdminPinDialog from "./AdminPinDialog";
import AdminProjectSidebarForm from "./AdminProjectSidebarForm";

const ProjectsSidebar = () => {
  const clickTimestamps = useRef<number[]>([]);
  const [showPin, setShowPin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTitleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < 3000
    );
    if (clickTimestamps.current.length >= 5) {
      clickTimestamps.current = [];
      setShowPin(true);
    }
  }, []);

  return (
    <aside className="space-y-8">
      {/* Último lanzamiento */}
      <motion.div
        className="rounded-xl border border-border bg-card p-5"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 
          className="text-sm font-display font-bold text-secondary tracking-wider mb-4 select-none cursor-default"
          onClick={handleTitleClick}
        >
          ÚLTIMO LANZAMIENTO
        </h3>
        <div className="h-px w-full bg-border mb-4" />
        <a href="https://store.steampowered.com/app/2999690/Proyecto_infernal/" target="_blank" rel="noopener noreferrer" className="block group">
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src="/Recursos/ProyectoInfernal1.webp"
              alt="Proyecto Infernal"
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            Proyecto Infernal
          </span>
        </a>
      </motion.div>

      {/* Proyectos en obra */}
      <motion.div
        className="rounded-xl border border-border bg-card p-5"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 
          className="text-sm font-display font-bold text-secondary tracking-wider mb-4 select-none cursor-default"
          onClick={handleTitleClick}
        >
          PROYECTOS EN OBRA
        </h3>
        <div className="h-px w-full bg-border mb-4" />
        <div className="space-y-4">
          {[
            { img: "/Recursos/VirusFutbol3D0.webp", name: "Virus Fútbol 3D" },
            { img: "/Recursos/Caperuza0.webp", name: "Caperuza Escarlata" },
          ].map((project) => (
            <div key={project.name} className="group cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-2">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <AdminPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onSuccess={() => setShowForm(true)}
      />

      <AdminProjectSidebarForm open={showForm} onOpenChange={setShowForm} />
    </aside>
  );
};

export default ProjectsSidebar;
