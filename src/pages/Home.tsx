
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 bg-gray-900 text-white text-center overflow-hidden">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center space-y-6 max-w-3xl"
            >
                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
                    Your Strongest Legal Voice in Times of Injury
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                    Personal injuries can happen anywhere — on the road, at work, or in public spaces.
                    They may result from negligence, carelessness, or even malicious acts.
                </p>

                {/* Supporting sentence */}
                <p className="text-gray-300 text-base md:text-lg italic">
                    Whether it’s a motor accident, a workplace grievance, or an unexpected harm from a stranger,
                    we see it as our duty to stand by your side and be your most powerful legal voice.
                </p>

                {/* Call-to-action button */}
                <Button
                    variant="contained"
                    onClick={() => navigate("/chat")}
                    startIcon={<ChatIcon />}   // 👈 icon on the left
                    className="!bg-gray-700 !text-white 
             !rounded-full !shadow-2xl !px-10 !py-5 
             !text-xl font-bold tracking-wide
             hover:!bg-gray-800 
             active:scale-95 
             transition-all duration-200"
                >
                    Get Legal Help
                </Button>
            </motion.div>
        </section>
    );
};

export default Home;
