import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCPSkills - The Package Manager for AI Agents",
  description: "Install MCP servers and AI skills with a single command. Like npm/pip for Claude, Codex, Cursor, and more.",
  keywords: ["MCP", "Model Context Protocol", "Skills", "AI", "Claude", "Package Manager", "Registry"],
  authors: [{ name: "MCPSkills" }],
  openGraph: {
    title: "MCPSkills - The Package Manager for AI Agents",
    description: "Install MCP servers and AI skills with a single command. Like npm/pip for AI tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCPSkills - The Package Manager for AI Agents",
    description: "Install MCP servers and AI skills with a single command. Like npm/pip for AI tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
