import { motion } from "framer-motion";
import {
  Package,
  MessageCircle,
  Share2,
  DollarSign,
  Calculator,
  TrendingUp,
  Users,
  ShoppingBag,
  Wallet,
  BarChart3,
  Gift,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";

const stats = [
  {
    title: "Today's Revenue",
    value: "£1,248",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Wallet,
    iconColor: "text-primary",
  },
  {
    title: "Active Customers",
    value: "847",
    change: "+23",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-customer",
  },
  {
    title: "Orders Today",
    value: "156",
    change: "+8.3%",
    changeType: "positive" as const,
    icon: ShoppingBag,
    iconColor: "text-social",
  },
  {
    title: "Profit Margin",
    value: "34.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "text-pricing",
  },
];

const agents = [
  {
    title: "Inventory Agent",
    description: "Tracks stock levels, scans competitor prices, predicts orders",
    status: "active" as const,
    lastAction: "Scanned 234 products on eBay",
    icon: Package,
    color: "text-inventory",
    bgColor: "bg-inventory/10",
    path: "/inventory",
  },
  {
    title: "Customer Service",
    description: "24/7 customer support via WhatsApp, SMS & Telegram",
    status: "active" as const,
    lastAction: "Replied to 12 messages today",
    icon: MessageCircle,
    color: "text-customer",
    bgColor: "bg-customer/10",
    path: "/customer-service",
  },
  {
    title: "Social Media Agent",
    description: "Automated posts on Instagram & Facebook",
    status: "active" as const,
    lastAction: "Scheduled 3 posts for tomorrow",
    icon: Share2,
    color: "text-social",
    bgColor: "bg-social/10",
    path: "/social-media",
  },
  {
    title: "Pricing Agent",
    description: "Dynamic pricing based on competitor analysis",
    status: "active" as const,
    lastAction: "Updated 15 product prices",
    icon: DollarSign,
    color: "text-pricing",
    bgColor: "bg-pricing/10",
    path: "/pricing",
  },
  {
    title: "Accounting Agent",
    description: "Automated bookkeeping, reports & tax reminders",
    status: "active" as const,
    lastAction: "Generated weekly report",
    icon: Calculator,
    color: "text-accounting",
    bgColor: "bg-accounting/10",
    path: "/accounting",
  },

  // ✅ POS / POC PAGE ADDED
  {
    title: "POS System",
    description: "Point of Sale, barcode scanning & checkout",
    status: "active" as const,
    lastAction: "Ready for in-store sales",
    icon: ShoppingBag,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    path: "/pos",
  },

  {
    title: "Analytics",
    description: "Sales insights, trends & performance metrics",
    status: "active" as const,
    lastAction: "Revenue up 12% this week",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    path: "/analytics",
  },
  {
    title: "Loyalty Program",
    description: "Customer rewards & retention system",
    status: "active" as const,
    lastAction: "89 customers enrolled",
    icon: Gift,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    path: "/loyalty",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, Shop Owner 👋
          </h1>
          <p className="text-muted-foreground">
            Your AI assistants have been busy. Here's what's happening today.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-display font-bold text-foreground mb-4"
            >
              Your AI Agents & Features
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent, index) => (
                <AgentCard
                  key={agent.title}
                  {...agent}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ActivityFeed />
            <QuickActions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
