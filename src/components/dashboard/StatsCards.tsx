import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, Shield, AlertTriangle, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Activity,
    label: "Active Monitors",
    value: "24",
    change: "+2 from last hour",
    trend: "up",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    label: "Threats Blocked",
    value: "1,247",
    change: "+89 today",
    trend: "up",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: AlertTriangle,
    label: "Open Incidents",
    value: "3",
    change: "-5 from yesterday",
    trend: "down",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: TrendingUp,
    label: "System Health",
    value: "98.5%",
    change: "Optimal performance",
    trend: "stable",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="glass-effect border-primary/20 overflow-hidden group hover:border-primary hover:glow-primary transition-all relative">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`p-3 rounded-lg ${stat.bgColor} relative group-hover:glow-primary transition-all`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200, duration: 0.6 }}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} drop-shadow-[0_0_6px_currentColor]`} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-success/20 text-success"
                      : stat.trend === "down"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                </motion.div>
              </div>

              <motion.h3
                className="text-sm font-medium text-muted-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {stat.label}
              </motion.h3>
              <motion.p
                className="text-3xl font-bold mb-1 text-gradient-primary"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>

            {/* Radial glow on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
              }}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
