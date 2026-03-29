import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ToolsLanding from "./pages/ToolsLanding";
import ProcessAssessment from "./pages/ProcessAssessment";
import PortfolioMap from "./pages/PortfolioMap";
import OversightCompass from "./pages/OversightCompass";
import Unsubscribe from "./pages/Unsubscribe";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tyokalut" element={<ToolsLanding />} />
          <Route path="/tyokalut/prosessiarviointi" element={<ProcessAssessment />} />
          <Route path="/tyokalut/portfoliokartta" element={<PortfolioMap />} />
          <Route path="/tyokalut/valvontakompassi" element={<OversightCompass />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
