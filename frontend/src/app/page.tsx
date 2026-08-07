"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Code, Database, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "AI Error Fix Assistant",
      description: "Instantly debug and fix code across 15+ languages. Understand the root cause and learn best practices."
    },
    {
      icon: <Database className="w-6 h-6 text-secondary" />,
      title: "AI Data Analysis",
      description: "Upload your data files and instantly get quality reports, visual charts, and actionable insights."
    },
    {
      icon: <Bot className="w-6 h-6 text-accent" />,
      title: "Persistent AI Chat",
      description: "Discuss complex issues with context-aware AI that remembers your project history."
    }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: "10x Faster Debugging" },
    { icon: <Shield className="w-5 h-5 text-green-400" />, text: "Enterprise-grade Security" },
    { icon: <Sparkles className="w-5 h-5 text-blue-400" />, text: "Clean Glassmorphism UI" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050816]">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Streducer AI
        </div>
        <div className="flex space-x-6 items-center">
          <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">How it Works</Link>
          <Link href="/dashboard" className="text-sm font-medium">
            <Button variant="primary" className="py-2.5">Go to Dashboard</Button>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-sm font-medium mb-8 text-primary border-primary/20"
          >
            <Sparkles size={16} />
            <span>The future of AI-assisted engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            Solve Technical Problems <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Faster Than Ever
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl"
          >
            Streducer AI is the ultimate platform for software developers and data analysts.
            Debug code, analyze data, and get insights instantly with context-aware AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/dashboard">
              <Button className="px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center space-x-2">
                <span>Get Started for Free</span>
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Button variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto">
              View Documentation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center space-x-2 text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full">
                {benefit.icon}
                <span>{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Powerful AI Modules</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Everything you need to accelerate your workflow, neatly packaged in a premium interface.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-panel p-8 rounded-2xl hover:bg-white/[0.08] transition-colors group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 glass mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 md:mb-0">
            Streducer AI
          </div>
          <div className="text-sm text-white/50">
            © {new Date().getFullYear()} Streducer AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
