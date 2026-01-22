import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, Database, Key, Globe } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-muted">
              <Settings className="w-6 h-6 text-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Settings
            </h1>
          </div>
          <p className="text-muted-foreground">
            Configure your AI Shop Assistant
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Shop Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-foreground">Shop Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Shop Name</Label>
                <Input defaultValue="Corner Delights" />
              </div>
              <div className="space-y-2">
                <Label>Business Type</Label>
                <Input defaultValue="Café & Grocery" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue="hello@cornerdelights.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+44 7700 900000" />
              </div>
            </div>
          </motion.div>

          {/* API Connections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-5 h-5 text-pricing" />
              <h2 className="font-display font-bold text-foreground">API Connections</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'WhatsApp Business', connected: true, icon: '💬' },
                { name: 'Telegram Bot', connected: true, icon: '📱' },
                { name: 'Instagram Graph API', connected: true, icon: '📸' },
                { name: 'Wave Accounting', connected: false, icon: '📊' },
                { name: 'eBay API', connected: true, icon: '🛒' },
              ].map((api) => (
                <div key={api.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{api.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{api.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {api.connected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button variant={api.connected ? "outline" : "default"} size="sm">
                    {api.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-customer" />
              <h2 className="font-display font-bold text-foreground">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Low stock alerts', description: 'Get notified when inventory is running low', defaultChecked: true },
                { title: 'Daily sales report', description: 'Receive daily summary of sales', defaultChecked: true },
                { title: 'Customer messages', description: 'Notifications for new customer inquiries', defaultChecked: true },
                { title: 'Price change alerts', description: 'When competitors change their prices', defaultChecked: false },
              ].map((notification) => (
                <div key={notification.title} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch defaultChecked={notification.defaultChecked} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
