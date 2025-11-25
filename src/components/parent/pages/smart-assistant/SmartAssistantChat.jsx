import React from "react";
import { Send, Sparkles } from "lucide-react";

function SmartAssistantChat() {
  return (
    <div className="w-full bg-linear-to-b from-[#ECF8FF] to-white flex flex-col items-center">

      {/* Chat Section */}
      <div className="w-full bg-white shadow-md rounded-xl px-4 sm:px-8 py-6 mt-2 border border-gray-100 flex flex-col">
        
        {/* Assistant Header */}
        <div className="flex items-start sm:items-center gap-3 mb-6 flex-wrap">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1C398E]">
              Smart Assistant
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              AI-powered insights about your child's performance
            </p>
          </div>
        </div>

        {/* Scrollable Chat */}
        <div className="flex-1 max-h-[55vh] overflow-y-auto pr-1">
          <div className="w-fit max-w-full bg-[#F2F6FF] text-gray-700 p-3 sm:p-4 rounded-2xl mb-3 shadow-sm text-sm sm:text-base">
            Hello! I'm your Smart Assistant 👋 <br />
            I can help you understand your child's performance, suggest study
            strategies, and answer questions about their learning journey. <br />
            How can I assist you today?
          </div>
          <p className="text-xs text-gray-400 ml-1 mb-4">13:05</p>
        </div>

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
          <input
            type="text"
            placeholder="Ask anything about learning performance…"
            className="flex-1 focus:outline-none text-xs sm:text-sm"
          />
          <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmartAssistantChat;
