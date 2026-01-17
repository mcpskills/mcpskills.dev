const API_BASE = 'https://api.mcpskills.dev/api/v1';

export interface Package {
  id: number;
  name: string;
  type: 'skill' | 'mcp';
  description: string;
  author: string;
  repository?: string;
  homepage?: string;
  license: string;
  keywords: string[];
  category: string;
  featured: boolean;
  verified: boolean;
  downloads: number;
  version: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  packages: Package[];
  total: number;
  page: number;
  limit: number;
}

export async function searchPackages(query?: string, type?: 'skill' | 'mcp'): Promise<SearchResult> {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (type) params.set('type', type);
  params.set('limit', '50');

  const response = await fetch(API_BASE + '/search?' + params);
  if (!response.ok) {
    throw new Error('Failed to search packages');
  }
  return response.json();
}

export async function getSkills(): Promise<Package[]> {
  const response = await fetch(API_BASE + '/skills');
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  const data = await response.json();
  return data.packages || [];
}

export async function getMCPServers(): Promise<Package[]> {
  const response = await fetch(API_BASE + '/mcp');
  if (!response.ok) {
    throw new Error('Failed to fetch MCP servers');
  }
  const data = await response.json();
  return data.packages || [];
}

export async function getAllPackages(): Promise<Package[]> {
  const [skills, mcp] = await Promise.all([getSkills(), getMCPServers()]);
  return [...skills, ...mcp].sort((a, b) => b.downloads - a.downloads);
}

export async function getPackage(type: 'skill' | 'mcp', name: string): Promise<Package> {
  const endpoint = type === 'skill' ? 'skills' : 'mcp';
  const response = await fetch(API_BASE + '/' + endpoint + '/' + name);
  if (!response.ok) {
    throw new Error('Failed to fetch ' + type + ': ' + name);
  }
  return response.json();
}

export function formatDownloads(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

export function getInstallCommand(pkg: Package): string {
  if (pkg.type === 'skill') {
    return 'skill-get install ' + pkg.name;
  }
  return 'mcp-get install ' + pkg.name;
}
