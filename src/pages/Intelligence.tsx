import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Globe, Shield, Database, TrendingUp } from "lucide-react";
import ThreatTimeline from "@/components/timeline/ThreatTimeline";

export default function Intelligence() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence</h1>
        <p className="text-muted-foreground">
          Global threat data, indicators, and strategic intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, label: "Global Feeds", value: "12 Active" },
          { icon: Shield, label: "IOCs Tracked", value: "8,472" },
          { icon: Database, label: "Data Sources", value: "24" },
          { icon: TrendingUp, label: "Trends", value: "156" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-border p-6">
              <stat.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Threat Timeline */}
      <ThreatTimeline />

      <Card className="border-[#00D9FF]/30 p-6 bg-black/40 backdrop-blur-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-[#00D9FF]" />
          Latest Intelligence Reports
        </h2>
        <div className="space-y-4">
          {[
            "Emerging APT Group Targeting Financial Sector",
            "Zero-Day Vulnerability in Popular Enterprise Software",
            "Cryptocurrency Mining Malware Campaign Analysis",
            "Nation-State Attribution Report: Recent Infrastructure Attacks",
          ].map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-4 rounded-lg border border-[#00D9FF]/20 bg-card/50 hover:bg-card transition-colors cursor-pointer group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <h3 className="font-semibold mb-1 relative text-white">{title}</h3>
              <p className="text-sm text-muted-foreground relative">
                Published {i + 1} days ago • Confidence: High
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
