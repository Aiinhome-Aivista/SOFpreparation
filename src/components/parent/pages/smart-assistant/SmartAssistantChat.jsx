import React, { useState, useEffect } from "react";
import { Send, Sparkles, Loader } from "lucide-react";

function SmartAssistantChat() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial message loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate a 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-linear-to-b from-[#ECF8FF] to-white flex flex-col items-center">
      {/* Chat Section */}
      <div className="w-full h-full bg-white shadow-md rounded-none sm:rounded-xl px-4 sm:px-8 py-6 sm:mt-2 border-gray-100 flex flex-col">
        {/* Assistant Header */}
        <div className="flex items-start sm:items-center gap-3 mb-6 flex-wrap">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1C398E]">Smart Assistant</h3>
            <p className="text-xs sm:text-sm text-gray-500">
              AI-powered insights about your child's performance
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-blue-600" size={40} />
            <p className="ml-4 text-gray-600">Waking up Smart Assistant...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="w-fit max-w-full bg-[#F2F6FF] text-gray-700 p-3 sm:p-4 rounded-2xl mb-3 shadow-sm text-sm sm:text-base">
              Hello! I'm your Smart Assistant 👋 <br />
              I can help you understand your child's performance, suggest study
              strategies, and answer questions about their learning journey. <br />
              How can I assist you today?
            </div>
            <p className="text-xs text-gray-400 ml-1 mb-4">13:05</p>
          </div>
        )}

        {/* Input Section */}
        {!isLoading && (
          <div className="pt-4">
            {/* Quick Questions */}
            <div className="text-gray-700 text-sm font-medium mb-3">
              Quick questions:
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-3 py-2 border rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition inline-flex items-center gap-2">
                📈 Overall performance?
              </button>
              <button className="px-3 py-2 border rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition inline-flex items-center gap-2">
                💡 Topics need more focus?
              </button>
              <button className="px-3 py-2 border rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition inline-flex items-center gap-2">
                📘 Suggest study schedule
              </button>
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-3 border rounded-xl px-3 py-2">
              <input type="text" placeholder="Ask anything about learning performance…" className="flex-1 focus:outline-none text-xs sm:text-sm" />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartAssistantChat;
