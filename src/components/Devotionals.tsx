
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Devotional = Database['public']['Tables']['daily_devotionals']['Row'];

const Devotionals = () => {
  const { data: devotionals, isLoading } = useQuery({
    queryKey: ['devotionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_devotionals')
        .select('*')
        .order('date', { ascending: false })
        .limit(2);
      
      if (error) throw error;
      return data as Devotional[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-20 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">Daily Devotionals</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {devotionals?.map((devotional) => (
            <Card key={devotional.id} className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
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
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/devotionals">
            <Button 
              variant="secondary"
              className="group transform transition-all duration-300 hover:scale-105"
            >
              View Previous Devotionals
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Devotionals;
