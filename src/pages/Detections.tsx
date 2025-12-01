import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Detections() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Threat Detections</h1>
        <p className="text-muted-foreground">
          Advanced threat detection and analysis system
        </p>
      </motion.div>

      <Card className="border-border p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search detections by type, source, or signature..."
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">HIGH</Badge>
                    <span className="font-mono text-sm text-muted-foreground">
                      DET-{1000 + i}
                    </span>
                  </div>
                  <h3 className="font-semibold">Suspicious Network Activity Detected</h3>
                  <p className="text-sm text-muted-foreground">
                    Unusual outbound connection pattern detected from internal host
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  2025-01-15 14:{20 + i}:{30 + i}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
