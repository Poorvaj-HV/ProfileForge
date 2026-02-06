import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Download, Plus, X, Sparkles, Github as GithubIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { MarkdownPreview } from './MarkdownPreview';
import { toast } from 'sonner@2.0.3';
import { ProfileData } from '../App';
import { fetchGitHubUser, fetchGitHubRepos, isValidGitHubUsername, getGitHubStatsUrls, getGitHubTrophyUrl } from '../utils/githubApi';

interface EditorSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  currentTheme: string;
  githubInputRef?: React.RefObject<HTMLInputElement>;
  fetchGithubRef?: React.MutableRefObject<(() => void) | null>;
}

export function EditorSection({ 
  profileData, 
  setProfileData, 
  currentTheme, 
  githubInputRef,
  fetchGithubRef
}: EditorSectionProps) {
  const [skillInput, setSkillInput] = useState('');
  const [isValidatingGithub, setIsValidatingGithub] = useState(false);
  const [githubValidationStatus, setGithubValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(s => s !== skill),
    });
  };

  const addProject = () => {
    setProfileData({
      ...profileData,
      projects: [...profileData.projects, { name: '', description: '', link: '' }],
    });
  };

  const updateProject = (index: number, field: keyof ProfileData['projects'][0], value: string) => {
    const newProjects = [...profileData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProfileData({ ...profileData, projects: newProjects });
  };

  const removeProject = (index: number) => {
    setProfileData({
      ...profileData,
      projects: profileData.projects.filter((_, i) => i !== index),
    });
  };

  const copyMarkdown = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown);
    toast.success('Copied to clipboard! ✓');
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    toast.success('Downloaded README.md');
  };

  const autoGenerate = () => {
    setProfileData({
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with expertise in modern web technologies. Love building scalable applications and contributing to open source.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Docker'],
      socials: {
        github: 'johndoe',
        linkedin: 'johndoe',
        twitter: 'johndoe',
        portfolio: 'https://johndoe.dev',
      },
      projects: [
        {
          name: 'Awesome Project',
          description: 'A revolutionary web application',
          link: 'https://github.com/johndoe/awesome-project',
        },
      ],
      showStats: true,
      showBadges: true,
    });
    toast.success('Auto-generated template loaded!');
  };

  const generateMarkdown = () => {
    let md = '';

    // Header with name and username
    if (profileData.name) {
      if (profileData.socials.github) {
        md += `# Hi there! 👋 I'm ${profileData.name} (@${profileData.socials.github})\n\n`;
      } else {
        md += `# Hi there! 👋 I'm ${profileData.name}\n\n`;
      }
    } else if (profileData.socials.github) {
      // If no name but has GitHub username
      md += `# Hi there! 👋 I'm @${profileData.socials.github}\n\n`;
    }

    if (profileData.title) {
      md += `## ${profileData.title}\n\n`;
    }

    if (profileData.bio) {
      md += `${profileData.bio}\n\n`;
    }

    if (profileData.skills.length > 0) {
      md += `### 🛠️ Tech Stack\n\n`;
      md += profileData.skills.map(skill => {
        // Encode special characters for URL
        const encodedSkill = encodeURIComponent(skill);
        const logoName = skill.toLowerCase().replace(/\+\+/g, 'plusplus').replace(/\+/g, 'plus').replace(/\s+/g, '');
        return `![${skill}](https://img.shields.io/badge/-${encodedSkill}-05122A?style=flat&logo=${logoName})`;
      }).join(' ');
      md += '\n\n';
    }

    if (profileData.projects.length > 0) {
      md += `### 🚀 Featured Projects\n\n`;
      profileData.projects.forEach(project => {
        if (project.name) {
          md += `- **[${project.name}](${project.link || '#'})** - ${project.description}\n`;
        }
      });
      md += '\n';
    }

    // Enhanced social connections with usernames
    const hasSocials = Object.values(profileData.socials).some(v => v);
    if (hasSocials) {
      md += `### 🔗 Connect with me\n\n`;
      
      if (profileData.socials.github) {
        md += `[![GitHub](https://img.shields.io/badge/@${profileData.socials.github}-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${profileData.socials.github})\n`;
      }
      if (profileData.socials.linkedin) {
        md += `[![LinkedIn](https://img.shields.io/badge/@${profileData.socials.linkedin}-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${profileData.socials.linkedin})\n`;
      }
      if (profileData.socials.twitter) {
        md += `[![Twitter](https://img.shields.io/badge/@${profileData.socials.twitter}-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profileData.socials.twitter})\n`;
      }
      if (profileData.socials.portfolio) {
        md += `[![Portfolio](https://img.shields.io/badge/Portfolio-FF7139?style=for-the-badge&logo=firefox&logoColor=white)](${profileData.socials.portfolio})\n`;
      }
      md += '\n';
    }

    if (profileData.showStats && profileData.socials.github) {
      md += `### 📊 GitHub Stats\n\n`;
      md += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${profileData.socials.github}&show_icons=true&theme=radical)\n\n`;
      md += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${profileData.socials.github}&layout=compact&theme=radical)\n\n`;
    }

    return md;
  };

  const validateGithub = async (username: string) => {
    if (!username.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }

    if (!isValidGitHubUsername(username)) {
      toast.error('Invalid GitHub username format');
      setGithubValidationStatus('error');
      return;
    }

    setIsValidatingGithub(true);
    setGithubValidationStatus('idle');

    try {
      const user = await fetchGitHubUser(username);
      
      if (user) {
        setGithubValidationStatus('success');
        
        // Auto-fill profile data from GitHub
        const updatedData = { ...profileData };
        
        if (user.name && !profileData.name) {
          updatedData.name = user.name;
        }
        
        if (user.bio && !profileData.bio) {
          updatedData.bio = user.bio;
        }
        
        if (user.blog && !profileData.socials.portfolio) {
          updatedData.socials.portfolio = user.blog;
        }
        
        if (user.twitter_username && !profileData.socials.twitter) {
          updatedData.socials.twitter = user.twitter_username;
        }
        
        setProfileData(updatedData);
        
        // Fetch top repositories
        const repos = await fetchGitHubRepos(username, 3);
        if (repos.length > 0 && profileData.projects.length === 0) {
          const projects = repos.map(repo => ({
            name: repo.name,
            description: repo.description || '',
            link: repo.html_url,
          }));
          setProfileData({ ...updatedData, projects });
        }
        
        toast.success(`GitHub profile loaded: ${user.login}`);
      } else {
        setGithubValidationStatus('error');
        toast.error('GitHub user not found');
      }
    } catch (error) {
      setGithubValidationStatus('error');
      toast.error('Failed to fetch GitHub data');
    } finally {
      setIsValidatingGithub(false);
    }
  };

  useEffect(() => {
    if (fetchGithubRef) {
      fetchGithubRef.current = () => validateGithub(profileData.socials.github || '');
    }
  }, [fetchGithubRef, profileData.socials.github]);

  useEffect(() => {
    if (githubInputRef) {
      const currentRef = githubInputRef.current;
      if (currentRef) {
        currentRef.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            validateGithub(currentRef.value);
          }
        });
      }
    }
  }, [githubInputRef]);

  return (
    <section id="editor-section" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-white font-semibold" style={{ fontSize: '2.5rem' }}>Build Your README</h2>
          <p className="text-gray-300" style={{ fontSize: '1.125rem' }}>
            Customize every detail with live preview
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-[#161B22]/80 backdrop-blur-sm border-[#2F81F7]/20 rounded-3xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold" style={{ fontSize: '1.5rem' }}>Editor</h3>
                <button
                  onClick={autoGenerate}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[#2F81F7]/40 bg-transparent hover:bg-[#2F81F7]/20 text-white rounded-xl transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Auto-Generate
                </button>
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#0D1117] rounded-2xl p-1">
                  <TabsTrigger value="basic" className="rounded-xl text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2F81F7]">Basic</TabsTrigger>
                  <TabsTrigger value="skills" className="rounded-xl text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2F81F7]">Skills</TabsTrigger>
                  <TabsTrigger value="projects" className="rounded-xl text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2F81F7]">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Name</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Your Name"
                      className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">Title</Label>
                    <Input
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      placeholder="e.g., Full Stack Developer"
                      className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">Bio</Label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] min-h-24 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">GitHub Username</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          ref={githubInputRef}
                          value={profileData.socials.github || ''}
                          onChange={(e) => {
                            setProfileData({ 
                              ...profileData, 
                              socials: { ...profileData.socials, github: e.target.value }
                            });
                            setGithubValidationStatus('idle');
                          }}
                          placeholder="username"
                          className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] text-white placeholder:text-gray-500 pr-10"
                        />
                        {githubValidationStatus === 'success' && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {githubValidationStatus === 'error' && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <button
                        onClick={() => validateGithub(profileData.socials.github || '')}
                        disabled={isValidatingGithub || !profileData.socials.github}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#2F81F7] hover:bg-[#58A6FF] text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isValidatingGithub ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <GithubIcon className="w-4 h-4" />
                        )}
                        Fetch
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">
                      Click "Fetch" to auto-fill your profile from GitHub
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">LinkedIn</Label>
                    <Input
                      value={profileData.socials.linkedin || ''}
                      onChange={(e) => setProfileData({ 
                        ...profileData, 
                        socials: { ...profileData.socials, linkedin: e.target.value }
                      })}
                      placeholder="username"
                      className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <Label className="text-gray-200">Show GitHub Stats</Label>
                    <Switch
                      checked={profileData.showStats}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, showStats: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <Label className="text-gray-200">Show Badges</Label>
                    <Switch
                      checked={profileData.showBadges}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, showBadges: checked })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Add Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="e.g., JavaScript"
                        className="bg-[#0D1117] border-[#2F81F7]/20 rounded-xl focus:border-[#2F81F7] text-white placeholder:text-gray-500"
                      />
                      <button 
                        onClick={addSkill}
                        className="w-10 h-10 shrink-0 bg-[#2F81F7] hover:bg-[#58A6FF] rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="bg-[#0D1117] border border-[#2F81F7]/30 rounded-xl px-3 py-1 text-white"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-red-400 text-gray-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4 mt-6">
                  <button
                    onClick={addProject}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#2F81F7]/40 bg-transparent hover:bg-[#2F81F7]/20 text-white rounded-xl py-2 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {profileData.projects.map((project, index) => (
                      <Card key={index} className="p-4 bg-[#0D1117] border-[#2F81F7]/20 rounded-2xl">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-gray-200">Project {index + 1}</Label>
                            <button
                              onClick={() => removeProject(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                            placeholder="Project Name"
                            className="bg-[#161B22] border-[#2F81F7]/20 rounded-xl text-white placeholder:text-gray-500"
                          />
                          <Input
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder="Description"
                            className="bg-[#161B22] border-[#2F81F7]/20 rounded-xl text-white placeholder:text-gray-500"
                          />
                          <Input
                            value={project.link}
                            onChange={(e) => updateProject(index, 'link', e.target.value)}
                            placeholder="https://github.com/..."
                            className="bg-[#161B22] border-[#2F81F7]/20 rounded-xl text-white placeholder:text-gray-500"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-[#0D1117] border-[#2F81F7]/20 rounded-3xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold" style={{ fontSize: '1.5rem' }}>Preview</h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyMarkdown}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[#2F81F7]/40 bg-transparent hover:bg-[#2F81F7]/20 text-white rounded-xl transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadMarkdown}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#2F81F7] hover:bg-[#58A6FF] text-white rounded-xl transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <MarkdownPreview markdown={generateMarkdown()} theme={currentTheme} />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}