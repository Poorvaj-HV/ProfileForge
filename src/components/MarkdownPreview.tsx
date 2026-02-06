interface MarkdownPreviewProps {
  markdown: string;
  theme?: string;
}

export function MarkdownPreview({ markdown, theme = 'dark' }: MarkdownPreviewProps) {
  if (!markdown) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p style={{ fontSize: '1rem' }}>Start filling in your details to see the preview...</p>
      </div>
    );
  }

  // Theme styles mapping
  const themeStyles = {
    dark: {
      bg: 'bg-[#161B22]',
      text: 'text-gray-200',
      heading: 'text-white',
      link: 'text-[#58A6FF]',
      border: 'border-[#2F81F7]/20',
    },
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      link: 'text-blue-600',
      border: 'border-gray-200',
    },
    neon: {
      bg: 'bg-[#0a0e27]',
      text: 'text-cyan-100',
      heading: 'text-cyan-400',
      link: 'text-pink-400',
      border: 'border-cyan-500/20',
    },
    gradient: {
      bg: 'bg-gradient-to-br from-purple-900/30 to-pink-900/30',
      text: 'text-purple-100',
      heading: 'text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text',
      link: 'text-purple-400',
      border: 'border-purple-500/20',
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.dark;

  // Simple markdown to HTML conversion for preview
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    const html: JSX.Element[] = [];
    let key = 0;

    lines.forEach((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        html.push(<h1 key={key++} className={`mb-4 mt-6 ${currentTheme.heading} font-bold`} style={{ fontSize: '2rem' }}>{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        html.push(<h2 key={key++} className={`mb-3 mt-5 ${currentTheme.heading} font-semibold`} style={{ fontSize: '1.5rem' }}>{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        html.push(<h3 key={key++} className={`mb-2 mt-4 ${currentTheme.heading} font-semibold`} style={{ fontSize: '1.25rem' }}>{line.substring(4)}</h3>);
      }
      // Lists
      else if (line.startsWith('- ')) {
        const content = line.substring(2);
        // Handle markdown links [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(content)) !== null) {
          if (match.index > lastIndex) {
            parts.push(content.substring(lastIndex, match.index));
          }
          parts.push(
            <a 
              key={`link-${key++}`}
              href={match[2]} 
              className={`${currentTheme.link} hover:underline`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {match[1]}
            </a>
          );
          lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < content.length) {
          parts.push(content.substring(lastIndex));
        }

        html.push(
          <li key={key++} className={`ml-4 mb-1 ${currentTheme.text}`} style={{ fontSize: '0.95rem' }}>
            {parts.length > 0 ? parts : content}
          </li>
        );
      }
      // Images (badges, stats, etc.)
      else if (line.includes('![') && line.includes('](')) {
        const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        const matches = [...line.matchAll(imgRegex)];
        
        html.push(
          <div key={key++} className="flex flex-wrap gap-2 mb-4">
            {matches.map((match, i) => (
              <img
                key={`img-${key++}-${i}`}
                src={match[2]}
                alt={match[1]}
                className="inline-block"
              />
            ))}
          </div>
        );
      }
      // Regular text
      else if (line.trim()) {
        html.push(<p key={key++} className={`mb-3 ${currentTheme.text}`} style={{ fontSize: '1rem' }}>{line}</p>);
      }
      // Empty line
      else {
        html.push(<br key={key++} />);
      }
    });

    return html;
  };

  return (
    <div className={`markdown-preview ${currentTheme.bg} ${currentTheme.border} rounded-2xl p-6 min-h-96 max-h-[600px] overflow-y-auto`}>
      {renderMarkdown(markdown)}
    </div>
  );
}