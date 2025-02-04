import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import PrayerRequest from "@/components/PrayerRequest";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <PrayerRequest />
    </div>
  );
};

export default Index;