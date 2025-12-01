import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import FloatingAIChatbox from "@/components/chat/FloatingAIChatbox";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background relative">
      <ParticleBackground />
      <Header />
      <div className="flex flex-1 w-full relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
      <Footer />
      <FloatingAIChatbox />
    </div>
  );
}
