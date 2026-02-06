import { motion } from 'motion/react';
import { Github, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#2F81F7]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Left side - branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F81F7] to-[#58A6FF] flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-200">
                Made with <Heart className="w-4 h-4 inline-block text-red-400 mx-1" /> for developers
              </p>
              <p className="text-xs text-gray-400">
                © 2025 README Generator. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right side - links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2F81F7]/10 rounded-xl transition-all text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F81F7]/10 hover:bg-[#2F81F7] text-white border border-[#2F81F7]/30 hover:border-[#2F81F7] rounded-xl transition-all text-sm font-medium"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}