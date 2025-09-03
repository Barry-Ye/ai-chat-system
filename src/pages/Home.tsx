import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 bg-gray-900  text-white text-center overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center space-y-6 max-w-lg"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    Your <span className="text-blue-600">Medical Health Assistant</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200">
                    Get instant medical suggestions. Start chatting with our virtual doctor now!
                </p>

                <button
                    onClick={() => navigate("/chat")}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-full shadow-lg text-sm md:text-base font-semibold cursor-pointer"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                        alt="chat logo"
                        className="w-6 h-6 md:w-7 md:h-7"
                    />
                    Start Chat
                </button>
            </motion.div>


        </section>

    )
}

export default Home