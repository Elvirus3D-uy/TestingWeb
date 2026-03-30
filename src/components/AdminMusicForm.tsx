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
import { Copy, Check, Music } from "lucide-react";

interface AdminMusicFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminMusicForm = ({ open, onOpenChange }: AdminMusicFormProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.floor(Math.random() * 1000) + 10; // Simple random ID
    const code = `  { id: ${nextId}, title: "${title}", url: "${url}" },`;
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
      setUrl("");
      setGeneratedCode("");
      setCopied(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl border-border bg-card max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" /> Agregar Música
          </DialogTitle>
          <DialogDescription>
            Completá los datos y se generará el código para pegar en el array <code className="text-primary bg-primary/10 px-1 rounded">playlist</code> en <code className="text-primary bg-primary/10 px-1 rounded">MusicPlayer.tsx</code>
          </DialogDescription>
        </DialogHeader>

        {!generatedCode ? (
          <form onSubmit={handleGenerate} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nombre de la Canción</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: El Virus Remix"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">URL del archivo MP3</label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/Recursos/cancion.mp3"
                required
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
              Pegá este código dentro del array <code className="text-primary bg-primary/10 px-1 rounded">playlist</code> en el archivo{" "}
              <code className="text-primary bg-primary/10 px-1 rounded">src/components/MusicPlayer.tsx</code>.
            </p>
            <Button
              variant="outline"
              onClick={() => setGeneratedCode("")}
              className="w-full font-display"
            >
              Crear otra canción
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminMusicForm;
