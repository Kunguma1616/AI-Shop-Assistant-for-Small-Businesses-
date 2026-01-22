import { motion } from "framer-motion";
import { 
  Package, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingCart,
  RefreshCw,
  Plus,
  BarChart3,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const inventoryItems = [
  { id: 1, name: "Organic Milk 1L", sku: "OM-001", stock: 3, minStock: 10, price: "£2.50", status: "low", source: "Local Dairy" },
  { id: 2, name: "Sourdough Bread", sku: "SB-002", stock: 15, minStock: 8, price: "£3.20", status: "ok", source: "Baker Joe's" },
  { id: 3, name: "Free Range Eggs (12)", sku: "FE-003", stock: 24, minStock: 15, price: "£4.50", status: "ok", source: "Farm Fresh" },
  { id: 4, name: "Artisan Coffee Beans 250g", sku: "AC-004", stock: 5, minStock: 10, price: "£8.99", status: "low", source: "Costa Rica Direct" },
  { id: 5, name: "Organic Honey 340g", sku: "OH-005", stock: 18, minStock: 6, price: "£6.50", status: "ok", source: "Local Apiary" },
  { id: 6, name: "Fresh Orange Juice 1L", sku: "OJ-006", stock: 2, minStock: 12, price: "£3.80", status: "critical", source: "Tropicana" },
];

const priceScanResults = [
  { product: "Organic Milk 1L", yourPrice: "£2.50", ebay: "£2.80", amazon: "£3.10", facebook: "£2.40", profit: "+15%" },
  { product: "Sourdough Bread", yourPrice: "£3.20", ebay: "N/A", amazon: "£4.50", facebook: "£3.00", profit: "+8%" },
  { product: "Coffee Beans 250g", yourPrice: "£8.99", ebay: "£9.50", amazon: "£10.99", facebook: "£8.50", profit: "+12%" },
];

export default function InventoryPage() {
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
              <div className="p-2 rounded-lg bg-inventory/10">
                <Package className="w-6 h-6 text-inventory" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Inventory Agent
              </h1>
              <Badge className="bg-green-100 text-green-700">AI Active</Badge>
            </div>
            <p className="text-muted-foreground">
              Track stock, scan prices across eBay, Amazon, Facebook & more
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Scan Prices
            </Button>
            <Button className="gap-2 bg-inventory hover:bg-inventory/90">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value="234"
            icon={Package}
            iconColor="text-inventory"
            delay={0}
          />
          <StatCard
            title="Low Stock Items"
            value="12"
            change="Alert"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="text-yellow-500"
            delay={0.1}
          />
          <StatCard
            title="Price Scans Today"
            value="1,847"
            change="+234"
            changeType="positive"
            icon={Search}
            iconColor="text-primary"
            delay={0.2}
          />
          <StatCard
            title="Avg. Profit Margin"
            value="28.5%"
            change="+3.2%"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-green-500"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 stat-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">Current Stock</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Product</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">SKU</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Stock</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.source}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.sku}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${item.stock < item.minStock ? 'text-red-500' : 'text-foreground'}`}>
                          {item.stock}
                        </span>
                        <span className="text-muted-foreground">/{item.minStock}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">{item.price}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            item.status === 'critical' ? 'bg-red-100 text-red-700' :
                            item.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }
                        >
                          {item.status === 'critical' ? 'Critical' : item.status === 'low' ? 'Low Stock' : 'In Stock'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Price Scanner Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-pricing" />
              <h3 className="font-display font-bold text-foreground">Price Scanner</h3>
            </div>
            
            <div className="space-y-4">
              {priceScanResults.map((result, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground text-sm">{result.product}</p>
                    <Badge className="bg-green-100 text-green-700">{result.profit}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your Price:</span>
                      <span className="font-medium text-foreground">{result.yourPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">eBay:</span>
                      <span className="font-medium text-foreground">{result.ebay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amazon:</span>
                      <span className="font-medium text-foreground">{result.amazon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">FB Market:</span>
                      <span className="font-medium text-foreground">{result.facebook}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 gap-2">
              <ShoppingCart className="w-4 h-4" />
              View All Scans
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
