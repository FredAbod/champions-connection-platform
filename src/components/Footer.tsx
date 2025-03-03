
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, ExternalLink, MessageCircle, MapPin, Mail, Clock, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Youtube",
      icon: <Youtube size={20} />,
      url: "https://youtube.com/@ezekiel_innocent?si=6oQTJQatleexSnZw",
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/share/15wLLkjSct/",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://www.facebook.com/share/15wLLkjSct/",
    },
    {
      name: "X (Twitter)",
      icon: <Twitter size={20} />,
      url: "https://x.com/apostleezekielI?t=FJdhfg7pFx5Hlgq9y2Hj6Q&s=09",
    },
    {
      name: "TikTok",
      icon: <ExternalLink size={20} />,
      url: "https://www.tiktok.com/@apstezekiel?_t=ZM-8uMw4qaPNRd&_r=1",
    },
    {
      name: "Telegram",
      icon: <MessageCircle size={20} />,
      url: "https://t.me/apostleezekielinnocent",
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Articles", path: "/articles" },
    { name: "Devotionals", path: "/devotionals" },
    { name: "Prayer Requests", path: "/prayer-requests" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-secondary mb-4">WOGSA</h3>
            <p className="text-gray-300 text-sm">
              Word of God and Salvation Arena is dedicated to bringing people to the knowledge 
              of a glorious, overcoming, wealthy and spirit filled life in Christ.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 
                            hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full inline-block"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-secondary mb-4">Service Times</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Sunday Service</p>
                  <p className="text-gray-300">9:00 AM - 11:30 AM</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Wednesday Bible Study</p>
                  <p className="text-gray-300">6:00 PM - 7:30 PM</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Friday Prayer Meeting</p>
                  <p className="text-gray-300">6:00 PM - 7:30 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-secondary mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-gray-300">
                  1 Ezekiel Innocent Street, Baruwa inside Ipaja, Lagos State, Nigeria
                </p>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-gray-300">+234 803 123 4567</p>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-gray-300">info@wogsa.org</p>
              </li>
            </ul>
            <Button 
              variant="outline" 
              className="mt-4 border-secondary text-secondary hover:bg-secondary hover:text-primary"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} Word of God and Salvation Arena. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
