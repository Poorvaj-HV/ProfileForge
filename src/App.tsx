import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { FeatureHighlights } from './components/FeatureHighlights';
import { EditorSection } from './components/EditorSection';
import { TemplateGallery } from './components/TemplateGallery';
import { Footer } from './components/Footer';
import { ThemeSelector } from './components/ThemeSelector';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  projects: Array<{
    name: string;
    description: string;
    link: string;
  }>;
  showStats: boolean;
  showBadges: boolean;
}

export type Theme = 'dark' | 'light' | 'neon' | 'gradient';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    title: '',
    bio: '',
    skills: [],
    socials: {},
    projects: [],
    showStats: true,
    showBadges: true,
  });

  const githubInputRef = useRef<HTMLInputElement>(null);
  const fetchGithubRef = useRef<(() => void) | null>(null);

  const scrollToEditor = () => {
    document.getElementById('editor-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTemplates = () => {
    document.getElementById('template-gallery')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleGithubAction = () => {
    if (profileData.socials.github?.trim()) {
      // Option 3: If username exists, trigger fetch
      if (fetchGithubRef.current) {
        fetchGithubRef.current();
      }
    } else {
      // Option 1: If no username, scroll and focus input
      scrollToEditor();
      setTimeout(() => {
        githubInputRef.current?.focus();
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0D1117] text-white theme-${currentTheme}`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#161B22',
            color: '#fff',
            border: '1px solid #2F81F7',
          },
        }}
      />
      
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2F81F7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#58A6FF]/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        
        <HeroSection 
          onGenerateClick={scrollToEditor}
          onTemplatesClick={scrollToTemplates}
          onGithubClick={handleGithubAction}
        />
        
        <FeatureHighlights />
        
        <EditorSection 
          profileData={profileData}
          setProfileData={setProfileData}
          currentTheme={currentTheme}
          githubInputRef={githubInputRef}
          fetchGithubRef={fetchGithubRef}
        />
        
        <TemplateGallery 
          onTemplateSelect={(template) => {
            setProfileData(template);
            scrollToEditor();
            toast.success('Template loaded successfully!');
          }}
        />
        
        <Footer />
      </div>
    </div>
  );
}