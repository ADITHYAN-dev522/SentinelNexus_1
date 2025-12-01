import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function FloatingAIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI security analyst. I can help you understand threats, analyze patterns, and provide insights based on the current data. How can I assist you?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've analyzed the current threat landscape. Based on the data shown, I recommend prioritizing the critical incidents and implementing additional monitoring on affected endpoints. Would you like me to provide more specific recommendations?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#9D4EDD] via-[#FF1744] to-[#00D9FF] p-0 shadow-2xl hover:scale-110 transition-transform"
              style={{
                boxShadow: "0 0 40px rgba(157, 78, 221, 0.6), 0 0 80px rgba(0, 217, 255, 0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9D4EDD] via-[#FF1744] to-[#00D9FF] opacity-50 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <MessageCircle className="relative h-8 w-8 text-white" />
              
              {/* Pulse indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00E676]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-[420px] h-[600px] rounded-2xl border-2 border-[#9D4EDD]/50 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 60px rgba(157, 78, 221, 0.4), inset 0 0 60px rgba(0, 217, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="relative border-b border-[#9D4EDD]/30 bg-gradient-to-r from-[#9D4EDD]/20 to-[#00D9FF]/20 p-4">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#9D4EDD] to-[#00D9FF] opacity-10"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 text-[#9D4EDD]" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">AI Security Analyst</h3>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#00E676]"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-xs text-white/60">Online</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[calc(100%-140px)] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-[#9D4EDD] to-[#FF1744] text-white"
                          : "bg-white/5 border border-[#00D9FF]/30 text-white"
                      }`}
                      style={{
                        boxShadow: message.role === "assistant" 
                          ? "0 0 20px rgba(0, 217, 255, 0.2)" 
                          : "0 0 20px rgba(157, 78, 221, 0.3)",
                      }}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs mt-1 opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#9D4EDD]/30 bg-black/80 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about threats, patterns, or insights..."
                  className="flex-1 bg-white/5 border-white/20 focus:border-[#00D9FF] text-white placeholder:text-white/40"
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="h-10 w-10 p-0 bg-gradient-to-br from-[#9D4EDD] to-[#00D9FF] hover:scale-110 transition-transform"
                  style={{
                    boxShadow: "0 0 20px rgba(157, 78, 221, 0.5)",
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
