import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";

interface AdminProjectSidebarFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminProjectSidebarForm = ({ open, onOpenChange }: AdminProjectSidebarFormProps) => {
  const [mode, setMode] = useState<"ultimo" | "obra">("ultimo");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    let code = "";
    
    if (mode === "ultimo") {
      code = `      <motion.div
        className="rounded-xl border border-border bg-card p-5"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-sm font-display font-bold text-secondary tracking-wider mb-4">
          ÚLTIMO LANZAMIENTO
        </h3>
        <div className="h-px w-full bg-border mb-4" />
        <a href="${link || "#"}" target="_blank" rel="noopener noreferrer" className="block group">
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src="${imageUrl}"
              alt="${name}"
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            ${name}
          </span>
        </a>
      </motion.div>`;
    } else {
      code = `{ img: "${imageUrl}", name: "${name}" },`;
    }
    
    setGeneratedCode(code);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setLink("");
      setGeneratedCode("");
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl border-border bg-card max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🚀 Sidebar Admin</DialogTitle>
          <DialogDescription>
            Generá código para la barra lateral.
          </DialogDescription>
        </DialogHeader>

        {!generatedCode ? (
          <form onSubmit={handleGenerate} className="space-y-4 mt-2">
            <div className="flex bg-muted p-1 rounded-lg">
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-display font-bold rounded-md transition-all ${mode === "ultimo" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                onClick={() => setMode("ultimo")}
              >
                Último Lanzamiento
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-display font-bold rounded-md transition-all ${mode === "obra" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                onClick={() => setMode("obra")}
              >
                Proyecto en Obra
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nombre del Proyecto</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Proyecto Infernal"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">URL de la Imagen</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://elvirus3d.com.uy/Recursos/imagen.webp"
                required
              />
            </div>
            {mode === "ultimo" && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Link externo (ej: Steam)</label>
                <Input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://store.steampowered.com/..."
                />
              </div>
            )}
            
            <Button type="submit" className="w-full font-display font-bold tracking-wider">
              Generar Código
            </Button>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="relative">
              <pre className="bg-background border border-border rounded-lg p-4 text-[10px] text-foreground overflow-x-auto font-mono whitespace-pre-wrap">
                {generatedCode}
              </pre>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="absolute top-2 right-2 h-8 gap-1.5 text-xs font-display"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? "¡Copiado!" : "Copiar"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {mode === "ultimo" 
                ? "Reemplaza el bloque entero de 'ÚLTIMO LANZAMIENTO' en ProjectsSidebar.tsx." 
                : "Agregá esta línea dentro de la lista de 'PROYECTOS EN OBRA' en ProjectsSidebar.tsx."}
            </p>
            <Button
              variant="outline"
              onClick={() => setGeneratedCode("")}
              className="w-full font-display"
            >
              Crear otro
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminProjectSidebarForm;
