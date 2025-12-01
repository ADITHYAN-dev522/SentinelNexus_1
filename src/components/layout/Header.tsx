import { useState } from "react";
import { Search, Bell, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-primary/20 glass-effect relative overflow-hidden"
    >
      {/* Animated gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-primary"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 100%" }}
      />

      <div className="flex h-16 items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.6 }}
            className="relative"
          >
            <Shield className="h-8 w-8 text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-3 w-3 text-secondary absolute -top-1 -right-1" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold tracking-tight text-gradient-primary animate-gradient"
            whileHover={{ scale: 1.05 }}
          >
            SentinelNexus
          </motion.h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            animate={{ width: searchFocused ? 360 : 260 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity"
              animate={{
                scale: searchFocused ? 1.05 : 1,
              }}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary z-10" />
            <Input
              placeholder="Search detections, incidents..."
              className="pl-9 glass-effect border-primary/30 focus:border-primary focus:glow-primary transition-all relative z-10"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.15, rotate: 15 }} 
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative group"
              onClick={() => setHasNotifications(!hasNotifications)}
            >
              <Bell className="h-5 w-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent))]" />
              {hasNotifications && (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-secondary to-destructive glow-secondary"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-secondary"
                  />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
