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

interface AdminGameFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminGameForm = ({ open, onOpenChange }: AdminGameFormProps) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("En desarrollo");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const escaped = description.replace(/"/g, '\\"');
    const finalLink = link.trim() || "#";
    const code = `  {
    title: "${title}",
    image: "${imageUrl}",
    description: "${escaped}",
    status: "${status}",
    link: "${finalLink}",
    platform: "${platform}",
  },`;
    setGeneratedCode(code);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setTitle("");
      setImageUrl("");
      setDescription("");
      setStatus("En desarrollo");
      setLink("");
      setPlatform("");
      setGeneratedCode("");
      setCopied(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl border-border bg-card max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🎮 Agregar Juego</DialogTitle>
          <DialogDescription>
            Completá los datos y se generará el código para pegar en <code className="text-primary bg-primary/10 px-1 rounded">GamesSection.tsx</code>
          </DialogDescription>
        </DialogHeader>

        {!generatedCode ? (
          <form onSubmit={handleGenerate} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Título del juego</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Virus Fútbol 3D"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">URL de la Imagen</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/Recursos/imagen.webp"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del juego..."
                required
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Publicado">Publicado</option>
                  <option value="Jugable">Jugable</option>
                  <option value="En desarrollo">En desarrollo</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Plataforma</label>
                <Input
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Steam, itch.io, PC..."
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Link externo (dejar vacío si no tiene)</label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://store.steampowered.com/app/..."
              />
            </div>
            <Button type="submit" className="w-full font-display font-bold tracking-wider">
              Generar Código
            </Button>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="relative">
              <pre className="bg-background border border-border rounded-lg p-4 text-xs text-foreground overflow-x-auto font-mono whitespace-pre-wrap">
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
              Pegá este código dentro del array <code className="text-primary bg-primary/10 px-1 rounded">games</code> en el archivo{" "}
              <code className="text-primary bg-primary/10 px-1 rounded">src/components/GamesSection.tsx</code>.
            </p>
            <Button
              variant="outline"
              onClick={() => setGeneratedCode("")}
              className="w-full font-display"
            >
              Crear otro juego
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminGameForm;
