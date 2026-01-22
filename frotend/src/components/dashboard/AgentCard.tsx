import { motion } from "framer-motion";
import { LucideIcon, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  title: string;
  description: string;
  status: "active" | "idle" | "error";
  lastAction?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  path: string;
  delay?: number;
}

export function AgentCard({
  title,
  description,
  status,
  lastAction,
  icon: Icon,
  color,
  bgColor,
  path,
  delay = 0,
}: AgentCardProps) {
  const statusColors = {
    active: "bg-green-500",
    idle: "bg-yellow-500",
    error: "bg-red-500",
  };

  const statusLabels = {
    active: "Running",
    idle: "Idle",
    error: "Error",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="stat-card group relative overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${bgColor}`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${bgColor}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`} />
            <span className="text-xs font-medium text-muted-foreground">
              {statusLabels[status]}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-display font-bold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Last Action */}
        {lastAction && (
          <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-muted/50">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground truncate">{lastAction}</span>
          </div>
        )}

        {/* Action */}
        <Link to={path}>
          <Button variant="ghost" className="w-full group/btn justify-between">
            <span>Open Agent</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
