import { useState } from "react";
import { motion } from "framer-motion";
import { Egg, Sparkles, UserRound, Send } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


export default function     Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", username);
        setSignupComplete(true);

      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to save username.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Egg-inspired Background Shapes */}
      <motion.div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200 opacity-30 rounded-full blur-3xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-300 opacity-20 rounded-full blur-3xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Signup Container */}
      <motion.div 
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-6">
          <Egg className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            Motta <span className="text-yellow-500">by Matta</span>
          </h1>
        </div>

        {/* Signup Form */}
        {!signupComplete ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
              <input
                type="text"
                placeholder="Choose your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <Sparkles className="animate-spin" />
              ) : (
                <>
                  <Send className="mr-2" />
                  Start with Motta
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Egg className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {username}!
            </h2>
            <p className="text-gray-600">
              You're all set to explore Motta, your AI companion.
            </p>
              {/* Button to navigate */}
              <button 
 onClick={() => navigate("/bot/motta")}
 className="mt-4 px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-all hover:scale-105 active:scale-95 group"
>
 <span className="flex items-center justify-center">
   Go to Motta
   <svg 
     xmlns="http://www.w3.org/2000/svg" 
     width="24" 
     height="24" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     strokeWidth="2" 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     className="ml-2 group-hover:translate-x-1 transition-transform"
   >
     <line x1="5" y1="12" x2="19" y2="12"></line>
     <polyline points="12 5 19 12 12 19"></polyline>
   </svg>
 </span>
</button>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          Crafted with ❤️ by Matta
        </div>
      </motion.div>
    </div>
  );
}

