import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import PrayerRequest from "./components/PrayerRequest";
import Devotionals from "./components/Devotionals";
import About from "./components/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDevotionals from "./pages/admin/AdminDevotionals";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminContacts from "./pages/admin/AdminContacts";

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
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prayer-requests" element={<PrayerRequest />} />
          <Route path="/devotionals" element={<Devotionals />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/devotionals" element={<AdminDevotionals />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;