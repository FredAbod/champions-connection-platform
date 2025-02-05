import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const Contact = () => {
  const { toast } = useToast();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('church_contacts')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">Contact Us</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Church Leadership</h3>
              <div className="grid gap-6">
                {isLoading ? (
                  <p>Loading contacts...</p>
                ) : (
                  contacts?.map((contact) => (
                    <Card key={contact.id} className="p-6">
                      <h4 className="text-xl font-bold mb-2">{contact.name}</h4>
                      <p className="font-medium text-primary mb-2">{contact.role}</p>
                      {contact.description && (
                        <p className="text-gray-600 mb-4">{contact.description}</p>
                      )}
                      <div className="space-y-1">
                        {contact.email && (
                          <p className="text-sm">
                            <span className="font-medium">Email:</span> {contact.email}
                          </p>
                        )}
                        {contact.phone && (
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span> {contact.phone}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div>
            <Card className="p-6">
              <h3 className="text-xl font-display font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input id="name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" id="email" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea id="message" required className="min-h-[120px]" />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;