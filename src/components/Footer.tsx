import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Box, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: [
      { label: 'Marketplace', href: '#marketplace' },
      { label: 'MCP Servers', href: '#mcp' },
      { label: 'Skills', href: '#skills' },
      { label: 'Pricing', href: '#pricing' },
    ],
    Developers: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'SDK', href: '#sdk' },
      { label: 'Examples', href: '#examples' },
    ],
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    Legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'License', href: '#license' },
    ],
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container max-w-screen-2xl py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Box className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">MCP Market</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The package manager for AI tools. Discover, install, and share MCP servers and skills.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 MCP Market. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              All systems operational
            </span>
            <span className="font-mono">v2.4.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
