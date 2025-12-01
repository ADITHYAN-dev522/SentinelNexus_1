import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="border-t border-border bg-card/50 backdrop-blur"
    >
      <div className="flex h-12 items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          SentinelNexus © 2025 - Advanced Threat Detection Platform
        </p>
      </div>
    </motion.footer>
  );
}
