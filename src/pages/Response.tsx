import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

export default function Response() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Automated Response</h1>
        <p className="text-muted-foreground">
          Configure and execute automated response playbooks
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Playbooks", value: "8", color: "text-primary" },
          { label: "Executions Today", value: "147", color: "text-success" },
          { label: "Avg Response Time", value: "2.3s", color: "text-accent" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border p-6 text-center">
              <h3 className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border p-6">
        <h2 className="text-xl font-semibold mb-4">Response Playbooks</h2>
        <div className="space-y-4">
          {[
            { name: "Isolate Compromised Host", status: "active", executions: 23 },
            { name: "Block Malicious IP", status: "active", executions: 89 },
            { name: "Quarantine Suspicious File", status: "active", executions: 34 },
            { name: "Reset User Credentials", status: "paused", executions: 12 },
            { name: "Notify Security Team", status: "active", executions: 156 },
          ].map((playbook, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-lg border border-border bg-card/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{playbook.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {playbook.executions} executions this week
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={playbook.status === "active" ? "default" : "secondary"}
                  className={playbook.status === "active" ? "bg-success" : ""}
                >
                  {playbook.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  {playbook.status === "active" ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
