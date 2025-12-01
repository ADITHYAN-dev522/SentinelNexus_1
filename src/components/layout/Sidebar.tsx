import { motion } from "framer-motion";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Brain,
  Zap,
  Settings,
  ChevronLeft,
  Bug,
  ShieldAlert,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: AlertTriangle, label: "Detections", path: "/detections" },
  { icon: FileText, label: "Incidents", path: "/incidents" },
  { icon: Brain, label: "Intelligence", path: "/intelligence" },
  { icon: Bug, label: "Malware", path: "/malware" },
  { icon: ShieldAlert, label: "Vulnerability", path: "/vulnerability" },
  { icon: Zap, label: "Response", path: "/response" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={`sticky top-16 h-[calc(100vh-4rem)] border-r border-primary/20 glass-effect transition-all duration-300 relative overflow-hidden ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Vertical gradient accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent"
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "100% 200%" }}
      />
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end p-3 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <NavLink
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-all hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:text-primary relative group overflow-hidden"
                activeClassName="bg-gradient-to-r from-primary/30 to-secondary/30 text-primary font-medium border border-primary/40 glow-primary"
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
                  className="relative z-10"
                >
                  <item.icon className="h-5 w-5 shrink-0 drop-shadow-[0_0_4px_hsl(var(--primary))] group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                </motion.div>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="truncate relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground"
            >
              <p className="font-mono">System Status: Online</p>
              <p className="mt-1">Active Monitors: 24</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
