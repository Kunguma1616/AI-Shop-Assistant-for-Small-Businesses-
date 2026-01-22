import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  MessageCircle,
  Share2,
  DollarSign,
  Calculator,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  Bot,
} from "lucide-react";

const navItems = [
  { 
    path: "/", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    color: "text-primary"
  },
  { 
    path: "/inventory", 
    label: "Inventory Agent", 
    icon: Package,
    color: "text-inventory",
    badge: "AI"
  },
  { 
    path: "/customer-service", 
    label: "Customer Service", 
    icon: MessageCircle,
    color: "text-customer",
    badge: "AI"
  },
  { 
    path: "/social-media", 
    label: "Social Media", 
    icon: Share2,
    color: "text-social",
    badge: "AI"
  },
  { 
    path: "/pricing", 
    label: "Pricing Agent", 
    icon: DollarSign,
    color: "text-pricing",
    badge: "AI"
  },
  { 
    path: "/accounting", 
    label: "Accounting", 
    icon: Calculator,
    color: "text-accounting",
    badge: "AI"
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground z-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <Store className="w-6 h-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <h1 className="font-display font-bold text-lg leading-tight">ShopAI</h1>
            <p className="text-xs text-sidebar-foreground/60">Assistant</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`sidebar-item ${isActive ? "active" : ""} ${
                  collapsed ? "justify-center px-2" : ""
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : item.color}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* AI Status */}
      <div className={`p-4 border-t border-sidebar-border ${collapsed ? "text-center" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="relative">
            <Bot className="w-8 h-8 text-primary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar animate-pulse" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">5 Agents Active</p>
              <p className="text-xs text-sidebar-foreground/60">All systems online</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings & Collapse */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          to="/settings"
          className={`sidebar-item ${collapsed ? "justify-center px-2" : ""}`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`sidebar-item w-full ${collapsed ? "justify-center px-2" : ""}`}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
