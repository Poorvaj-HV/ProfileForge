import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, Star } from 'lucide-react';
import { ProfileData } from '../App';
import { useState } from 'react';

interface TemplateGalleryProps {
  onTemplateSelect: (template: ProfileData) => void;
}

const templates: Array<{ 
  id: string; 
  name: string; 
  tags: string[]; 
  data: ProfileData;
  preview: string;
}> = [
  {
    id: '1',
    name: 'Minimal Developer',
    tags: ['Minimal', 'Clean'],
    preview: 'Simple and clean profile with essential information',
    data: {
      name: 'Alex Johnson',
      title: 'Software Engineer',
      bio: 'Building elegant solutions to complex problems.',
      skills: ['React', 'TypeScript', 'Node.js'],
      socials: { github: 'alexjohnson' },
      projects: [],
      showStats: false,
      showBadges: true,
    },
  },
  {
    id: '2',
    name: 'Full Stack Pro',
    tags: ['Stats', 'Badges', 'Stylish'],
    preview: 'Complete profile with stats, badges, and projects',
    data: {
      name: 'Sarah Chen',
      title: 'Full Stack Developer',
      bio: 'Passionate about creating scalable web applications and contributing to open source.',
      skills: ['JavaScript', 'Python', 'React', 'Django', 'PostgreSQL', 'Docker'],
      socials: { 
        github: 'sarahchen',
        linkedin: 'sarahchen',
        twitter: 'sarahchen',
      },
      projects: [
        {
          name: 'E-Commerce Platform',
          description: 'Modern shopping experience',
          link: 'https://github.com/example/ecommerce',
        },
      ],
      showStats: true,
      showBadges: true,
    },
  },
  {
    id: '3',
    name: 'Open Source Contributor',
    tags: ['Stats', 'Projects'],
    preview: 'Showcase your open source contributions',
    data: {
      name: 'Mike Rodriguez',
      title: 'Open Source Enthusiast',
      bio: 'Contributing to the developer community one PR at a time.',
      skills: ['Go', 'Rust', 'Kubernetes', 'Linux'],
      socials: { github: 'mikerodriguez' },
      projects: [
        {
          name: 'CLI Tool',
          description: 'Productivity tool for developers',
          link: 'https://github.com/example/cli-tool',
        },
        {
          name: 'API Gateway',
          description: 'High-performance API gateway',
          link: 'https://github.com/example/gateway',
        },
      ],
      showStats: true,
      showBadges: false,
    },
  },
  {
    id: '4',
    name: 'Designer & Developer',
    tags: ['Stylish', 'Minimal'],
    preview: 'Perfect blend of design and development',
    data: {
      name: 'Emma Wilson',
      title: 'UI/UX Developer',
      bio: 'Crafting beautiful, user-centered digital experiences.',
      skills: ['Figma', 'React', 'CSS', 'Animation'],
      socials: { 
        github: 'emmawilson',
        portfolio: 'https://emmawilson.design',
      },
      projects: [],
      showStats: false,
      showBadges: true,
    },
  },
  {
    id: '5',
    name: 'Data Scientist',
    tags: ['Badges', 'Stats'],
    preview: 'Showcase your data science expertise',
    data: {
      name: 'David Kim',
      title: 'Data Scientist & ML Engineer',
      bio: 'Transforming data into actionable insights using machine learning.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'],
      socials: { 
        github: 'davidkim',
        linkedin: 'davidkim',
      },
      projects: [
        {
          name: 'ML Pipeline',
          description: 'Scalable machine learning pipeline',
          link: 'https://github.com/example/ml-pipeline',
        },
      ],
      showStats: true,
      showBadges: true,
    },
  },
  {
    id: '6',
    name: 'Mobile Developer',
    tags: ['Minimal', 'Projects'],
    preview: 'Focus on mobile development projects',
    data: {
      name: 'Lisa Park',
      title: 'Mobile Developer',
      bio: 'Creating delightful mobile experiences for iOS and Android.',
      skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
      socials: { github: 'lisapark' },
      projects: [
        {
          name: 'Fitness App',
          description: 'Cross-platform fitness tracking app',
          link: 'https://github.com/example/fitness-app',
        },
        {
          name: 'Chat Application',
          description: 'Real-time messaging platform',
          link: 'https://github.com/example/chat-app',
        },
      ],
      showStats: false,
      showBadges: true,
    },
  },
];

export function TemplateGallery({ onTemplateSelect }: TemplateGalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const filters = ['All', 'Minimal', 'Stylish', 'Badges', 'Stats', 'Projects'];

  const filteredTemplates = selectedFilter === 'All' 
    ? templates 
    : templates.filter(t => t.tags.includes(selectedFilter));

  return (
    <section id="template-gallery" className="py-24 px-6 bg-gradient-to-b from-transparent to-[#0D1117]/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-white font-semibold" style={{ fontSize: '2.5rem' }}>Choose a Template</h2>
          <p className="text-gray-300 mb-8" style={{ fontSize: '1.125rem' }}>
            Start with a professionally designed template
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={
                  selectedFilter === filter
                    ? 'px-4 py-2 bg-[#2F81F7] hover:bg-[#58A6FF] text-white rounded-xl transition-all text-sm font-medium'
                    : 'px-4 py-2 border border-[#2F81F7]/40 bg-transparent hover:bg-[#2F81F7]/20 text-white rounded-xl transition-all text-sm font-medium'
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group p-6 bg-[#161B22]/50 backdrop-blur-sm border-[#2F81F7]/20 rounded-3xl hover:border-[#2F81F7]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2F81F7]/10">
                {/* Preview area */}
                <div className="mb-4 h-32 bg-[#0D1117] rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2F81F7]/20 to-[#58A6FF]/20" />
                  <div className="relative z-10 p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2F81F7] to-[#58A6FF] mx-auto mb-2 flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-300">{template.preview}</p>
                  </div>
                </div>

                <h3 className="mb-2 text-white font-semibold" style={{ fontSize: '1.125rem' }}>{template.name}</h3>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className="bg-[#0D1117] border border-[#2F81F7]/30 rounded-lg text-xs text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <button
                  onClick={() => onTemplateSelect(template.data)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2F81F7]/10 hover:bg-[#2F81F7] text-white border border-[#2F81F7]/30 hover:border-[#2F81F7] rounded-xl py-2 transition-all duration-300 font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Use Template
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}