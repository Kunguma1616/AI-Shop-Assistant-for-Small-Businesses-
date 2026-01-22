import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  RefreshCw,
  Store,
  ArrowRight,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const competitorPrices = [
  { 
    product: "Whole Milk 2L", 
    yourPrice: 2.20, 
    tesco: 1.85, 
    sainsburys: 1.90, 
    aldi: 1.69,
    suggestion: "decrease",
    suggestedPrice: 2.00,
  },
  { 
    product: "Artisan Bread Loaf", 
    yourPrice: 3.50, 
    tesco: 2.80, 
    sainsburys: 3.00, 
    aldi: null,
    suggestion: "keep",
    suggestedPrice: 3.50,
  },
  { 
    product: "Orange Juice 1L", 
    yourPrice: 2.80, 
    tesco: 3.20, 
    sainsburys: 3.10, 
    aldi: 2.49,
    suggestion: "increase",
    suggestedPrice: 3.00,
  },
  { 
    product: "Free Range Eggs (6)", 
    yourPrice: 2.50, 
    tesco: 2.45, 
    sainsburys: 2.60, 
    aldi: 2.19,
    suggestion: "keep",
    suggestedPrice: 2.50,
  },
];

const dynamicPricingRules = [
  { id: 1, name: "Happy Hour Coffee", condition: "3PM - 5PM", discount: "20% off", active: true },
  { id: 2, name: "End of Day Bakery", condition: "After 6PM", discount: "30% off", active: true },
  { id: 3, name: "Weekend Special", condition: "Sat & Sun", discount: "10% off orders > £20", active: false },
];

export default function PricingPage() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-pricing/10">
                <DollarSign className="w-6 h-6 text-pricing" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Pricing Agent
              </h1>
              <Badge className="bg-green-100 text-green-700">AI Active</Badge>
            </div>
            <p className="text-muted-foreground">
              Competitor analysis & dynamic pricing to maximize profits
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Scan Competitors
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Price Competitiveness"
            value="87%"
            change="+5%"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-pricing"
            delay={0}
          />
          <StatCard
            title="Products Below Market"
            value="23"
            icon={TrendingDown}
            iconColor="text-green-500"
            delay={0.1}
          />
          <StatCard
            title="Products Above Market"
            value="8"
            change="Review"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="text-red-500"
            delay={0.2}
          />
          <StatCard
            title="Est. Revenue Impact"
            value="+£320"
            change="/week"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-primary"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competitor Price Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 stat-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">Competitor Analysis</h3>
              <p className="text-xs text-muted-foreground">Last updated: 5 min ago</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Product</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Your Price</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                      <div className="flex items-center justify-center gap-1">
                        <Store className="w-3 h-3" />
                        Tesco
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Sainsbury's</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Aldi</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">AI Suggestion</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorPrices.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{item.product}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-foreground">£{item.yourPrice.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4 text-center text-muted-foreground">
                        £{item.tesco.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center text-muted-foreground">
                        £{item.sainsburys.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center text-muted-foreground">
                        {item.aldi ? `£${item.aldi.toFixed(2)}` : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {item.suggestion === 'decrease' && (
                            <Badge className="bg-red-100 text-red-700 gap-1">
                              <ArrowDown className="w-3 h-3" />
                              £{item.suggestedPrice.toFixed(2)}
                            </Badge>
                          )}
                          {item.suggestion === 'increase' && (
                            <Badge className="bg-green-100 text-green-700 gap-1">
                              <ArrowUp className="w-3 h-3" />
                              £{item.suggestedPrice.toFixed(2)}
                            </Badge>
                          )}
                          {item.suggestion === 'keep' && (
                            <Badge className="bg-gray-100 text-gray-700">
                              Keep
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button className="gap-2 bg-pricing hover:bg-pricing/90">
                Apply All Suggestions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Dynamic Pricing Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <h3 className="font-display font-bold text-foreground mb-4">Dynamic Pricing Rules</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Automated price adjustments based on time and conditions
            </p>
            
            <div className="space-y-4">
              {dynamicPricingRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-lg border ${
                    rule.active ? 'border-pricing/30 bg-pricing/5' : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{rule.name}</p>
                    <Badge 
                      variant="outline"
                      className={rule.active ? 'border-green-500 text-green-600' : ''}
                    >
                      {rule.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{rule.condition}</p>
                  <p className="text-sm font-semibold text-pricing">{rule.discount}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 gap-2">
              <DollarSign className="w-4 h-4" />
              Add Pricing Rule
            </Button>
            
            {/* Profit Optimization Score */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Profit Optimization</p>
                <span className="text-sm font-bold text-pricing">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Apply 3 more suggestions to reach 90%
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
