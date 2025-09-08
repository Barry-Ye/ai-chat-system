import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import logo from "../assets/logo.png";
import TypingDots from "../pages/Loading";

interface Message {
  role: "user" | "assistant";
  content: string;
  fileName?: string; // optional attachment support
}

interface ApiResponse {
  output?: string;
}

interface Conversation {
  id: number;
  messages: Message[];
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: Date.now(), messages: [] },
  ]);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation.messages, isLoading]);

  const handleBackClick = () => {
    navigate("/home");
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
    if (!input.trim() && !file) return;

    if (showSuggestions) setShowSuggestions(false);

    const userMessage: Message = {
      role: "user",
      content: input || "[Sent a Attachment]",
      fileName: file ? file.name : undefined,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    setIsLoading(true);
    setInput("");
    setFile(null);

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (file) formData.append("file", file);

      const response = await fetch(
        "https://primary-production-4a149.up.railway.app/webhook/assistant",
        { method: "POST", body: formData }
      );

      const data: ApiResponse = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.output || "No response received",
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeId
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        )
      );
    } catch (error) {
      console.error("Chat API error:", error);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    role: "assistant",
                    content: "Sorry, Error connecting to server.",
                  },
                ],
              }
            : conv
        )
      );
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    const newConv: Conversation = { id: Date.now(), messages: [] };
    setConversations((prev) => [...prev, newConv]);
    setActiveId(newConv.id);
    setShowSuggestions(true);
  };

  return (
    <div className="flex h-screen font-sans text-white relative">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-gray-900 text-white flex flex-col p-4 relative z-10">
        {/* Top */}
        <div>
          <button
            onClick={handleBackClick}
            className="flex items-center p-2 mb-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 w-full"
          >
            <img
              src="https://unpkg.com/heroicons@2.0.16/24/solid/arrow-left.svg"
              alt="Back"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-200 font-medium">Back</span>
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
          <span className="text-sm text-gray-400 px-2 mb-4 block">Chat History</span>
          {conversations.map((conv) => {
            const firstMessage = conv.messages.find((m) => m.role === "user");
            return (
              <div
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`px-3 py-2 rounded-md text-sm cursor-pointer truncate ${
                  conv.id === activeId
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {firstMessage ? firstMessage.content.slice(0, 30) : "New Chat"}
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-4">
          <button
            onClick={startNewChat}
            className="w-full bg-gray-800 text-gray-300 py-2 rounded-md hover:bg-gray-700 text-sm"
          >
            + New Chat
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gray-800 relative z-10">
        {/* Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={logo} alt="Logo" className="w-100 h-100 object-contain" />
        </div>

        {/* Messages */}
        <div className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar relative z-10">
          {activeConversation.messages.map((msg, idx) => (
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
                className={`max-w-xl p-4 rounded-lg break-words ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                )}
                {msg.fileName && (
                  <p className="text-xs mt-1 text-gray-300 italic flex items-center gap-1">
                    <img
                      src="https://unpkg.com/heroicons@2.0.16/24/solid/paper-clip.svg"
                      alt="attachment"
                      className="w-4 h-4"
                    />
                    {msg.fileName}
                  </p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  U
                </div>
              )}
            </div>
          ))}

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
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="w-full max-w-3xl mx-auto mb-3 flex flex-wrap gap-2 px-6 z-10">
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

        {/* Input + File Upload */}
        <div className="w-full max-w-3xl mx-auto flex items-center bg-gray-700 rounded-full shadow-md border border-gray-600 px-4 py-2 mb-4 z-10">
          {/* File Upload */}
          <label className="cursor-pointer text-gray-300 hover:text-white mr-3">
            <img
              src="https://unpkg.com/heroicons@2.0.16/24/outline/paper-clip.svg"
              alt="Attach"
              className="w-5 h-5"
            />
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>
          {file && (
            <span className="text-xs text-gray-300 mr-3 truncate max-w-[120px]">
              {file.name}
            </span>
          )}

          {/* Text Input */}
          <textarea
            className="flex-1 bg-transparent text-white focus:outline-none resize-none placeholder-gray-400 text-sm h-10 py-2 px-2 rounded-full"
            placeholder="Type a message..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Send Button */}
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

{
  /* <main className="flex-1 flex flex-col items-center p-8 bg-gray-900 text-gray-300 relative">
  <div className="flex-1 w-full max-w-3xl overflow-y-auto mb-4 space-y-6 relative z-10">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`flex items-start space-x-3 ${
          msg.role === "user" ? "justify-end" : ""
        }`}
      >
        <div
          className={`p-3 rounded-lg shadow-sm max-w-md ${
            msg.role === "user"
              ? "bg-gray-700 text-gray-100"
              : "bg-gray-800 border border-gray-700 text-gray-200"
          }`}
        >
          {msg.content}
        </div>
      </div>
    ))}
    {isLoading && (
      <div className="flex items-start space-x-3">
        <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200">
          <TypingDots />
        </div>
      </div>
    )}
  </div>

  {showSuggestions && (
    <div className="w-full max-w-3xl mb-3 flex flex-wrap gap-2 relative z-10">
      {suggestions.map((s, idx) => (
        <button
          key={idx}
          onClick={() => handleSuggestionClick(s)}
          className="px-3 py-1 rounded-md border border-gray-600 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  )}

  <div className="w-full max-w-3xl flex items-center bg-gray-800 rounded-md border border-gray-700 px-4 py-2 relative z-10">
    <textarea
      className="flex-1 bg-transparent text-white focus:outline-none resize-none placeholder-gray-500 text-sm"
      placeholder="Type a message..."
      rows={1}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button
      onClick={sendMessage}
      className="p-2 ml-2 text-gray-500 hover:text-gray-200 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 00.149.337l.07.135.006.012a1 1 0 00.957.653h14a1 1 0 00.957-.653l.006-.012.07-.135a1 1 0 00.149-.337l-7-14z" />
      </svg>
    </button>
  </div>
</main> */
}
