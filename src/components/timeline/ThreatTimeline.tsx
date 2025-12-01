import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Filter, AlertCircle, Shield, Lock, Eye } from "lucide-react";

interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  icon: any;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    timestamp: "14:20",
    title: "Initial Reconnaissance",
    severity: "medium",
    description: "Port scanning detected from external IP",
    icon: Eye,
  },
  {
    id: "2",
    timestamp: "14:35",
    title: "Exploit Attempt",
    severity: "high",
    description: "SQL injection attempt on web application",
    icon: AlertCircle,
  },
  {
    id: "3",
    timestamp: "14:42",
    title: "Defense Activated",
    severity: "low",
    description: "WAF rules triggered, attack blocked",
    icon: Shield,
  },
  {
    id: "4",
    timestamp: "14:48",
    title: "Privilege Escalation",
    severity: "critical",
    description: "Unauthorized access to admin panel detected",
    icon: Lock,
  },
  {
    id: "5",
    timestamp: "14:55",
    title: "Containment",
    severity: "medium",
    description: "Suspicious IP blocked, session terminated",
    icon: Shield,
  },
];

export default function ThreatTimeline() {
  const [zoom, setZoom] = useState(1);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const filteredEvents = selectedSeverity
    ? mockEvents.filter(e => e.severity === selectedSeverity)
    : mockEvents;

  const severityColors = {
    critical: "#FF1744",
    high: "#FF6E40",
    medium: "#FFC107",
    low: "#00E676",
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.6));

  return (
    <Card className="border-[#9D4EDD]/30 bg-black/40 backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <AlertCircle className="h-5 w-5 text-[#FF1744]" />
            </motion.div>
            <h3 className="text-lg font-mono font-semibold bg-gradient-to-r from-[#FF1744] to-[#FFC107] bg-clip-text text-transparent">
              ATTACK_TIMELINE
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0 border-white/20 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0 border-white/20 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {/* Filter buttons */}
            <div className="flex gap-1 ml-4">
              {(["critical", "high", "medium", "low"] as const).map((severity) => (
                <Button
                  key={severity}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
                  className="h-8 px-2 text-xs font-mono uppercase border-white/20 hover:border-white/40"
                  style={{
                    backgroundColor: selectedSeverity === severity ? `${severityColors[severity]}20` : 'transparent',
                    borderColor: selectedSeverity === severity ? severityColors[severity] : undefined,
                  }}
                >
                  {severity}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative overflow-x-auto pb-4">
          <div
            className="flex gap-8 transition-all duration-300"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'left center' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-[280px]"
                >
                  {/* Connection line */}
                  {index < filteredEvents.length - 1 && (
                    <motion.div
                      className="absolute top-12 left-full w-8 h-0.5"
                      style={{ backgroundColor: severityColors[event.severity] }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    />
                  )}

                  {/* Event card */}
                  <motion.div
                    className="relative rounded-lg border-2 bg-black/60 backdrop-blur-sm p-4 overflow-hidden"
                    style={{
                      borderColor: severityColors[event.severity],
                      boxShadow: `0 0 20px ${severityColors[event.severity]}40`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 30px ${severityColors[event.severity]}60`,
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${severityColors[event.severity]}40, transparent)`,
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />

                    {/* Timestamp */}
                    <div className="relative flex items-center justify-center mb-3">
                      <motion.div
                        className="absolute w-24 h-24 rounded-full opacity-30 blur-xl"
                        style={{ backgroundColor: severityColors[event.severity] }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="relative text-center">
                        <p className="text-2xl font-mono font-bold text-white mb-1">
                          {event.timestamp}
                        </p>
                        <motion.div
                          className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${severityColors[event.severity]}20`,
                            border: `2px solid ${severityColors[event.severity]}`,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <event.icon className="h-6 w-6" style={{ color: severityColors[event.severity] }} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-2">
                      <h4 className="text-white font-semibold text-sm">{event.title}</h4>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span
                          className="text-xs font-mono uppercase px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${severityColors[event.severity]}20`,
                            color: severityColors[event.severity],
                          }}
                        >
                          {event.severity}
                        </span>
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: severityColors[event.severity] }}
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  );
}
