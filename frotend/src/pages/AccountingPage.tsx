import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Calendar,
  PoundSterling,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { day: 'Mon', revenue: 420, expenses: 180 },
  { day: 'Tue', revenue: 380, expenses: 150 },
  { day: 'Wed', revenue: 510, expenses: 200 },
  { day: 'Thu', revenue: 450, expenses: 170 },
  { day: 'Fri', revenue: 620, expenses: 220 },
  { day: 'Sat', revenue: 780, expenses: 280 },
  { day: 'Sun', revenue: 540, expenses: 190 },
];

const recentTransactions = [
  { id: 1, type: 'income', description: 'Daily sales', amount: 456.80, date: 'Today' },
  { id: 2, type: 'expense', description: 'Milk supplier payment', amount: 120.00, date: 'Today' },
  { id: 3, type: 'expense', description: 'Electricity bill', amount: 85.50, date: 'Yesterday' },
  { id: 4, type: 'income', description: 'Daily sales', amount: 512.30, date: 'Yesterday' },
  { id: 5, type: 'expense', description: 'Bakery supplies', amount: 230.00, date: '2 days ago' },
];

const upcomingReminders = [
  { id: 1, title: 'VAT Return Due', date: 'In 5 days', priority: 'high' },
  { id: 2, title: 'Supplier Invoice', date: 'In 7 days', priority: 'medium' },
  { id: 3, title: 'Quarterly Review', date: 'In 12 days', priority: 'low' },
];

export default function AccountingPage() {
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
              <div className="p-2 rounded-lg bg-accounting/10">
                <Calculator className="w-6 h-6 text-accounting" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Accounting Agent
              </h1>
              <Badge className="bg-green-100 text-green-700">AI Active</Badge>
            </div>
            <p className="text-muted-foreground">
              Automated bookkeeping, reports & tax reminders
            </p>
          </div>
          <Button className="gap-2 bg-accounting hover:bg-accounting/90">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Weekly Revenue"
            value="£3,700"
            change="+15%"
            changeType="positive"
            icon={PoundSterling}
            iconColor="text-accounting"
            delay={0}
          />
          <StatCard
            title="Weekly Expenses"
            value="£1,390"
            change="-8%"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-green-500"
            delay={0.1}
          />
          <StatCard
            title="Net Profit"
            value="£2,310"
            change="+22%"
            changeType="positive"
            icon={FileText}
            iconColor="text-primary"
            delay={0.2}
          />
          <StatCard
            title="Pending Invoices"
            value="3"
            change="£450"
            changeType="neutral"
            icon={Calendar}
            iconColor="text-pricing"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 stat-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">Revenue vs Expenses</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accounting" />
                  Revenue
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  Expenses
                </div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `£${value}`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`£${value}`, '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(262, 83%, 58%)" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(0, 84%, 60%)" 
                    fillOpacity={1} 
                    fill="url(#colorExpenses)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-pricing" />
              <h3 className="font-display font-bold text-foreground">Upcoming</h3>
            </div>
            
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-3 rounded-lg border ${
                    reminder.priority === 'high' 
                      ? 'border-red-200 bg-red-50' 
                      : reminder.priority === 'medium'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground text-sm">{reminder.title}</p>
                    <Badge 
                      variant="outline"
                      className={
                        reminder.priority === 'high' ? 'border-red-500 text-red-600' :
                        reminder.priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                        ''
                      }
                    >
                      {reminder.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card mt-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-foreground">Recent Transactions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{transaction.description}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className={`py-3 px-4 text-right font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}£{transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
