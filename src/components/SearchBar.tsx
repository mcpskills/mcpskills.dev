'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  type: 'all' | 'skill' | 'mcp';
  sortBy: 'popular' | 'newest' | 'rating' | 'downloads';
  category: string;
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    sortBy: 'popular',
    category: 'All Categories',
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleFilterUpdate = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value } as FilterState;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search and Type Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search packages..."
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Type Tabs */}
        <Tabs
          value={filters.type}
          onValueChange={(v) => handleFilterUpdate('type', v)}
          className="shrink-0"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mcp">MCP</TabsTrigger>
            <TabsTrigger value="skill">Skills</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filter Toggle */}
        <Button
          variant={showFilters ? 'secondary' : 'outline'}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Sort by</label>
            <Select
              value={filters.sortBy}
              onValueChange={(v) => handleFilterUpdate('sortBy', v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select
              value={filters.category}
              onValueChange={(v) => handleFilterUpdate('category', v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
                <SelectItem value="AI & ML">AI & ML</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              setFilters({ type: 'all', sortBy: 'popular', category: 'All Categories' });
              onFilterChange({ type: 'all', sortBy: 'popular', category: 'All Categories' });
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
