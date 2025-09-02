import React from "react";
import logo from "../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        
        {/* Company Info */}
        <div className="w-full md:w-[30%]">
          <div className="flex items-center mb-3">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto"   // ✅ smaller logo
            />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            MedAI is your trusted medical AI assistant, providing intelligent and
            reliable suggestions to help you manage health efficiently.
          </p>
        </div>

        {/* Services */}
        <div className="w-full md:w-[30%]">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="#consultation" className="hover:text-yellow-500 transition">AI Consultation</a></li>
            <li><a href="#symptoms" className="hover:text-yellow-500 transition">Symptom Analysis</a></li>
            <li><a href="#chatbot" className="hover:text-yellow-500 transition">Chatbot Integration</a></li>
            <li><a href="#support" className="hover:text-yellow-500 transition">Customer Support AI</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-[30%]">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-yellow-500 transition">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-500 transition">About</a></li>
            <li><a href="#services" className="hover:text-yellow-500 transition">Services</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Ravus Law Chambers LLC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
