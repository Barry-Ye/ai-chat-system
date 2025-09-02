import React from "react";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/landing");
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <div className="flex-1 flex flex-col">
          {/* Back Button to Landing Page */}
          <button
            onClick={handleBackClick}
            className="flex items-center p-2 mb-4 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span className="font-medium">Back to </span>
          </button>

          <div className="flex items-center mb-4">
            <span className="text-xl font-bold text-gray-200">New Chat</span>
            <button className="ml-auto p-2 rounded-full hover:bg-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-2 overflow-y-auto">
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <span className="truncate">
                Conversation about a new topic...
              </span>
            </a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <span className="truncate">
                Project ideas for web development...
              </span>
            </a>
          </nav>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <a
            href="#"
            className="flex items-center p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            <span className="text-lg mr-2">⚙️</span>
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-8 bg-gray-800">
        {/* Chat Window */}
        <div className="flex-1 w-full max-w-3xl overflow-y-auto mb-4">
          <div className="flex flex-col space-y-8">
            {/* Dummy messages */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                A
              </div>
              <div className="bg-gray-700 text-gray-200 max-w-xl p-4 rounded-lg">
                Hello! I am your AI assistant. How can I help you today?
              </div>
            </div>
            <div className="flex items-start space-x-4 justify-end">
              <div className="bg-blue-600 text-white max-w-xl p-4 rounded-lg">
                I'm looking for some information on building a simple chat
                application with React and Tailwind CSS.
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                U
              </div>
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="w-full max-w-3xl p-4 bg-gray-700 rounded-lg flex items-end shadow-md border border-gray-600">
          <textarea
            className="flex-1 px-3 py-2 bg-transparent text-white focus:outline-none resize-none overflow-hidden placeholder-gray-400"
            placeholder="Send a message..."
            rows={1}
          ></textarea>
          <button className="bg-gray-600 text-white p-2 rounded-lg ml-2 hover:bg-gray-500 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
