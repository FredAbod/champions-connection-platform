const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">About WOGSA</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">Our Vision</h3>
            <p className="text-gray-600">
              Bringing people to the knowledge of a glorious, overcoming, wealthy and spirit filled life in Christ.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-gray-600">
              To raise a generation of those who seek to do the will of God; advancing the kingdom of our father.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">Our Desire</h3>
            <p className="text-gray-600">
              To bring believers to the knowledge of the finished work of Christ on the cross.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;