import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8 text-primary">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/devotionals">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-display font-bold mb-2">Daily Devotionals</h2>
              <p className="text-gray-600">Manage daily devotional content</p>
            </Card>
          </Link>
          
          <Link to="/admin/articles">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-display font-bold mb-2">Articles</h2>
              <p className="text-gray-600">Manage church articles and blog posts</p>
            </Card>
          </Link>
          
          <Link to="/admin/contacts">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-display font-bold mb-2">Church Contacts</h2>
              <p className="text-gray-600">Manage church leadership contacts</p>
            </Card>
          </Link>

          <Link to="/admin/prayer-requests">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-display font-bold mb-2">Prayer Requests</h2>
              <p className="text-gray-600">View submitted prayer requests</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;