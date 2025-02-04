const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-blue-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-display font-bold mb-6 animate-fadeIn hover:scale-105 transition-transform duration-300">
          Word of God and Salvation Arena
        </h1>
        <p className="text-xl sm:text-2xl mb-8 animate-fadeIn hover:text-secondary transition-colors duration-300">
          Champions Assembly - We Rule Our World
        </p>
        <div className="space-y-4 animate-fadeIn">
          <p className="text-lg hover:text-secondary transition-colors duration-300">Sunday Services: 7:30 AM & 9:00 AM</p>
          <p className="text-lg hover:text-secondary transition-colors duration-300">Location: Lijadu hall, 20a, Lagos road, Iafenwa, Abeokuta, Ogun State</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;