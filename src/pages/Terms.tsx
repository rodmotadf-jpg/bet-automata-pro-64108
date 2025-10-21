import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Terms = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (!accepted) {
      toast.error("Você precisa aceitar os termos para continuar");
      return;
    }
    
    localStorage.setItem("hasAcceptedTerms", "true");
    toast.success("Termos aceitos! Bem-vindo ao sistema.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl bg-gradient-card border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Termos de Uso e Aviso Legal</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Leia atentamente antes de continuar
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScrollArea className="h-64 w-full rounded-lg border border-border/50 bg-secondary/30 p-4">
            <div className="space-y-4 text-sm text-foreground/90">
              <h3 className="font-semibold text-lg text-foreground">Aviso Importante</h3>
              
              <p>
                Este software é um <strong>robô de automação de apostas esportivas</strong> desenvolvido 
                exclusivamente para fins educacionais e de entretenimento.
              </p>

              <h4 className="font-semibold text-base text-foreground mt-4">1. Não Garantia de Lucros</h4>
              <p>
                O sistema NÃO garante lucros ou resultados financeiros. Apostas esportivas envolvem 
                riscos financeiros significativos e você pode perder todo o capital investido.
              </p>

              <h4 className="font-semibold text-base text-foreground mt-4">2. Responsabilidade do Usuário</h4>
              <p>
                Ao utilizar este sistema, você assume <strong>total responsabilidade</strong> por 
                todas as apostas realizadas, ganhos e perdas. Os desenvolvedores e distribuidores 
                deste software não se responsabilizam por quaisquer perdas financeiras.
              </p>

              <h4 className="font-semibold text-base text-foreground mt-4">3. Proibição de Revenda</h4>
              <p>
                É estritamente <strong>proibida a revenda, redistribuição ou compartilhamento 
                não autorizado</strong> deste sistema. A licença é individual e intransferível.
              </p>

              <h4 className="font-semibold text-base text-foreground mt-4">4. Uso Consciente</h4>
              <p>
                Recomendamos fortemente que você:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Aposte apenas valores que pode perder</li>
                <li>Defina limites de perda e ganho</li>
                <li>Utilize a conta demo para treinamento</li>
                <li>Não utilize como fonte de renda principal</li>
              </ul>

              <h4 className="font-semibold text-base text-foreground mt-4">5. Legalidade</h4>
              <p>
                Você é responsável por garantir que o uso de sistemas de automação de apostas 
                seja legal em sua jurisdição.
              </p>

              <p className="mt-4 text-destructive font-semibold">
                Ao clicar em "Li e Aceito os Termos", você declara ter lido, compreendido e 
                concordado plenamente com todos os itens acima.
              </p>
            </div>
          </ScrollArea>

          <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg border border-border/50">
            <Checkbox 
              id="terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Li e aceito todos os termos de uso e avisos legais
            </label>
          </div>

          <Button
            onClick={handleAccept}
            disabled={!accepted}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar para o Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
