import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatsCard from "@/components/dashboard/StatsCard";
import BotControls from "@/components/dashboard/BotControls";
import BettingHistory from "@/components/dashboard/BettingHistory";
import UpcomingMatches from "@/components/dashboard/UpcomingMatches";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  LogOut,
  Settings,
  Bot,
  Link as LinkIcon,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useBackgroundSync } from "@/hooks/useBackgroundSync";

const Dashboard = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"demo" | "real">("demo");
  const [balance, setBalance] = useState(1000);
  const [botActive, setBotActive] = useState(false);
  
  // Hook para manter o bot rodando em background
  useBackgroundSync(botActive);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedBettingHouse, setSelectedBettingHouse] = useState("");
  const [apiCredentials, setApiCredentials] = useState({
    email: "",
    password: ""
  });
  const [stats, setStats] = useState({
    totalBets: 124,
    wins: 78,
    losses: 46,
    winRate: 62.9,
    profit: 245.50
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  // Auto-atualização a cada segundo quando o bot está ativo
  useEffect(() => {
    if (!botActive) return;

    const interval = setInterval(() => {
      // Simula atualização de estatísticas e saldo em tempo real
      setStats(prev => ({
        ...prev,
        totalBets: prev.totalBets + Math.floor(Math.random() * 2),
        wins: prev.wins + (Math.random() > 0.4 ? 1 : 0),
        losses: prev.losses + (Math.random() > 0.6 ? 1 : 0),
        winRate: Number(((prev.wins / prev.totalBets) * 100).toFixed(1)),
        profit: Number((prev.profit + (Math.random() * 10 - 3)).toFixed(2))
      }));

      // Atualiza saldo baseado nas apostas
      setBalance(prev => {
        const change = Math.random() * 20 - 8;
        return Number((prev + change).toFixed(2));
      });

      console.log(`[Bot Ativo] Atualização em ${new Date().toLocaleTimeString()}`);
    }, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(interval);
  }, [botActive]);

  // Recarregamento automático da conta demo
  useEffect(() => {
    if (accountType === "demo" && balance < 200) {
      setBalance(prev => prev + 1000);
      toast.info("Conta demo recarregada! +R$ 1.000,00");
    }
  }, [balance, accountType]);

  const handleAccountTypeChange = (type: "demo" | "real") => {
    if (type === "real" && !isConnected) {
      setShowConnectionModal(true);
    } else {
      setAccountType(type);
      if (type === "demo") {
        setBalance(1000);
      }
    }
  };

  const handleConnectAPI = () => {
    if (!selectedBettingHouse) {
      toast.error("Selecione uma casa de apostas!");
      return;
    }
    
    if (!apiCredentials.email || !apiCredentials.password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    // Simulação de conexão com API
    toast.success(`Conectado com sucesso à ${selectedBettingHouse}!`);
    setIsConnected(true);
    setAccountType("real");
    setBalance(500); // Saldo real de exemplo
    setShowConnectionModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bot de Apostas Pro</h1>
              <p className="text-xs text-muted-foreground">Sistema de Automação</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Seletor de Conta */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tipo de Conta</p>
                  <div className="flex gap-2">
                    <Button
                      variant={accountType === "demo" ? "default" : "outline"}
                      onClick={() => handleAccountTypeChange("demo")}
                      className={accountType === "demo" ? "bg-gradient-primary shadow-glow" : ""}
                    >
                      Demo
                    </Button>
                    <Button
                      variant={accountType === "real" ? "default" : "outline"}
                      onClick={() => handleAccountTypeChange("real")}
                      className={accountType === "real" ? "bg-gradient-gold shadow-glow" : ""}
                    >
                      <span className="flex items-center gap-2">
                        Real
                        {isConnected && <CheckCircle2 className="w-4 h-4" />}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
                <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  R$ {balance.toFixed(2)}
                </p>
                {accountType === "demo" ? (
                  <Badge variant="outline" className="mt-2">
                    Recarga automática em &lt; R$ 200
                  </Badge>
                ) : isConnected && (
                  <Badge variant="outline" className="mt-2 border-gold/50 text-gold">
                    {selectedBettingHouse}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Apostas"
            value={stats.totalBets.toString()}
            icon={Target}
            variant="default"
          />
          <StatsCard
            title="Taxa de Acerto"
            value={`${stats.winRate}%`}
            icon={TrendingUp}
            trend={5.3}
            variant="success"
          />
          <StatsCard
            title="Lucro Total"
            value={`R$ ${stats.profit.toFixed(2)}`}
            icon={DollarSign}
            trend={12.5}
            variant="accent"
          />
          <StatsCard
            title="Perdas"
            value={stats.losses.toString()}
            icon={TrendingDown}
            variant="destructive"
          />
        </div>

        {/* Controles do Bot */}
        <BotControls 
          botActive={botActive}
          setBotActive={setBotActive}
          balance={balance}
        />

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="bg-card/50 border border-border/50">
            <TabsTrigger value="history">Histórico de Apostas</TabsTrigger>
            <TabsTrigger value="analysis">Análise de Jogos</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <BettingHistory />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <UpcomingMatches />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Conexão com Casa de Apostas */}
      <Dialog open={showConnectionModal} onOpenChange={setShowConnectionModal}>
        <DialogContent className="sm:max-w-md bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Conectar Casa de Apostas
            </DialogTitle>
            <DialogDescription>
              Escolha sua casa de apostas e conecte sua conta real para o bot realizar entradas automáticas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="betting-house">Casa de Apostas</Label>
              <Select value={selectedBettingHouse} onValueChange={setSelectedBettingHouse}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Selecione a casa de apostas" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50 z-50">
                  <SelectItem value="Estrela Bet">Estrela Bet</SelectItem>
                  <SelectItem value="Bet365">Bet365</SelectItem>
                  <SelectItem value="Betano">Betano</SelectItem>
                  <SelectItem value="Sportingbet">Sportingbet</SelectItem>
                  <SelectItem value="Betfair">Betfair</SelectItem>
                  <SelectItem value="1xBet">1xBet</SelectItem>
                  <SelectItem value="22Bet">22Bet</SelectItem>
                  <SelectItem value="Rivalry">Rivalry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedBettingHouse && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail da {selectedBettingHouse}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={apiCredentials.email}
                    onChange={(e) => setApiCredentials({ ...apiCredentials, email: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={apiCredentials.password}
                    onChange={(e) => setApiCredentials({ ...apiCredentials, password: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </>
            )}

            <div className="rounded-lg bg-muted/50 p-3 border border-border/30">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Importante:</strong> O bot funcionará 24/7 em segundo plano, mesmo com o dispositivo bloqueado. Certifique-se de que sua casa de apostas permite automação.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowConnectionModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConnectAPI}
                className="flex-1 bg-gradient-gold shadow-glow"
              >
                Conectar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
