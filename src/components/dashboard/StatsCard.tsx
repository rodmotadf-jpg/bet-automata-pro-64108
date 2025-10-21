import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  variant?: "default" | "success" | "destructive" | "accent";
}

const StatsCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) => {
  const variantStyles = {
    default: "bg-gradient-card border-border/50",
    success: "bg-gradient-card border-success/30 shadow-glow",
    destructive: "bg-gradient-card border-destructive/30 shadow-glow-red",
    accent: "bg-gradient-gold border-accent/30",
  };

  return (
    <Card className={cn("transition-smooth hover:scale-105", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend !== undefined && (
              <p className={cn(
                "text-sm font-medium",
                trend >= 0 ? "text-success" : "text-destructive"
              )}>
                {trend >= 0 ? "+" : ""}{trend}%
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            variant === "success" && "bg-success/20",
            variant === "destructive" && "bg-destructive/20",
            variant === "accent" && "bg-accent/20",
            variant === "default" && "bg-primary/20"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              variant === "success" && "text-success",
              variant === "destructive" && "text-destructive",
              variant === "accent" && "text-accent",
              variant === "default" && "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
