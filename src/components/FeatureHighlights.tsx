import { motion } from 'motion/react';
import { Eye, Palette, Code, Copy, TrendingUp, Zap } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See your README update in real-time as you type',
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description: 'Choose from multiple beautiful themes and color schemes',
  },
  {
    icon: Code,
    title: 'Syntax Highlighting',
    description: 'Professional markdown rendering with code support',
  },
  {
    icon: Copy,
    title: 'One-Click Copy',
    description: 'Export your README markdown instantly',
  },
  {
    icon: TrendingUp,
    title: 'GitHub Stats',
    description: 'Auto-integrate stats, badges, and activity graphs',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate professional READMEs in seconds',
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white font-semibold" style={{ fontSize: '2.5rem' }}>Powerful Features</h2>
          <p className="text-gray-300" style={{ fontSize: '1.125rem' }}>
            Everything you need to create an impressive GitHub profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group p-6 bg-[#161B22]/50 backdrop-blur-sm border-[#2F81F7]/20 rounded-3xl hover:border-[#2F81F7]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2F81F7]/10 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2F81F7] to-[#58A6FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-white font-semibold" style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
                <p className="text-gray-300 text-sm" style={{ fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}