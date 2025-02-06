
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    // Preload the video using document.createElement
    const video = document.createElement('video');
    video.src = "https://asset.cloudinary.com/del59phog/1b206c71fa7b874edcb10007af882eea";
    video.onloadeddata = () => setIsVideoLoaded(true);
    video.onerror = () => setIsVideoError(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      {!isVideoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="/lovable-uploads/60636fa8-e2fc-4103-9965-7ecf95491cec.png"
          onError={() => setIsVideoError(true)}
        >
          <source 
            src="https://asset.cloudinary.com/del59phog/1b206c71fa7b874edcb10007af882eea" 
            type="video/mp4" 
          />
        </video>
      )}

      {/* Fallback Image (shown if video fails to load) */}
      {isVideoError && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("/lovable-uploads/60636fa8-e2fc-4103-9965-7ecf95491cec.png")'
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fadeIn hover:scale-105 transition-transform duration-300 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Word of God and Salvation Arena
        </h1>
        <p className="text-xl sm:text-3xl mb-8 animate-fadeIn hover:text-secondary transition-colors duration-300 font-light">
          Champions Assembly - We Rule Our World
        </p>
        <div className="space-y-4 animate-fadeIn backdrop-blur-sm bg-black/30 p-6 rounded-xl inline-block">
          <p className="text-lg sm:text-xl hover:text-secondary transition-colors duration-300 font-medium">
            Sunday Services: 7:30 AM & 9:00 AM
          </p>
          <p className="text-lg sm:text-xl hover:text-secondary transition-colors duration-300 font-medium">
            Location: Lijadu hall, 20a, Lagos road, Iafenwa, Abeokuta, Ogun State
          </p>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
