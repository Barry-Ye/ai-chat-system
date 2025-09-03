import React from "react";
import hero from "../assets/hero.jpg"; // correct hero image path
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login'); // navigate to login page
  };

  // Example company flow steps
  const companyFlow = [
    {
      title: "Expect top-notch efficiency.",
      description: "From meticulous due diligence to quick- witted and sophisticated strategy skills, we are highly competent and dedicated to every client who has placed their trust in us					",
    },
    {
      title: "Expect a client-centred approach",
      description: "We are devoted to achieving the best possible results while keeping in mind your bottom line and the impact of everything it has on your life.",
    },
    {
      title: "Expect a better tomorrow.",
      description: "Whatever your situation is, the only thing standing between you and a better legal outcome is a passionate and highly-skilled lawyer on your side. We are committed to being the best legal representation you can have.",
    },
    {
      title: "Expect compassion and true empathy",
      description: "No matter what you are going through, we will be committed to your defence and best interest without prejudice.To us, you are a person, and your life is not just a case.					",
    },
    {
      title: "Expect flexibility.",
      description: "Maybe you may need all-in legal representation and hand - holding every step along the way.Or perhaps you require just some advice, strategies and drafting.One thing for sure - when the outcome matters, you’ll want us on your side as your ally."
    },
  ];

  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            PROFESSIONAL <span className="text-blue-500">CHAMBERS</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-gray-200">
            Progressive • Transparent • Strategic
          </p>
          <div className="mt-8 max-w-3xl mx-auto text-center">
            <p className="text-white italic font-semibold text-xl md:text-2xl tracking-wide border-b-2 border-blue-500 inline-block pb-1">
              We cannot rewrite yesterday, but we can have your back tomorrow.
            </p>
          </div>
          <p className="mt-6 text-lg text-gray-100 leading-relaxed">
            Life brings challenges and choices. The decisions you make now will shape
            what comes next.
          </p>
          <p className="mt-2 text-lg text-gray-100 leading-relaxed">
            We help you set priorities, resolve concerns, and move forward with
            clarity.
          </p>
          <div className="mt-8">
            <button
              onClick={handleClick}
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Company Flow Section */}
      <section className="py-20 px-6 md:px-16 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Our Company Flow
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            From consultation to execution, we make sure every step is seamless.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {companyFlow.map((step, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
