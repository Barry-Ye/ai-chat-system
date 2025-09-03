import React, { useEffect, useState } from "react";

const TypingDots: React.FC = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // cycle 0 → 3
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-gray-500 font-medium">
      <span>Assistant is typing</span>
      <span className="ml-1">
        {".".repeat(dotCount)}
      </span>
    </div>
  );
};

export default TypingDots;
