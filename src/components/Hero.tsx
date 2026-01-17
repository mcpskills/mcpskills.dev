'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx @anthropic/mcp install github-server');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern" />

      <div className="container relative max-w-screen-2xl py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            v2.0 — Now with Skills support
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The package manager for{' '}
            <span className="text-primary">AI tools</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover, install, and share MCP servers and skills that extend Claude&apos;s capabilities.
            Built by developers, for developers.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#marketplace">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#docs">
                Read the Docs
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">2,847</span>
              <span>Packages</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">523</span>
              <span>MCP Servers</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">1.2M+</span>
              <span>Installs</span>
            </div>
          </div>

          {/* Terminal Demo */}
          <div className="mt-12 w-full max-w-2xl">
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">$</span>
                  <code className="text-foreground">
                    npx @anthropic/mcp install github-server
                  </code>
                  <button
                    onClick={handleCopy}
                    className="ml-auto p-1.5 hover:bg-muted rounded transition-colors"
                    title="Copy command"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>
                    <span className="text-yellow-600 dark:text-yellow-500">→</span> Installing github-server@2.1.0...
                  </p>
                  <p>
                    <span className="text-green-600 dark:text-green-500">✓</span> Added to claude_desktop_config.json
                  </p>
                  <p>
                    <span className="text-green-600 dark:text-green-500">✓</span> Ready! Restart Claude to use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
