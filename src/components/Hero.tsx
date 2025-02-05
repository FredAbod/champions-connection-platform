
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-800 to-purple-900 text-white overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm"></div>
      
      {/* Animated circles in background */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fadeIn hover:scale-105 transition-transform duration-300 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Word of God and Salvation Arena
        </h1>
        <p className="text-xl sm:text-3xl mb-8 animate-fadeIn hover:text-secondary transition-colors duration-300 font-light">
          Champions Assembly - We Rule Our World
        </p>
        <div className="space-y-4 animate-fadeIn backdrop-blur-sm bg-black/10 p-6 rounded-xl inline-block">
          <p className="text-lg sm:text-xl hover:text-secondary transition-colors duration-300 font-medium">
            Sunday Services: 7:30 AM & 9:00 AM
          </p>
          <p className="text-lg sm:text-xl hover:text-secondary transition-colors duration-300 font-medium">
            Location: Lijadu hall, 20a, Lagos road, Iafenwa, Abeokuta, Ogun State
          </p>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
};

export default Hero;
