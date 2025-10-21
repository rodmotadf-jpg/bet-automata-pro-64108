import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Clock } from "lucide-react";

const UpcomingMatches = () => {
  const matches = [
    {
      id: 1,
      home: "Manchester City",
      away: "Arsenal",
      league: "Premier League",
      time: "16:00",
      date: "Hoje",
      analysis: {
        goals: { probability: 85, recommended: true },
        btts: { probability: 72, recommended: true },
        corners: { probability: 68, recommended: false },
        cards: { probability: 55, recommended: false },
      }
    },
    {
      id: 2,
      home: "Real Madrid",
      away: "Barcelona",
      league: "La Liga",
      time: "18:30",
      date: "Hoje",
      analysis: {
        goals: { probability: 92, recommended: true },
        btts: { probability: 88, recommended: true },
        corners: { probability: 75, recommended: true },
        cards: { probability: 62, recommended: false },
      }
    },
    {
      id: 3,
      home: "Bayern Munich",
      away: "Borussia Dortmund",
      league: "Bundesliga",
      time: "20:45",
      date: "Amanhã",
      analysis: {
        goals: { probability: 78, recommended: true },
        btts: { probability: 65, recommended: false },
        corners: { probability: 70, recommended: true },
        cards: { probability: 58, recommended: false },
      }
    },
  ];

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.id} className="bg-gradient-card border-border/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle className="text-xl">
                  {match.home} vs {match.away}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {match.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {match.time}
                  </span>
                  <Badge variant="outline">{match.league}</Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1+ Gols */}
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">1+ Gols</h4>
                  {match.analysis.goals.recommended && (
                    <Badge className="bg-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probabilidade</span>
                    <span className="font-semibold text-success">{match.analysis.goals.probability}%</span>
                  </div>
                  <Progress value={match.analysis.goals.probability} className="h-2" />
                </div>
              </div>

              {/* Ambos Marcam */}
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Ambos Marcam</h4>
                  {match.analysis.btts.recommended && (
                    <Badge className="bg-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probabilidade</span>
                    <span className={`font-semibold ${match.analysis.btts.recommended ? "text-success" : "text-muted-foreground"}`}>
                      {match.analysis.btts.probability}%
                    </span>
                  </div>
                  <Progress value={match.analysis.btts.probability} className="h-2" />
                </div>
              </div>

              {/* Escanteios */}
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Escanteios 9+</h4>
                  {match.analysis.corners.recommended && (
                    <Badge className="bg-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probabilidade</span>
                    <span className={`font-semibold ${match.analysis.corners.recommended ? "text-success" : "text-muted-foreground"}`}>
                      {match.analysis.corners.probability}%
                    </span>
                  </div>
                  <Progress value={match.analysis.corners.probability} className="h-2" />
                </div>
              </div>

              {/* Cartões */}
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Cartões 4+</h4>
                  {match.analysis.cards.recommended && (
                    <Badge className="bg-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probabilidade</span>
                    <span className={`font-semibold ${match.analysis.cards.recommended ? "text-success" : "text-muted-foreground"}`}>
                      {match.analysis.cards.probability}%
                    </span>
                  </div>
                  <Progress value={match.analysis.cards.probability} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingMatches;
