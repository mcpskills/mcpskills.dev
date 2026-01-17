'use client';

import { useState, useEffect } from 'react';
import { Search, Package, Terminal, Github, ExternalLink, Check, Copy } from 'lucide-react';

interface Package {
  id: number;
  name: string;
  type: 'skill' | 'mcp';
  description: string;
  author: string;
  downloads: number;
  version: string;
  verified: boolean;
  featured: boolean;
  category: string;
}

const API_BASE = 'https://api.mcpskills.dev/api/v1';

function formatDownloads(count: number): string {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
  return count.toString();
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="p-1.5 rounded hover:bg-gray-700 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  );
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'skill' | 'mcp'>('all');

  useEffect(() => {
    async function fetchPackages() {
      try {
        const [skillsRes, mcpRes] = await Promise.all([
          fetch(API_BASE + '/skills'),
          fetch(API_BASE + '/mcp')
        ]);
        const skills = await skillsRes.json();
        const mcp = await mcpRes.json();
        const all = [...(skills.packages || []), ...(mcp.packages || [])];
        all.sort((a, b) => b.downloads - a.downloads);
        setPackages(all);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const filtered = packages.filter(pkg => {
    const matchesSearch = !search ||
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === 'all' || pkg.type === filter;
    return matchesSearch && matchesType;
  });

  const mcpCount = packages.filter(p => p.type === 'mcp').length;
  const skillCount = packages.filter(p => p.type === 'skill').length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-semibold">MCPSkills</span>
          </div>
          <a
            href="https://github.com/mcpskills"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The Package Manager for AI Agents</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            npm/pip for AI agents. Install MCP servers and skills with a single command.
          </p>
        </div>

        {/* Installation Steps */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-12">
          <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium">1</span>
              <div className="flex-1">
                <p className="text-gray-300 mb-2">Install the CLI tools:</p>
                <div className="bg-gray-950 rounded border border-gray-800 p-3 font-mono text-sm flex items-center justify-between">
                  <code>npm install -g skill-get mcp-get</code>
                  <CopyButton text="npm install -g skill-get mcp-get" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium">2</span>
              <div className="flex-1">
                <p className="text-gray-300 mb-2">Install a skill:</p>
                <div className="bg-gray-950 rounded border border-gray-800 p-3 font-mono text-sm flex items-center justify-between">
                  <code>skill-get install pdf</code>
                  <CopyButton text="skill-get install pdf" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium">3</span>
              <div className="flex-1">
                <p className="text-gray-300 mb-2">Or install an MCP server:</p>
                <div className="bg-gray-950 rounded border border-gray-800 p-3 font-mono text-sm flex items-center justify-between">
                  <code>mcp-get install github</code>
                  <CopyButton text="mcp-get install github" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{packages.length}</p>
            <p className="text-gray-400 text-sm">Total Packages</p>
          </div>
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{mcpCount}</p>
            <p className="text-gray-400 text-sm">MCP Servers</p>
          </div>
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{skillCount}</p>
            <p className="text-gray-400 text-sm">Skills</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-900 border border-gray-800 hover:border-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('mcp')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'mcp' ? 'bg-blue-500 text-white' : 'bg-gray-900 border border-gray-800 hover:border-gray-700'}`}
            >
              MCP Servers
            </button>
            <button
              onClick={() => setFilter('skill')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'skill' ? 'bg-blue-500 text-white' : 'bg-gray-900 border border-gray-800 hover:border-gray-700'}`}
            >
              Skills
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-400 text-sm mb-4">
          Showing {filtered.length} packages
          {search && <span> matching &quot;{search}&quot;</span>}
        </p>

        {/* Package Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading packages...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No packages found</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${pkg.type === 'mcp' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`}>
                      {pkg.type === 'mcp' ? 'MCP' : 'Skill'}
                    </span>
                    {pkg.verified && (
                      <span className="text-blue-400" title="Verified">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">v{pkg.version}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">by {pkg.author}</span>
                  <span className="text-gray-500">{formatDownloads(pkg.downloads)} downloads</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="bg-gray-950 rounded p-2 font-mono text-xs flex items-center justify-between">
                    <code>{pkg.type === 'skill' ? 'skill-get' : 'mcp-get'} install {pkg.name}</code>
                    <CopyButton text={`${pkg.type === 'skill' ? 'skill-get' : 'mcp-get'} install ${pkg.name}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Package className="w-5 h-5" />
              <span>MCPSkills</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="https://github.com/mcpskills" className="hover:text-white transition-colors flex items-center gap-1">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://npmjs.com/package/skill-get" className="hover:text-white transition-colors flex items-center gap-1">
                <Terminal className="w-4 h-4" /> npm
              </a>
              <a href="https://api.mcpskills.dev/api/v1" className="hover:text-white transition-colors flex items-center gap-1">
                <ExternalLink className="w-4 h-4" /> API
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
