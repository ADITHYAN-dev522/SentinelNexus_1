import { motion } from "framer-motion";
import { Shield, AlertTriangle, AlertCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

type ThreatLevel = "low" | "medium" | "high" | "critical";

interface ThreatLevelIndicatorProps {
  level: ThreatLevel;
}

const threatConfig = {
  low: {
    icon: Shield,
    color: "text-success",
    bgColor: "bg-success/10",
    glowColor: "shadow-[0_0_30px_hsl(var(--success)/0.3)]",
    label: "Low Threat",
    description: "All systems nominal",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    glowColor: "shadow-[0_0_30px_hsl(var(--warning)/0.3)]",
    label: "Medium Threat",
    description: "Elevated monitoring required",
  },
  high: {
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    glowColor: "shadow-[0_0_30px_hsl(var(--destructive)/0.3)]",
    label: "High Threat",
    description: "Active threats detected",
  },
  critical: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/20",
    glowColor: "shadow-[0_0_40px_hsl(var(--destructive)/0.5)]",
    label: "Critical Threat",
    description: "Immediate action required",
  },
};

export function ThreatLevelIndicator({ level }: ThreatLevelIndicatorProps) {
  const config = threatConfig[level];
  const Icon = config.icon;

  return (
    <Card className="relative overflow-hidden glass-effect border-primary/30 group hover:border-primary/60 transition-all">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.h3
            className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Threat Level
          </motion.h3>
          <motion.div
            animate={{
              scale: level === "critical" ? [1, 1.2, 1] : [1, 1.05, 1],
              rotate: level === "critical" ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: level === "critical" ? 0.8 : 2,
              repeat: Infinity,
            }}
            className={`p-4 rounded-full ${config.bgColor} ${config.glowColor} relative`}
          >
            <Icon className={`h-8 w-8 ${config.color} drop-shadow-[0_0_10px_currentColor]`} />
            
            {/* Rotating ring effect */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${config.color.replace('text-', 'border-')} opacity-50`}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={`text-3xl font-bold ${config.color} mb-1`}>
            {config.label}
          </h2>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </motion.div>

        {/* Animated scan line effect for critical */}
        {level === "critical" && (
          <motion.div
            className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-destructive to-transparent"
            animate={{
              top: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>
    </Card>
  );
}
