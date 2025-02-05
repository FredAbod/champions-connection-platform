import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const AdminDevotionals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [scripture, setScripture] = useState("");
  const [content, setContent] = useState("");
  const [prayerPoints, setPrayerPoints] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: devotionals, isLoading } = useQuery({
    queryKey: ["devotionals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_devotionals")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createDevotional = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("daily_devotionals").insert([
        {
          title,
          scripture,
          content,
          prayer_points: prayerPoints.split("\n").filter(point => point.trim()),
        },
      ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devotionals"] });
      toast({ title: "Success", description: "Devotional created successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to create devotional", 
        variant: "destructive" 
      });
      console.error("Error creating devotional:", error);
    },
  });

  const updateDevotional = useMutation({
    mutationFn: async () => {
      if (!editingId) return;
      const { error } = await supabase
        .from("daily_devotionals")
        .update({
          title,
          scripture,
          content,
          prayer_points: prayerPoints.split("\n").filter(point => point.trim()),
        })
        .eq('id', editingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devotionals"] });
      toast({ title: "Success", description: "Devotional updated successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to update devotional", 
        variant: "destructive" 
      });
      console.error("Error updating devotional:", error);
    },
  });

  const deleteDevotional = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("daily_devotionals")
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devotionals"] });
      toast({ title: "Success", description: "Devotional deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to delete devotional", 
        variant: "destructive" 
      });
      console.error("Error deleting devotional:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateDevotional.mutate();
    } else {
      createDevotional.mutate();
    }
  };

  const handleEdit = (devotional: any) => {
    setEditingId(devotional.id);
    setTitle(devotional.title);
    setScripture(devotional.scripture);
    setContent(devotional.content);
    setPrayerPoints(devotional.prayer_points.join("\n"));
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setScripture("");
    setContent("");
    setPrayerPoints("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8 text-primary">Manage Daily Devotionals</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              {editingId ? "Edit Devotional" : "Add New Devotional"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Scripture</label>
                <Input
                  value={scripture}
                  onChange={(e) => setScripture(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[200px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prayer Points (one per line)</label>
                <Textarea
                  value={prayerPoints}
                  onChange={(e) => setPrayerPoints(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Update Devotional" : "Add Devotional"}
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
            <h2 className="text-xl font-display font-bold mb-4">Recent Devotionals</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              devotionals?.map((devotional) => (
                <Card key={devotional.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{devotional.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(devotional.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(devotional)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteDevotional.mutate(devotional.id)}
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

export default AdminDevotionals;