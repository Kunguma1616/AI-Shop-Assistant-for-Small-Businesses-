import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Supabase client
import { supabase } from "./supabaseClient";

// Import all pages
import Index from "./pages/Index";
import POSPage from "./pages/POSPage"; // ✅ ADD THIS
import InventoryPage from "./pages/InventoryPage";
import CustomerServicePage from "./pages/CustomerServicePage";
import SocialMediaPage from "./pages/SocialMediaPage";
import PricingPage from "./pages/PricingPage";
import AccountingPage from "./pages/AccountingPage";
import SettingsPage from "./pages/SettingsPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Test Supabase connection on app load
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Supabase connection error:", error);
        } else {
          console.log("✅ Supabase connected successfully");
          console.log("📊 Session data:", data);
        }
      } catch (err) {
        console.error("❌ Supabase initialization error:", err);
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<Index />} />

            {/* ✅ POS PAGE */}
            <Route path="/pos" element={<POSPage />} />

            {/* Agent Pages */}
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/customer-service" element={<CustomerServicePage />} />
            <Route path="/social-media" element={<SocialMediaPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/accounting" element={<AccountingPage />} />

            {/* Additional Features */}
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/loyalty" element={<LoyaltyPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* 404 Catch-All Route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
