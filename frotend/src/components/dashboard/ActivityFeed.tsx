import { motion } from "framer-motion";
import {
  Package,
  MessageCircle,
  Share2,
  DollarSign,
  Calculator,
  Bot,
} from "lucide-react";

const activities = [
  {
    id: 1,
    agent: "Inventory Agent",
    icon: Package,
    color: "text-inventory",
    bgColor: "bg-inventory/10",
    action: "Detected low stock: Organic Milk (3 units left)",
    time: "2 min ago",
  },
  {
    id: 2,
    agent: "Customer Service",
    icon: MessageCircle,
    color: "text-customer",
    bgColor: "bg-customer/10",
    action: "Answered query via WhatsApp: Opening hours",
    time: "5 min ago",
  },
  {
    id: 3,
    agent: "Social Media",
    icon: Share2,
    color: "text-social",
    bgColor: "bg-social/10",
    action: "Posted to Instagram: Fresh pastries promo",
    time: "15 min ago",
  },
  {
    id: 4,
    agent: "Pricing Agent",
    icon: DollarSign,
    color: "text-pricing",
    bgColor: "bg-pricing/10",
    action: "Competitor price update: Tesco bread now £1.15",
    time: "32 min ago",
  },
  {
    id: 5,
    agent: "Accounting",
    icon: Calculator,
    color: "text-accounting",
    bgColor: "bg-accounting/10",
    action: "Daily report generated: £456.80 revenue",
    time: "1 hr ago",
  },
  {
    id: 6,
    agent: "Customer Service",
    icon: MessageCircle,
    color: "text-customer",
    bgColor: "bg-customer/10",
    action: "New order received via Telegram: 2x Lattes",
    time: "1 hr ago",
  },
];

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">Agent Activity</h3>
            <p className="text-xs text-muted-foreground">Real-time updates</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
          Live
        </span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-lg flex-shrink-0 ${activity.bgColor}`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">
                  {activity.agent}
                </p>
                <p className="text-sm text-foreground truncate">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
