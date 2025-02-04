import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import PrayerRequest from "@/components/PrayerRequest";
import Devotionals from "@/components/Devotionals";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <Devotionals />
      <PrayerRequest />
    </div>
  );
};

export default Index;