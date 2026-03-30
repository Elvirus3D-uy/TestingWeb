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

interface AdminNewsFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminNewsForm = ({ open, onOpenChange }: AdminNewsFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const escaped = content.replace(/"/g, '\\"');
    const code = `  {
    image: "${imageUrl}",
    date: "${date}",
    title: "${title}",
    content:
      "${escaped}",
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
      setDate("");
      setImageUrl("");
      setContent("");
      setGeneratedCode("");
      setCopied(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl border-border bg-card max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">📰 Agregar Noticia</DialogTitle>
          <DialogDescription>
            Completá los datos y se generará el código para pegar en <code className="text-primary bg-primary/10 px-1 rounded">NewsSection.tsx</code>
          </DialogDescription>
        </DialogHeader>

        {!generatedCode ? (
          <form onSubmit={handleGenerate} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Título</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Nuevo juego publicado"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Fecha</label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Ej: Lunes, 10 de marzo del 2026"
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
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Contenido</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descripción completa de la noticia..."
                required
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              Pegá este código dentro del array <code className="text-primary bg-primary/10 px-1 rounded">newsItems</code> en el archivo{" "}
              <code className="text-primary bg-primary/10 px-1 rounded">src/components/NewsSection.tsx</code>.
            </p>
            <Button
              variant="outline"
              onClick={() => setGeneratedCode("")}
              className="w-full font-display"
            >
              Crear otra noticia
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminNewsForm;
