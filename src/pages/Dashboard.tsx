import { motion } from "framer-motion";
import { ThreatLevelIndicator } from "@/components/dashboard/ThreatLevelIndicator";
import { DetectionChart } from "@/components/dashboard/DetectionChart";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { StatsCards } from "@/components/dashboard/StatsCards";
import HolographicCard from "@/components/cards/HolographicCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#9D4EDD] via-[#FF1744] to-[#00D9FF] bg-clip-text text-transparent">
          Security Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring and threat intelligence overview
        </p>
      </motion.div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ThreatLevelIndicator level="high" />
        </div>
        <div className="lg:col-span-2">
          <DetectionChart />
        </div>
      </div>

      {/* Holographic Threat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HolographicCard
          title="DDoS Attack Vector"
          severity="critical"
          frontData={{
            detections: 1247,
            affected: "Web Servers",
            status: "Active - Mitigation In Progress",
          }}
          backData={{
            source: "Multiple botnets (185.220.*.*)",
            target: "WEB-PROD-01 through WEB-PROD-05",
            vector: "UDP flood targeting port 80/443",
            mitigation: "Enable rate limiting, deploy WAF rules, activate DDoS protection service, monitor bandwidth usage.",
          }}
        />
        
        <HolographicCard
          title="Privilege Escalation"
          severity="high"
          frontData={{
            detections: 34,
            affected: "Domain Controllers",
            status: "Investigating",
          }}
          backData={{
            source: "Internal - 10.0.5.142",
            target: "DC-01, DC-02",
            vector: "Kerberoasting attack detected",
            mitigation: "Reset service account passwords, enable advanced audit logging, implement tiered admin model.",
          }}
        />
        
        <HolographicCard
          title="Data Exfiltration"
          severity="medium"
          frontData={{
            detections: 12,
            affected: "File Servers",
            status: "Contained",
          }}
          backData={{
            source: "Compromised endpoint 10.0.3.87",
            target: "FILE-SRV-02 (Finance Share)",
            vector: "Large file transfers to external FTP",
            mitigation: "Isolate affected host, review file access logs, implement DLP policies, scan for malware.",
          }}
        />
      </div>

      <RecentAlerts />
    </div>
  );
}
