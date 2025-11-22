import React from "react";
import { Mic, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20 backdrop-blur-lg mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">DebateAI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering speakers with AI-driven insights. Master the art of persuasion with real-time feedback and detailed analytics.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DebateAI. All rights reserved.
          </div>
          <div className="flex gap-4">
            <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" />
            <SocialLink icon={<Github className="w-4 h-4" />} href="#" />
            <SocialLink icon={<Linkedin className="w-4 h-4" />} href="#" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }) {
  return (
    <a 
      href={href}
      className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-neon-blue/20 hover:scale-110 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
