import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

// import your animation JSON
import medical from "../assets/medical.json";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left min-h-[80vh] px-4 md:px-12 pt-16 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex flex-col items-center md:items-start"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your <span className="text-yellow-600">Medical AI Assistant</span>
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-6 max-w-md">
          Get AI-powered medical suggestions instantly. Click below to start
          chatting!
        </p>

        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-sm text-sm font-medium"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="chat logo"
            className="w-6 h-6"
          />
          Ask AI
        </button>
      </motion.div>

      {/* Right Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 mb-8 md:mb-0"
      >
        <Lottie
          animationData={medical}
          className="w-full h-[300px] md:h-[450px]"
        />
      </motion.div>

      {/* Decorative background circles */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-[300px] h-[300px] bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 -z-10 w-[250px] h-[250px] bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
};

export default Landing;
