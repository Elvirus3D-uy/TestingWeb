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
import { Lock, ShieldCheck, ShieldX } from "lucide-react";

interface AdminPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CORRECT_PIN = "43952078";

const AdminPinDialog = ({ open, onOpenChange, onSuccess }: AdminPinDialogProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setPin("");
        setSuccess(false);
        onOpenChange(false);
        onSuccess();
      }, 600);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setPin("");
      setError(false);
      setSuccess(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm border-border bg-card">
        <DialogHeader className="text-center items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
            success ? "bg-green-500/20" : error ? "bg-red-500/20 animate-pulse" : "bg-primary/10"
          }`}>
            {success ? (
              <ShieldCheck className="w-8 h-8 text-green-400" />
            ) : error ? (
              <ShieldX className="w-8 h-8 text-red-400" />
            ) : (
              <Lock className="w-8 h-8 text-primary" />
            )}
          </div>
          <DialogTitle className="font-display text-xl">
            {success ? "¡Acceso concedido!" : "Acceso Restringido"}
          </DialogTitle>
          <DialogDescription>
            {success ? "Redirigiendo..." : "Ingresá el PIN de administrador para continuar."}
          </DialogDescription>
        </DialogHeader>

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              type="password"
              inputMode="numeric"
              placeholder="••••••••"
              value={pin}
              maxLength={10}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className={`text-center text-lg tracking-[0.3em] font-mono border-border bg-background ${
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-400 text-center animate-pulse">PIN incorrecto. Intentá de nuevo.</p>
            )}
            <Button type="submit" className="w-full font-display font-bold tracking-wider">
              Verificar
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPinDialog;
