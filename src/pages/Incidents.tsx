import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, User } from "lucide-react";

export default function Incidents() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Incident Management</h1>
        <p className="text-muted-foreground">
          Track, investigate, and resolve security incidents
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Open", "In Progress", "Resolved"].map((status, i) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border p-6 text-center">
              <h3 className="text-2xl font-bold mb-1">{i === 0 ? 3 : i === 1 ? 7 : 42}</h3>
              <p className="text-sm text-muted-foreground">{status} Incidents</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border p-6">
        <h2 className="text-xl font-semibold mb-4">Active Incidents</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-lg border border-border bg-card/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="destructive">CRITICAL</Badge>
                    <span className="font-mono text-sm text-muted-foreground">
                      INC-{2025}{i}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">Ransomware Attack Detected</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">Investigating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{i + 2}h {i * 15}m</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Assigned:</span>
                  <span className="font-medium">SOC Team Alpha</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
