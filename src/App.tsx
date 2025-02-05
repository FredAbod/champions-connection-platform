import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDevotionals from "@/pages/admin/AdminDevotionals";
import AdminArticles from "@/pages/admin/AdminArticles";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminPrayerRequests from "@/pages/admin/AdminPrayerRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/devotionals" element={<AdminDevotionals />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/prayer-requests" element={<AdminPrayerRequests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;