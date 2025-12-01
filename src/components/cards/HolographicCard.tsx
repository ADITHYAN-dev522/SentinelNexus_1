import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

interface HolographicCardProps {
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  frontData: {
    detections: number;
    affected: string;
    status: string;
  };
  backData: {
    source: string;
    target: string;
    vector: string;
    mitigation: string;
  };
}

export default function HolographicCard({ title, severity, frontData, backData }: HolographicCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const severityColors = {
    critical: { border: "#FF1744", glow: "rgba(255, 23, 68, 0.4)", bg: "rgba(255, 23, 68, 0.1)" },
    high: { border: "#FF6E40", glow: "rgba(255, 110, 64, 0.4)", bg: "rgba(255, 110, 64, 0.1)" },
    medium: { border: "#FFC107", glow: "rgba(255, 193, 7, 0.4)", bg: "rgba(255, 193, 7, 0.1)" },
    low: { border: "#00E676", glow: "rgba(0, 230, 118, 0.4)", bg: "rgba(0, 230, 118, 0.1)" },
  };

  const colors = severityColors[severity];

  return (
    <div
      className="perspective-1000 h-[320px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full backface-hidden rounded-lg border-2 bg-black/60 backdrop-blur-xl overflow-hidden"
          style={{
            borderColor: colors.border,
            boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
          }}
        >
          {/* Holographic scan lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan pointer-events-none" />
          
          <div className="relative h-full p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <span
                  className="text-xs font-mono uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: colors.bg, color: colors.border }}
                >
                  {severity}
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <AlertTriangle className="h-8 w-8" style={{ color: colors.border }} />
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Detections</p>
                  <p className="text-3xl font-bold font-mono" style={{ color: colors.border }}>
                    {frontData.detections}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Affected</p>
                  <p className="text-lg font-semibold text-white">{frontData.affected}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t" style={{ borderColor: `${colors.border}40` }}>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.border }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-white font-medium">{frontData.status}</p>
                </div>
              </div>
            </div>

            {/* Flip hint */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 text-center font-mono">
                CLICK TO REVEAL DETAILS →
              </p>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: colors.border }} />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: colors.border }} />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: colors.border }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: colors.border }} />
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full backface-hidden rounded-lg border-2 bg-black/80 backdrop-blur-xl overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            borderColor: colors.border,
            boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
          }}
        >
          <div className="relative h-full p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5" style={{ color: colors.border }} />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Threat Analysis
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Source</p>
                <p className="text-white font-mono text-sm">{backData.source}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Target</p>
                <p className="text-white font-mono text-sm">{backData.target}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Attack Vector</p>
                <p className="text-white text-sm">{backData.vector}</p>
              </div>
              
              <div className="pt-4 border-t" style={{ borderColor: `${colors.border}40` }}>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                  Recommended Mitigation
                </p>
                <p className="text-white text-sm leading-relaxed">{backData.mitigation}</p>
              </div>
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 text-center font-mono">
                ← CLICK TO RETURN
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
