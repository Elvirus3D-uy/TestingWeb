import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Principal", href: "#principal" },
  { label: "Juegos", href: "#juegos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Sobre Nosotros", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#principal" className="flex items-center gap-2 md:gap-3">
            <img
              src="/imagenes/virus-pequeno-solo.png"
              alt="El Virus 3D"
              className="h-10 md:h-12 w-auto"
            />
            <span className="font-display text-base md:text-lg font-bold tracking-wider text-foreground">
              El Virus <span className="text-primary">3D</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-all hover:text-primary hover:bg-primary/5 rounded-full font-display"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
