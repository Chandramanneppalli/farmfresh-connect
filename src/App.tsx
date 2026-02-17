import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import AppShell from "@/components/AppShell";

import Welcome from "./pages/Welcome";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerClimate from "./pages/farmer/FarmerClimate";
import FarmerPricing from "./pages/farmer/FarmerPricing";
import FarmerQualityScan from "./pages/farmer/FarmerQualityScan";

import ConsumerHome from "./pages/consumer/ConsumerHome";
import ProductDetail from "./pages/consumer/ProductDetail";
import ConsumerCart from "./pages/consumer/ConsumerCart";
import ConsumerOrders from "./pages/consumer/ConsumerOrders";

import AdminDashboard from "./pages/admin/AdminDashboard";

import ChatPage from "./pages/shared/ChatPage";
import TraceLot from "./pages/TraceLot";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth */}
            <Route path="/" element={<Welcome />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Farmer */}
            <Route path="/farmer" element={<AppShell><FarmerDashboard /></AppShell>} />
            <Route path="/farmer/products" element={<AppShell><FarmerProducts /></AppShell>} />
            <Route path="/farmer/orders" element={<AppShell><FarmerOrders /></AppShell>} />
            <Route path="/farmer/climate" element={<AppShell><FarmerClimate /></AppShell>} />
            <Route path="/farmer/pricing" element={<AppShell><FarmerPricing /></AppShell>} />
            <Route path="/farmer/chat" element={<AppShell><ChatPage /></AppShell>} />
            <Route path="/farmer/scan" element={<AppShell><FarmerQualityScan /></AppShell>} />

            {/* Consumer */}
            <Route path="/consumer" element={<AppShell><ConsumerHome /></AppShell>} />
            <Route path="/consumer/browse" element={<AppShell><ConsumerHome /></AppShell>} />
            <Route path="/consumer/product/:id" element={<AppShell><ProductDetail /></AppShell>} />
            <Route path="/consumer/cart" element={<AppShell><ConsumerCart /></AppShell>} />
            <Route path="/consumer/orders" element={<AppShell><ConsumerOrders /></AppShell>} />
            <Route path="/consumer/chat" element={<AppShell><ChatPage /></AppShell>} />

            {/* Admin */}
            <Route path="/admin" element={<AppShell><AdminDashboard /></AppShell>} />
            <Route path="/admin/users" element={<AppShell><AdminDashboard /></AppShell>} />
            <Route path="/admin/revenue" element={<AppShell><AdminDashboard /></AppShell>} />
            <Route path="/admin/disputes" element={<AppShell><AdminDashboard /></AppShell>} />
            <Route path="/admin/settings" element={<AppShell><AdminDashboard /></AppShell>} />

            {/* Traceability */}
            <Route path="/trace/:lotId" element={<TraceLot />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
