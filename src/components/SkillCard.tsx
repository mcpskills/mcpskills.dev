'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  Star,
  ExternalLink,
  Shield,
  Box,
  Command,
} from 'lucide-react';
import { ComponentType } from 'react';

interface SkillCardProps {
  name: string;
  description: string;
  author: string;
  downloads: string;
  rating: number;
  version: string;
  tags: string[];
  type: 'skill' | 'mcp';
  icon: ComponentType<{ className?: string }>;
  verified?: boolean;
  lastUpdated?: string;
}

export default function SkillCard({
  name,
  description,
  author,
  downloads,
  rating,
  version,
  tags,
  type,
  icon: Icon,
  verified = false,
  lastUpdated,
}: SkillCardProps) {
  return (
    <Card className="group relative flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold leading-none">{name}</h3>
                {verified && (
                  <Shield className="h-3.5 w-3.5 text-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {author} · v{version}
              </p>
            </div>
          </div>
          <Badge variant={type === 'mcp' ? 'default' : 'secondary'} className="shrink-0">
            {type === 'mcp' ? (
              <>
                <Box className="mr-1 h-3 w-3" />
                MCP
              </>
            ) : (
              <>
                <Command className="mr-1 h-3 w-3" />
                Skill
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              {downloads}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              {rating.toFixed(1)}
            </span>
            {lastUpdated && (
              <span className="hidden sm:inline">{lastUpdated}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8">
              Install
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
