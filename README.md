# MCPSkills

The Package Manager for AI Agents - npm/pip for AI agents.

**Website:** [https://mcpskills.pages.dev](https://mcpskills.pages.dev)

## What is MCPSkills?

MCPSkills is a unified registry for:
- **Skills** - Prompt-based capabilities for AI agents (Claude Code, Cursor, Windsurf, etc.)
- **MCP Servers** - Model Context Protocol servers that extend AI agent capabilities

## Quick Start

### 1. Install the CLI tools

```bash
npm install -g skill-get mcp-get
```

### 2. Install a skill

```bash
skill-get install pdf
skill-get install code-review
skill-get install frontend-design
```

### 3. Install an MCP server

```bash
mcp-get install github
mcp-get install filesystem
mcp-get install memory
```

## CLI Tools

### skill-get

Install and manage AI skills for Claude Code and other AI agents.

```bash
skill-get install <name>    # Install a skill
skill-get search <query>    # Search for skills
skill-get list              # List installed skills
skill-get remove <name>     # Remove a skill
skill-get info <name>       # Show skill details
```

### mcp-get

Install and manage MCP servers for Claude Desktop.

```bash
mcp-get install <name>      # Install an MCP server
mcp-get search <query>      # Search for servers
mcp-get list                # List installed servers
mcp-get remove <name>       # Remove a server
mcp-get info <name>         # Show server details
```

## API

The MCPSkills API is available at `https://api.mcpskills.dev/api/v1`

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /skills` | List all skills |
| `GET /skills/:name` | Get skill details |
| `GET /mcp` | List all MCP servers |
| `GET /mcp/:name` | Get MCP server details |
| `GET /search?q=<query>` | Search packages |

## Development

This is a Next.js application deployed on Cloudflare Pages.

### Prerequisites

- Node.js 18+
- npm or bun

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static --project-name mcpskills
```

## Project Structure

```
mcpskills/
├── mcpskills.dev/          # This repo - website frontend
├── skill-get/              # Skills CLI tool
├── mcp-get/                # MCP servers CLI tool
├── mcpskills-plugin/       # Claude Code plugin
└── registry-api/           # Cloudflare Worker API
```

## Links

- **Website:** [mcpskills.pages.dev](https://mcpskills.pages.dev)
- **API:** [api.mcpskills.dev](https://api.mcpskills.dev/api/v1)
- **skill-get on npm:** [npmjs.com/package/skill-get](https://npmjs.com/package/skill-get)
- **mcp-get on npm:** [npmjs.com/package/mcp-get](https://npmjs.com/package/mcp-get)
- **GitHub:** [github.com/mcpskills](https://github.com/mcpskills)

## License

MIT
