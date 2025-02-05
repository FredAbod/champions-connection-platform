import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const AdminContacts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("church_contacts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createContact = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("church_contacts").insert([
        {
          name,
          role,
          phone,
          email,
          description,
        },
      ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast({ title: "Success", description: "Contact created successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to create contact", 
        variant: "destructive" 
      });
      console.error("Error creating contact:", error);
    },
  });

  const updateContact = useMutation({
    mutationFn: async () => {
      if (!editingId) return;
      const { error } = await supabase
        .from("church_contacts")
        .update({
          name,
          role,
          phone,
          email,
          description,
        })
        .eq('id', editingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast({ title: "Success", description: "Contact updated successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to update contact", 
        variant: "destructive" 
      });
      console.error("Error updating contact:", error);
    },
  });

  const deleteContact = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("church_contacts")
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast({ title: "Success", description: "Contact deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to delete contact", 
        variant: "destructive" 
      });
      console.error("Error deleting contact:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateContact.mutate();
    } else {
      createContact.mutate();
    }
  };

  const handleEdit = (contact: any) => {
    setEditingId(contact.id);
    setName(contact.name);
    setRole(contact.role);
    setPhone(contact.phone || "");
    setEmail(contact.email || "");
    setDescription(contact.description || "");
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setPhone("");
    setEmail("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8 text-primary">Manage Church Contacts</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              {editingId ? "Edit Contact" : "Add New Contact"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Update Contact" : "Add Contact"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
          
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold mb-4">Current Contacts</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              contacts?.map((contact) => (
                <Card key={contact.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{contact.name}</h3>
                      <p className="text-sm font-medium text-gray-600">{contact.role}</p>
                      {contact.email && (
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(contact)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteContact.mutate(contact.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;