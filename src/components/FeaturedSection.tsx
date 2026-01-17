'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Download, Box, Command } from 'lucide-react';
import { featuredItems } from '@/data/marketplace';

export default function FeaturedSection() {
  return (
    <section className="border-b py-16">
      <div className="container max-w-screen-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
            <p className="text-muted-foreground">
              Hand-picked by our team for exceptional quality
            </p>
          </div>
          <Button variant="ghost" asChild>
            <a href="#marketplace">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Featured Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant={item.type === 'mcp' ? 'default' : 'secondary'}>
                    {item.type === 'mcp' ? (
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
              <CardContent>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {item.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {item.rating}
                    </span>
                  </div>
                  <span>v{item.version}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
