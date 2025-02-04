import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PrayerRequest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prayerRequest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prayer Request Submitted",
      description: "We will keep you in our prayers.",
    });
    setFormData({ name: "", email: "", prayerRequest: "" });
  };

  return (
    <section className="py-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary mb-4">Submit Prayer Request</h2>
          <p className="text-gray-600">
            "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours." - Mark 11:24
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="prayer" className="block text-sm font-medium text-gray-700 mb-1">Prayer Request</label>
              <Textarea
                id="prayer"
                value={formData.prayerRequest}
                onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
                className="min-h-[150px]"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PrayerRequest;