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

interface AdminEventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminEventForm = ({ open, onOpenChange }: AdminEventFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [team, setTeam] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const escapedDesc = description.replace(/"/g, '\\"');
    const teamArray = team ? team.split(",").map(t => `"${t.trim()}"`).join(", ") : "";
    
    const code = `  {
    title: "${title}",
    date: "${date}",
    location: "${location}",
    image: "${imageUrl}",
    description:
      "${escapedDesc}",
    result: "${result}",
    team: [${teamArray}],
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
      setLocation("");
      setImageUrl("");
      setDescription("");
      setResult("");
      setTeam("");
      setGeneratedCode("");
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl border-border bg-card max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🏆 Agregar Evento</DialogTitle>
          <DialogDescription>
            Generá el código para <code className="text-primary bg-primary/10 px-1 rounded">EventsSection.tsx</code>
          </DialogDescription>
        </DialogHeader>

        {!generatedCode ? (
          <form onSubmit={handleGenerate} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Título del Evento</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Global Game Jam 2026"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Fecha</label>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Ej: Febrero 2026"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Ubicación</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Globant, Uruguay"
                  required
                />
              </div>
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
                placeholder="Descripción del evento..."
                required
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Resultado / Logro</label>
              <Input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Ej: Ganador del premio X"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Equipo (separado por comas)</label>
              <Input
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Luis Robles, Ricardo Gomes..."
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
              Pegá este código dentro del array <code className="text-primary bg-primary/10 px-1 rounded">events</code> en el archivo{" "}
              <code className="text-primary bg-primary/10 px-1 rounded">src/components/EventsSection.tsx</code>.
            </p>
            <Button
              variant="outline"
              onClick={() => setGeneratedCode("")}
              className="w-full font-display"
            >
              Crear otro evento
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminEventForm;
