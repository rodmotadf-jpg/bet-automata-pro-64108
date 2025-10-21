import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const BettingHistory = () => {
  const bets = [
    { id: 1, match: "Flamengo vs Palmeiras", market: "1+ Gols", odds: 1.45, stake: 10, status: "win", profit: 4.50, time: "14:30" },
    { id: 2, match: "Corinthians vs São Paulo", market: "Ambos Marcam", odds: 1.85, stake: 10, status: "win", profit: 8.50, time: "16:00" },
    { id: 3, match: "Santos vs Fluminense", market: "Escanteios 9+", odds: 1.95, stake: 10, status: "loss", profit: -10, time: "18:30" },
    { id: 4, match: "Grêmio vs Internacional", market: "1+ Gols", odds: 1.50, stake: 10, status: "pending", profit: 0, time: "20:00" },
    { id: 5, match: "Athletico vs Cruzeiro", market: "Cartões 4+", odds: 1.70, stake: 10, status: "win", profit: 7.00, time: "19:15" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "win":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "loss":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "pending":
        return <Clock className="w-5 h-5 text-accent" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      win: "default",
      loss: "destructive",
      pending: "outline"
    };
    
    const labels = {
      win: "Ganhou",
      loss: "Perdeu",
      pending: "Pendente"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as any} className={status === "win" ? "bg-success" : ""}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle>Histórico de Apostas</CardTitle>
        <CardDescription>Últimas entradas realizadas pelo bot</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Status</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Mercado</TableHead>
                <TableHead>Odd</TableHead>
                <TableHead>Stake</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => (
                <TableRow key={bet.id} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(bet.status)}
                      {getStatusBadge(bet.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{bet.match}</TableCell>
                  <TableCell>{bet.market}</TableCell>
                  <TableCell>{bet.odds.toFixed(2)}</TableCell>
                  <TableCell>R$ {bet.stake.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={bet.profit > 0 ? "text-success font-semibold" : bet.profit < 0 ? "text-destructive font-semibold" : "text-muted-foreground"}>
                      {bet.profit > 0 ? "+" : ""}R$ {bet.profit.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{bet.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BettingHistory;
