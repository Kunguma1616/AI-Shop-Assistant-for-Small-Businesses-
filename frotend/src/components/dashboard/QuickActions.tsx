import { motion } from "framer-motion";
import { 
  Plus, 
  Scan, 
  Send, 
  TrendingUp, 
  FileText, 
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "Add Stock", icon: Plus, color: "text-inventory" },
  { label: "Scan Prices", icon: Scan, color: "text-pricing" },
  { label: "Send Promo", icon: Send, color: "text-social" },
  { label: "View Reports", icon: FileText, color: "text-accounting" },
  { label: "Price Check", icon: TrendingUp, color: "text-pricing" },
  { label: "Sync All", icon: RefreshCw, color: "text-primary" },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="stat-card"
    >
      <h3 className="font-display font-bold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3"
              >
                <Icon className={`w-4 h-4 ${action.color}`} />
                <span className="text-sm">{action.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
