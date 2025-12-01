import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Detections from "./pages/Detections";
import Incidents from "./pages/Incidents";
import Intelligence from "./pages/Intelligence";
import Malware from "./pages/Malware";
import VulnerabilityAssessment from "./pages/VulnerabilityAssessment";
import Response from "./pages/Response";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/detections" element={<Detections />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/malware" element={<Malware />} />
            <Route path="/vulnerability" element={<VulnerabilityAssessment />} />
            <Route path="/response" element={<Response />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
