import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, Loader, CornerDownLeft } from "lucide-react";

const initialMessage = {
  id: 1,
  sender: "bot",
  text: "Hello! I'm your Smart Assistant. I can help you understand your child's performance, suggest study strategies, and answer questions about their learning journey. How can I assist you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

function SmartAssistantChat() {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([initialMessage]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate a bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: `I've received your message: "${trimmedInput}". I'm still in training, but soon I'll be able to provide detailed insights!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question) => {
    const fakeEvent = { preventDefault: () => {} };
    setInputValue(question);
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: `Regarding "${question}", I am analyzing the data and will provide a summary shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center h-[calc(100vh-200px)]">
      <div className="w-full h-full bg-white shadow-lg rounded-none sm:rounded-2xl px-4 sm:px-6 py-4 border-gray-200 flex flex-col">
        <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
          <div className="bg-linear-to-br from-blue-500 to-green-400 text-white p-2.5 rounded-full shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1C398E]">Smart Assistant</h3>
            <p className="text-sm text-gray-500">Your AI-powered performance guide</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin text-blue-600" size={40} />
            <p className="mt-4 text-gray-600">Waking up Smart Assistant...</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-scroll pr-2 space-y-6 py-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                
                  <div className={`w-fit max-w-md p-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-100 text-gray-800 rounded-bl-lg'}`}>
                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                  
                  <div className="w-fit max-w-md p-3 rounded-2xl shadow-sm bg-gray-100 text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                <button onClick={() => handleQuickQuestion("What is my child's overall performance?")} className="px-3 py-1.5 border border-[#1C398E] rounded-full text-xs hover:bg-blue-50 transition whitespace-nowrap">
                  📈 Overall performance?
                </button>
                <button onClick={() => handleQuickQuestion("Which topics need more focus?")} className="px-3 py-1.5 border border-[#1C398E] rounded-full text-xs hover:bg-blue-50 transition whitespace-nowrap">
                  💡 Topics to focus on?
                </button>
                <button onClick={() => handleQuickQuestion("Suggest a study schedule for this week.")} className="px-3 py-1.5 border border-[#1C398E] rounded-full text-xs hover:bg-blue-50 transition whitespace-nowrap">
                  📘 Suggest a study schedule
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-3 border bg-white rounded-xl px-2 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about learning performance…"
                  className="flex-1 focus:outline-none text-sm bg-transparent px-2"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-75" disabled={!inputValue.trim()}>
                  
                  <Send className="w-5 h-5" />
                </button>
              </form>
             
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SmartAssistantChat;
