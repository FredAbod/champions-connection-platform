import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Articles = () => {
  const articles = [
    {
      title: "Walking in Divine Grace",
      description: "Understanding the power of God's grace in our daily lives",
      date: "March 15, 2024",
      imageUrl: "/lovable-uploads/a816f483-6043-4cf4-9712-089bb6e58837.png"
    },
    {
      title: "The Power of Prayer",
      description: "Discovering the transformative power of consistent prayer",
      date: "March 14, 2024",
      imageUrl: "/lovable-uploads/224f7c41-7e27-49ba-b9ee-44785449d3d4.png"
    },
    {
      title: "Living a Spirit-Filled Life",
      description: "Practical steps to maintain a spirit-filled Christian life",
      date: "March 13, 2024",
      imageUrl: "/lovable-uploads/a816f483-6043-4cf4-9712-089bb6e58837.png"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">Latest Articles</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-display">{article.title}</CardTitle>
                <CardDescription>{article.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{article.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;