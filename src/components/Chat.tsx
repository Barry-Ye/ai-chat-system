import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypingDots from "../pages/loading";
import logo from "../assets/logo.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ApiResponse {
  output?: string;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    navigate("/landing");
  };

  const suggestions: string[] = [
    "Tell me how can u assist me?",
    "Give me legal advice for my case",
    "What service do you provide?",
  ];

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (showSuggestions) {
      setShowSuggestions(false); //hide after first message
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://primary-production-4a149.up.railway.app/webhook/assistant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data: ApiResponse = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.output || "No response received",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to server." },
      ]);
    }

    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="flex min-h-screen font-sans text-white relative">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 relative z-10">
        <div className="flex-1 flex flex-col">
          <button
            onClick={handleBackClick}
            className="flex items-center p-2 mb-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            <img
              src="https://unpkg.com/heroicons@2.0.16/24/solid/arrow-left.svg"
              alt="Back"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-200 font-medium">Back</span>
          </button>

          <div className="flex items-center mb-4">
            <span className="text-xl font-bold text-gray-200">
              Chat History
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-8 bg-gray-800 relative z-10">
        {/* Chat Window */}
        <div className="flex-1 w-full max-w-3xl relative">
          {/* Centered background logo */}
          <img
            src={logo}
            alt="Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none w-64 h-64 object-contain z-0"
          />
        </div>

        {/* Messages */}
        <div className="flex-1 w-full max-w-3xl overflow-y-auto mb-4 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-4 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                  A
                </div>
              )}
              <div
                className={`max-w-xl p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Typing animation */}
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                A
              </div>
              <div className="max-w-xl p-4 rounded-lg bg-gray-700 text-gray-200">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions (only before first question) */}
        {showSuggestions && (
          <div className="w-full max-w-3xl mb-3 flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(s)}
                className="px-3 py-1 rounded-full bg-gray-600 text-sm text-gray-200 hover:bg-gray-500 transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="w-full max-w-3xl flex items-center bg-gray-700 rounded-full shadow-md border border-gray-600 px-4 py-2">
          <textarea
            className="flex-1 bg-transparent text-white focus:outline-none resize-none placeholder-gray-400 text-sm h-10 py-2 px-2 rounded-full"
            placeholder="Type a message..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-gray-600 text-white p-2 rounded-lg ml-2 hover:bg-gray-500 transition"
          >
            ➤
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TypingDots from "../pages/loading";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface ApiResponse {
//   output?: string;
// }

// const Chat: React.FC = () => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBackClick = () => {
//     navigate("/landing");
//   };

//   const suggestions: string[] = [
//     "Tell me a joke",
//     "How to build a chat app in React?",
//     "Give me project ideas",
//   ];

//   const handleSuggestionClick = (text: string) => {
//     setInput(text);
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         "https://primary-production-4a149.up.railway.app/webhook/assistant",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: input }),
//         }
//       );

//       const data: ApiResponse = await response.json();
//       const assistantMessage: Message = {
//         role: "assistant",
//         content: data.output || "No response received",
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Error connecting to server." },
//       ]);
//     }

//     setIsLoading(false);
//     setInput("");
//   };

//   return (
//     <div className="flex min-h-screen font-sans relative bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Decorative background circles */}
//       <div className="absolute top-10 left-1/4 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
//       <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

//       {/* Sidebar */}
//       <aside className="w-64 bg-white/90 backdrop-blur-md shadow-md flex flex-col p-4 relative z-10 rounded-r-2xl">
//         <div className="flex-1 flex flex-col">
//           <button
//             onClick={handleBackClick}
//             className="flex items-center p-2 mb-4 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <img
//               src="https://unpkg.com/heroicons@2.0.16/24/solid/arrow-left.svg"
//               alt="Back"
//               className="w-5 h-5 mr-2"
//             />
//             <span className="text-gray-700 font-medium">Back</span>
//           </button>

//           <div className="flex items-center mb-4">
//             <span className="text-xl font-bold text-gray-800">New Chat</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center p-8 relative z-10">
//         {/* Chat Window */}
//         <div className="flex-1 w-full max-w-3xl overflow-y-auto mb-4 space-y-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex items-start space-x-4 ${
//                 msg.role === "user" ? "justify-end" : ""
//               }`}
//             >
//               {msg.role === "assistant" && (
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
//                   A
//                 </div>
//               )}
//               <div
//                 className={`max-w-xl p-4 rounded-2xl shadow ${
//                   msg.role === "user"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-800"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//               {msg.role === "user" && (
//                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//                   U
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Typing animation */}
//           {isLoading && (
//             <div className="flex items-start space-x-4">
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
//                 A
//               </div>
//               <div className="max-w-xl p-4 rounded-2xl shadow bg-white text-gray-800">
//                 <TypingDots />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Suggestions */}
//         <div className="w-full max-w-3xl mb-3 flex flex-wrap gap-2">
//           {suggestions.map((s, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleSuggestionClick(s)}
//               className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200 transition"
//             >
//               {s}
//             </button>
//           ))}
//         </div>

//         {/* Input Box */}
//         <div className="w-full max-w-3xl flex items-center bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
//           <textarea
//             className="flex-1 bg-transparent text-gray-800 focus:outline-none resize-none placeholder-gray-400 text-sm h-10 py-2 px-2 rounded-full"
//             placeholder="Type a message..."
//             rows={1}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-2 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
//           >
//             ➤
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Chat;
