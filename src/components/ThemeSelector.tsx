import { motion } from 'motion/react';
import { Sun, Moon, Zap, Sparkles } from 'lucide-react';
import { Theme } from '../App';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const themes: Array<{ value: Theme; icon: typeof Sun; label: string }> = [
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'neon', icon: Zap, label: 'Neon' },
    { value: 'gradient', icon: Sparkles, label: 'Gradient' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="flex gap-2 bg-[#161B22]/80 backdrop-blur-md border border-[#2F81F7]/20 rounded-2xl p-2">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.value}
              onClick={() => onThemeChange(theme.value)}
              className={`
                relative p-3 rounded-xl transition-all duration-300
                ${currentTheme === theme.value 
                  ? 'bg-[#2F81F7] text-white shadow-lg shadow-[#2F81F7]/30' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2F81F7]/10'
                }
              `}
              title={theme.label}
            >
              <Icon className="w-5 h-5" />
              {currentTheme === theme.value && (
                <motion.div
                  layoutId="theme-indicator"
                  className="absolute inset-0 bg-[#2F81F7] rounded-xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
