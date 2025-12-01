import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { time: "00:00", detections: 12, threats: 2 },
  { time: "04:00", detections: 19, threats: 5 },
  { time: "08:00", detections: 27, threats: 8 },
  { time: "12:00", detections: 45, threats: 12 },
  { time: "16:00", detections: 38, threats: 9 },
  { time: "20:00", detections: 31, threats: 6 },
  { time: "23:00", detections: 24, threats: 4 },
];

export function DetectionChart() {
  return (
    <Card className="glass-effect border-accent/30 relative overflow-hidden group hover:border-accent/60 transition-all">
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-1">Detection Timeline</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Last 24 hours activity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Area
                type="monotone"
                dataKey="detections"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorDetections)"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fill="url(#colorThreats)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Card>
  );
}
