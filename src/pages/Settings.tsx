import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and security policies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                "Email alerts for critical threats",
                "Push notifications for incidents",
                "Daily security summary report",
                "Slack integration",
              ].map((setting, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <Label htmlFor={`notif-${i}`} className="cursor-pointer">
                    {setting}
                  </Label>
                  <Switch id={`notif-${i}`} defaultChecked={i < 2} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Security Policies</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="retention">Log Retention Period (days)</Label>
                <Input
                  id="retention"
                  type="number"
                  defaultValue="90"
                  className="mt-2 bg-secondary border-border"
                />
              </div>

              <div>
                <Label htmlFor="threshold">Threat Alert Threshold</Label>
                <Input
                  id="threshold"
                  defaultValue="Medium"
                  className="mt-2 bg-secondary border-border"
                />
              </div>

              <div className="pt-2">
                <Button className="w-full">Save Security Settings</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Data Sources</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Firewall Logs", status: "Connected", events: "2.4M/day" },
                { name: "EDR Platform", status: "Connected", events: "1.8M/day" },
                { name: "Cloud Security", status: "Connected", events: "856K/day" },
                { name: "Network Traffic", status: "Connected", events: "5.2M/day" },
                { name: "Email Gateway", status: "Connected", events: "423K/day" },
                { name: "Identity Provider", status: "Connected", events: "124K/day" },
              ].map((source, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-border bg-card/50"
                >
                  <h3 className="font-semibold mb-2">{source.name}</h3>
                  <p className="text-xs text-success mb-1">{source.status}</p>
                  <p className="text-xs text-muted-foreground">{source.events}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
