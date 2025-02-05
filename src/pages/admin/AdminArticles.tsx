import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const AdminArticles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createArticle = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("articles").insert([
        {
          title,
          description,
          content,
          image_url: imageUrl,
        },
      ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Success", description: "Article created successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to create article", 
        variant: "destructive" 
      });
      console.error("Error creating article:", error);
    },
  });

  const updateArticle = useMutation({
    mutationFn: async () => {
      if (!editingId) return;
      const { error } = await supabase
        .from("articles")
        .update({
          title,
          description,
          content,
          image_url: imageUrl,
        })
        .eq('id', editingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Success", description: "Article updated successfully" });
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to update article", 
        variant: "destructive" 
      });
      console.error("Error updating article:", error);
    },
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Success", description: "Article deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to delete article", 
        variant: "destructive" 
      });
      console.error("Error deleting article:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateArticle.mutate();
    } else {
      createArticle.mutate();
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    setContent(article.content);
    setImageUrl(article.image_url);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setContent("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8 text-primary">Manage Articles</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              {editingId ? "Edit Article" : "Add New Article"}
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
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Update Article" : "Add Article"}
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
            <h2 className="text-xl font-display font-bold mb-4">Recent Articles</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              articles?.map((article) => (
                <Card key={article.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{article.title}</h3>
                      <p className="text-sm text-gray-500">{article.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(article)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteArticle.mutate(article.id)}
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

export default AdminArticles;