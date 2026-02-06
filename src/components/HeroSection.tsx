import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Code2, Sparkles, Github } from 'lucide-react';

interface HeroSectionProps {
  onGenerateClick: () => void;
  onTemplatesClick: () => void;
  onGithubClick: () => void;
}

export function HeroSection({ onGenerateClick, onTemplatesClick, onGithubClick }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22]/80 backdrop-blur-sm border border-[#2F81F7]/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#58A6FF]" />
            <span className="text-sm text-[#58A6FF] font-medium">The ultimate README builder</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-white via-[#58A6FF] to-[#2F81F7] bg-clip-text text-transparent font-bold"
            style={{ fontSize: '3.5rem', lineHeight: '1.2' }}
          >
            GitHub Profile README Generator
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-gray-300 max-w-2xl mx-auto"
            style={{ fontSize: '1.125rem', lineHeight: '1.75' }}
          >
            Create your perfect profile README in minutes. Professional, customizable, and beautiful — no coding required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onGenerateClick}
              className="inline-flex items-center justify-center gap-2 bg-[#2F81F7] hover:bg-[#58A6FF] text-white px-8 py-4 rounded-2xl shadow-lg shadow-[#2F81F7]/25 hover:shadow-[#2F81F7]/40 transition-all duration-300 hover:scale-105 font-medium text-base"
            >
              <Code2 className="w-5 h-5" />
              Generate README
            </button>
            
            <button
              onClick={onTemplatesClick}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#2F81F7]/40 bg-[#161B22]/50 backdrop-blur-sm hover:bg-[#161B22] hover:border-[#2F81F7]/60 text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 font-medium text-base"
            >
              View Templates
            </button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="flex items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGithubClick}
                className="w-16 h-16 rounded-2xl bg-[#161B22] border border-[#2F81F7]/30 flex items-center justify-center backdrop-blur-sm hover:border-[#2F81F7]/60 hover:shadow-lg hover:shadow-[#2F81F7]/20 transition-all cursor-pointer"
                title="Visit GitHub"
              >
                <Github className="w-8 h-8 text-[#58A6FF]" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGenerateClick}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2F81F7] to-[#58A6FF] flex items-center justify-center shadow-lg shadow-[#2F81F7]/30 hover:shadow-xl hover:shadow-[#2F81F7]/50 transition-all cursor-pointer"
                title="Start Building"
              >
                <Code2 className="w-10 h-10 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onTemplatesClick}
                className="w-16 h-16 rounded-2xl bg-[#161B22] border border-[#2F81F7]/30 flex items-center justify-center backdrop-blur-sm hover:border-[#2F81F7]/60 hover:shadow-lg hover:shadow-[#2F81F7]/20 transition-all cursor-pointer"
                title="View Templates"
              >
                <Sparkles className="w-8 h-8 text-[#58A6FF]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}