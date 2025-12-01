import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const alerts = [
  {
    id: "ALT-001",
    timestamp: "2025-01-15 14:23:12",
    severity: "critical",
    type: "Malware Detection",
    source: "192.168.1.105",
    status: "investigating",
  },
  {
    id: "ALT-002",
    timestamp: "2025-01-15 14:18:45",
    severity: "high",
    type: "Suspicious Login",
    source: "10.0.2.48",
    status: "resolved",
  },
  {
    id: "ALT-003",
    timestamp: "2025-01-15 14:12:33",
    severity: "medium",
    type: "Port Scan",
    source: "172.16.0.23",
    status: "monitoring",
  },
  {
    id: "ALT-004",
    timestamp: "2025-01-15 14:05:18",
    severity: "low",
    type: "Failed Authentication",
    source: "192.168.1.87",
    status: "resolved",
  },
  {
    id: "ALT-005",
    timestamp: "2025-01-15 13:58:42",
    severity: "high",
    type: "DDoS Attempt",
    source: "203.0.113.45",
    status: "blocked",
  },
];

const severityConfig = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-destructive/70 text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success/70 text-success-foreground",
};

const statusConfig = {
  investigating: "bg-warning/20 text-warning border-warning/50",
  resolved: "bg-success/20 text-success border-success/50",
  monitoring: "bg-info/20 text-info border-info/50",
  blocked: "bg-destructive/20 text-destructive border-destructive/50",
};

export function RecentAlerts() {
  return (
    <Card className="glass-effect border-secondary/30 relative overflow-hidden group hover:border-secondary/60 transition-all">
      {/* Corner decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-1">Recent Alerts</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Latest security events requiring attention
          </p>
        </motion.div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Alert ID</TableHead>
                <TableHead className="font-semibold">Timestamp</TableHead>
                <TableHead className="font-semibold">Severity</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Source</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert, index) => (
                <motion.tr
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.3)" }}
                  className="border-b border-border group cursor-pointer"
                >
                  {/* Hover accent line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <TableCell className="font-mono text-sm font-medium">
                    {alert.id}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {alert.timestamp}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${severityConfig[alert.severity as keyof typeof severityConfig]} font-medium`}
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {alert.source}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[alert.status as keyof typeof statusConfig]}
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
