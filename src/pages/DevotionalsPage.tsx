
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import type { Database } from "@/integrations/supabase/types";

type Devotional = Database['public']['Tables']['daily_devotionals']['Row'];

const DevotionalsPage = () => {
  const { data: devotionals, isLoading } = useQuery({
    queryKey: ['all-devotionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_devotionals')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Devotional[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-center mb-12 text-primary">Daily Devotionals Archive</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full" />
              </Card>
            ))
          ) : (
            devotionals?.map((devotional) => (
              <Card 
                key={devotional.id} 
                className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              >
                <h3 className="text-xl font-display font-bold mb-3 text-primary">{devotional.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{new Date(devotional.date).toLocaleDateString()}</p>
                <p className="italic text-gray-700 mb-4">{devotional.scripture}</p>
                <p className="text-gray-600 mb-4">{devotional.content}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Prayer Points:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {devotional.prayer_points.map((point, index) => (
                      <li key={index} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DevotionalsPage;
