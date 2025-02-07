
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDevotionals from "@/pages/admin/AdminDevotionals";
import AdminArticles from "@/pages/admin/AdminArticles";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminPrayerRequests from "@/pages/admin/AdminPrayerRequests";
import About from "@/components/About";
import Articles from "@/components/Articles";
import PrayerRequest from "@/components/PrayerRequest";
import Contact from "@/components/Contact";
import DevotionalsPage from "@/pages/DevotionalsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/devotionals" element={<DevotionalsPage />} />
            <Route path="/prayer-requests" element={<PrayerRequest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/devotionals" element={<AdminDevotionals />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/prayer-requests" element={<AdminPrayerRequests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
