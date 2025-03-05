import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Egg, 
  Send, 
  MessageCircle, 
  Code, 
  BookOpen, 
  Settings 
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { 
    icon: MessageCircle, 
    label: "Chat", 
    color: "text-yellow-500",
    description: "Conversational AI Assistant"
  },
  { 
    icon: Code, 
    label: "Code", 
    color: "text-green-500",
    description: "Programming Help & Snippets"
  },
  { 
    icon: BookOpen, 
    label: "Learn", 
    color: "text-blue-500", 
    description: "Knowledge & Explanations"
  },
  { 
    icon: Settings, 
    label: "Settings", 
    color: "text-gray-500",
    description: "Customize Your Experience"
  }
];

export default function MottaProfessionalChat() {
  const [messages, setMessages] = useState([
    { 
      id: 1,
      sender: "bot", 
      text: "Hello! I'm Motta, Personal Assistant of MR.MITHLAJ MATTA. How can I assist you today?",
      type: "welcome"
    }
  ]);
  const [input, setInput] = useState("");
  const [activeSidebar, setActiveSidebar] = useState(SIDEBAR_ITEMS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const username = localStorage.getItem("username");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const newMessage = { 
      id: messages.length + 1,
      sender: "user", 
      text: input,
      type: "user" 
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    inputRef.current?.focus();
    setIsLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5001/motta/chat", { 
        message: input,
        username: username 
      });
  
      // Remove loading state immediately
      setIsLoading(false);
      
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        text: response.data.message,
        type: "bot"
      };
  
      // Add bot message after ensuring loading state is false
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Error in API call:", error);
      
      // Ensure loading state is removed even on error
      setIsLoading(false);
  
      setMessages(prev => [...prev, { 
        id: messages.length + 2,
        sender: "bot",
        text: "Oops! Something went wrong. Please try again.",
        type: "error"
      }]);
    }
  };

  const eggShapeBackground = useMemo(() => {
    return {
      backgroundImage: `
        radial-gradient(ellipse at top, rgba(254, 249, 195, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at bottom, rgba(254, 240, 150, 0.2) 0%, transparent 70%)
      `,
      backgroundBlendMode: 'overlay'
    };
  }, []);

  const eggLoadingVariants = {
    jump: {
      y: [0, -30, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white" style={eggShapeBackground}>
      <div className="w-24 bg-yellow-50 border-r border-yellow-100 flex flex-col items-center py-8 space-y-4">
        <div className="mb-4">
          <Egg className="w-12 h-12 text-yellow-500" />
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <motion.button
            key={item.label}
            className={`
              p-3 rounded-xl transition-all group 
              ${activeSidebar.label === item.label 
                ? "bg-yellow-500 text-white" 
                : "hover:bg-yellow-100 text-gray-600"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSidebar(item)}
          >
            <item.icon className={
              `${activeSidebar.label === item.label ? "text-white" : item.color}`
            } />
            <span className="sr-only">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-yellow-100 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Motta <span className="text-yellow-500">AI</span></h1>
          <div className="text-gray-500 text-sm">{activeSidebar.description}</div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${msg.sender === "user" ? "bg-yellow-500 text-white" : "bg-yellow-50 text-gray-800 border border-yellow-100"}`}>{msg.text}</div>
              </motion.div>
            ))}
            
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        <div className="bg-white border-t border-yellow-100 p-4">
          <div className="relative flex items-center">
            <input 
              ref={inputRef} 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask Motta anything..." 
              className="w-full pl-4 pr-16 py-3 bg-yellow-50 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              onKeyDown={(e) => e.key === "Enter" && handleSend()} 
            />
            <motion.button 
              className="absolute right-2 bg-yellow-500 text-white p-2 rounded-full" 
              whileTap={{ scale: 0.9 }} 
              onClick={handleSend} 
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}