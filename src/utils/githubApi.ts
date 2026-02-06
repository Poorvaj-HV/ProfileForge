// GitHub API utilities for fetching user data

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

/**
 * Fetch GitHub user profile data
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
}

/**
 * Fetch user's top repositories
 */
export async function fetchGitHubRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const data = await response.json();
    return data.filter((repo: GitHubRepo) => !repo.fork);
  } catch (error) {
    console.error('GitHub Repos API Error:', error);
    return [];
  }
}

/**
 * Validate GitHub username format
 */
export function isValidGitHubUsername(username: string): boolean {
  // GitHub usernames can only contain alphanumeric characters and hyphens
  // Cannot start or end with a hyphen
  // Maximum 39 characters
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return regex.test(username);
}

/**
 * Generate GitHub stats URLs
 */
export function getGitHubStatsUrls(username: string, theme: string = 'dark') {
  const themeMap: { [key: string]: string } = {
    dark: 'dark',
    light: 'default',
    neon: 'radical',
    gradient: 'tokyonight',
  };
  
  const selectedTheme = themeMap[theme] || 'dark';
  
  return {
    stats: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${selectedTheme}`,
    topLangs: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${selectedTheme}`,
    streak: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${selectedTheme}`,
  };
}

/**
 * Generate GitHub profile trophy URL
 */
export function getGitHubTrophyUrl(username: string, theme: string = 'dark') {
  const themeMap: { [key: string]: string } = {
    dark: 'darkhub',
    light: 'flat',
    neon: 'radical',
    gradient: 'monokai',
  };
  
  const selectedTheme = themeMap[theme] || 'darkhub';
  
  return `https://github-profile-trophy.vercel.app/?username=${username}&theme=${selectedTheme}&no-frame=true&margin-w=4`;
}
