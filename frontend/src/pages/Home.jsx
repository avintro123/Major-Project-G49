import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Mic, BarChart3, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse-glow animate-delay-200" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/5 border border-white/10 text-neon-blue text-sm font-medium mb-8 backdrop-blur-md animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide">AI-Powered Debate Evaluator — Beta</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-tight">
              Master the Art of <br />
              <span className="text-gradient animate-pulse-glow">
                Persuasion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Analyze your debates, sharpen your arguments, and get instant AI feedback on clarity, structure, and persuasiveness.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/debate/text">
                <Button size="lg" className="w-full sm:w-auto gap-3 shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40">
                  <MessageSquare className="w-5 h-5" />
                  Start Text Debate
                </Button>
              </Link>
              <Link to="/debate/voice">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-3">
                  <Mic className="w-5 h-5" />
                  Start Voice Debate
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-900/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why DebateAI?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools to elevate your debating skills to the next level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-neon-blue" />}
              title="Text & Voice Input"
              description="Type your arguments or speak them out. Our AI analyzes both text and audio inputs for comprehensive feedback."
              delay={0.1}
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-neon-purple" />}
              title="Instant Scoring"
              description="Get immediate scores on clarity, structure, grammar, and persuasiveness to track your improvement."
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-neon-pink" />}
              title="Smart Analysis"
              description="Receive detailed pros and cons, weakness identification, and actionable tips to win your next debate."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-neon-blue/5"
    >
      <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-white/10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-blue transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
    </motion.div>
  );
}
