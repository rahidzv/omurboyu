import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Divisions from "./pages/Divisions";
import Staff from "./pages/Staff";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<Index />} />
          <Route path="/faq" element={<Index />} />
           <Route path="/documents" element={<Documents />} />
          <Route path="/resources" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
