
const Leadership = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary hover:text-secondary transition-colors duration-300">Our Leadership</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-[500px] relative group">
              <img 
                src="/lovable-uploads/224f7c41-7e27-49ba-b9ee-44785449d3d4.png"
                alt="Apostle Ezekiel Innocent"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>
            <div className="p-6 transform transition-transform duration-300">
              <h3 className="text-2xl font-display font-bold mb-2 text-primary hover:text-secondary transition-colors">Apostle Ezekiel Innocent</h3>
              <p className="text-gray-600 mb-4 animate-fade-in">Senior Pastor</p>
              <p className="text-gray-600 animate-fade-in">
                Leading WOGSA with divine wisdom and guidance, Apostle Ezekiel Innocent has been instrumental in bringing the vision of the church to life since its inception.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
