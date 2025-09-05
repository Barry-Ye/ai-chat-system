import React from "react";
import hero from "../assets/hero.jpg";

interface LandingProps {
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing: React.FC<LandingProps> = ({ setIsLoginOpen }) => {
  const companyFlow = [
    {
      title: "Expect top-notch efficiency.",
      description:
        "From meticulous due diligence to quick-witted and sophisticated strategy skills, we are highly competent and dedicated to every client who has placed their trust in us.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135712.png", // yellow rocket
    },
    {
      title: "Expect a client-centred approach",
      description:
        "We are devoted to achieving the best possible results while keeping in mind your bottom line and the impact of everything it has on your life.",
      icon: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", // yellow user group
    },
    {
      title: "Expect a better tomorrow.",
      description:
        "Whatever your situation is, the only thing standing between you and a better legal outcome is a passionate and highly-skilled lawyer on your side. We are committed to being the best legal representation you can have.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // yellow cog
    },
    {
      title: "Expect compassion and true empathy",
      description:
        "No matter what you are going through, we will be committed to your defence and best interest without prejudice. To us, you are a person, and your life is not just a case.",
      icon: "https://cdn-icons-png.flaticon.com/512/893/893257.png", // yellow handshake
    },
    {
      title: "Expect flexibility.",
      description:
        "Maybe you may need all-in legal representation and hand-holding every step along the way. Or perhaps you require just some advice, strategies and drafting. One thing for sure - when the outcome matters, you’ll want us on your side as your ally.",
      icon: "https://cdn-icons-png.flaticon.com/512/2991/2991102.png", // yellow arrows
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-center text-white font-extrabold leading-snug space-y-4 md:space-y-6">
            <span className="block text-3xl md:text-4xl">We Are</span>
            <span className="block text-5xl md:text-6xl">RAVUS LAW CHAMBERS</span>
            <span className="block text-2xl md:text-3xl font-semibold text-gray-200">
              Progressive. Transparent. Strategic.
            </span>
          </h1>

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
              onClick={() => setIsLoginOpen(true)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {companyFlow.map((step, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-850 to-gray-800 text-white p-8 rounded-3xl shadow-lg transform transition-all hover:shadow-2xl hover:-translate-y-2 border border-blue-600 hover:border-transparent"
            >
              {/* Icon in muted circle */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-700 flex items-center justify-center shadow-md">
                <img src={step.icon} alt={step.title} className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>







      </section>
    </div>
  );
};


export default Landing;
