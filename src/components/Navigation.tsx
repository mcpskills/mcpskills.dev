'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Box,
  Menu,
  X,
  Github,
  BookOpen,
  Plus,
  ChevronDown,
  Command,
} from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Box className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">MCP Market</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                Browse
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                MCP Servers
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Command className="mr-2 h-4 w-4" />
                Skills
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="#docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="#examples"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search shortcut hint */}
          <Button
            variant="outline"
            className="hidden md:inline-flex h-9 w-64 justify-start text-sm text-muted-foreground"
          >
            <Command className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
            <Link href="#docs">
              <BookOpen className="h-4 w-4" />
              <span className="sr-only">Documentation</span>
            </Link>
          </Button>

          <Button size="sm" className="hidden md:inline-flex">
            <Plus className="mr-2 h-4 w-4" />
            Submit
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container py-4 space-y-3">
            <Link
              href="#marketplace"
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              MCP Servers
            </Link>
            <Link
              href="#skills"
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#docs"
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="#examples"
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Examples
            </Link>
            <div className="pt-3 border-t">
              <Button size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Submit a Tool
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
