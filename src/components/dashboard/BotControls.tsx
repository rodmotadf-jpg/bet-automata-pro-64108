import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Power, Settings2 } from "lucide-react";
import { toast } from "sonner";

interface BotControlsProps {
  botActive: boolean;
  setBotActive: (active: boolean) => void;
  balance: number;
}

const BotControls = ({ botActive, setBotActive, balance }: BotControlsProps) => {
  const [betAmount, setBetAmount] = useState("10");
  const [profitTarget, setProfitTarget] = useState("5");
  const [lossLimit, setLossLimit] = useState("3");
  const [bankPercent, setBankPercent] = useState("2");
  
  const [markets, setMarkets] = useState({
    goals: true,
    btts: false,
    corners: false,
    cards: false
  });

  const handleToggleBot = () => {
    if (!botActive) {
      if (parseFloat(betAmount) <= 0) {
        toast.error("Defina um valor de entrada válido");
        return;
      }
      toast.success("Bot ativado! Iniciando análises...");
    } else {
      toast.info("Bot desativado");
    }
    setBotActive(!botActive);
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              Configurações do Bot
            </CardTitle>
            <CardDescription>Configure os parâmetros de automação</CardDescription>
          </div>
          <Badge variant={botActive ? "default" : "outline"} className={botActive ? "bg-success shadow-glow" : ""}>
            {botActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configurações de Valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="betAmount">Valor da Entrada</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
              <Input
                id="betAmount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
                disabled={botActive}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitTarget">Meta de Ganho (%)</Label>
            <div className="relative">
              <Input
                id="profitTarget"
                type="number"
                value={profitTarget}
                onChange={(e) => setProfitTarget(e.target.value)}
                className="bg-secondary/50 border-border/50"
                disabled={botActive}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lossLimit">Limite de Perda (%)</Label>
            <div className="relative">
              <Input
                id="lossLimit"
                type="number"
                value={lossLimit}
                onChange={(e) => setLossLimit(e.target.value)}
                className="bg-secondary/50 border-border/50"
                disabled={botActive}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPercent">% da Banca</Label>
            <div className="relative">
              <Input
                id="bankPercent"
                type="number"
                value={bankPercent}
                onChange={(e) => setBankPercent(e.target.value)}
                className="bg-secondary/50 border-border/50"
                disabled={botActive}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        {/* Mercados */}
        <div>
          <Label className="mb-3 block">Mercados Ativos</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
              <Checkbox
                id="goals"
                checked={markets.goals}
                onCheckedChange={(checked) => setMarkets({ ...markets, goals: checked as boolean })}
                disabled={botActive}
              />
              <label htmlFor="goals" className="text-sm font-medium cursor-pointer">
                1+ Gols
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
              <Checkbox
                id="btts"
                checked={markets.btts}
                onCheckedChange={(checked) => setMarkets({ ...markets, btts: checked as boolean })}
                disabled={botActive}
              />
              <label htmlFor="btts" className="text-sm font-medium cursor-pointer">
                Ambos Marcam
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
              <Checkbox
                id="corners"
                checked={markets.corners}
                onCheckedChange={(checked) => setMarkets({ ...markets, corners: checked as boolean })}
                disabled={botActive}
              />
              <label htmlFor="corners" className="text-sm font-medium cursor-pointer">
                Escanteios
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
              <Checkbox
                id="cards"
                checked={markets.cards}
                onCheckedChange={(checked) => setMarkets({ ...markets, cards: checked as boolean })}
                disabled={botActive}
              />
              <label htmlFor="cards" className="text-sm font-medium cursor-pointer">
                Cartões
              </label>
            </div>
          </div>
        </div>

        {/* Botão de Controle */}
        <Button
          onClick={handleToggleBot}
          className={`w-full h-14 text-lg font-semibold transition-smooth ${
            botActive 
              ? "bg-destructive hover:bg-destructive/90 shadow-glow-red" 
              : "bg-gradient-primary shadow-glow"
          }`}
        >
          <Power className="w-5 h-5 mr-2" />
          {botActive ? "Desativar Bot" : "Ativar Bot"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BotControls;
