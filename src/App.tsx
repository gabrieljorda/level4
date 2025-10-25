import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientRegister from "./pages/client/ClientRegister";
import ClientLogin from "./pages/client/ClientLogin";
import ClientSchedule from "./pages/client/ClientSchedule";
import ClientProfile from "./pages/client/ClientProfile";
import ClientPlans from "./pages/client/ClientPlans";
import BarbershopRegister from "./pages/barbershop/BarbershopRegister";
import BarbershopLogin from "./pages/barbershop/BarbershopLogin";
import BarbershopDashboard from "./pages/barbershop/BarbershopDashboard";
import BarbershopAppointments from "./pages/barbershop/BarbershopAppointments";
import BarbershopProfile from "./pages/barbershop/BarbershopProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Client Routes */}
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/schedule" element={<ClientSchedule />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/plans" element={<ClientPlans />} />
          
          {/* Barbershop Routes */}
          <Route path="/barbershop/register" element={<BarbershopRegister />} />
          <Route path="/barbershop/login" element={<BarbershopLogin />} />
          <Route path="/barbershop/dashboard" element={<BarbershopDashboard />} />
          <Route path="/barbershop/appointments" element={<BarbershopAppointments />} />
          <Route path="/barbershop/profile" element={<BarbershopProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
