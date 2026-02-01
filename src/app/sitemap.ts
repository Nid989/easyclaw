import { MetadataRoute } from "next";

const BASE_URL = "https://easyclaw.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [
    "how-to-install-clawdbot",
    "moltbot-install-guide",
    "openclaw-windows-setup",
    "npm-install-openclaw",
    "openclaw-ubuntu-install",
    "clawdbot-vs-moltbot-vs-openclaw",
    "openclaw-mac-install",
    "openclaw-whatsapp-setup",
    "openclaw-telegram-bot",
    "openclaw-discord-bot",
    "openclaw-local-ai-assistant",
    "clawdbot-not-working",
    "openclaw-vs-chatgpt",
    "install-nodejs-for-openclaw",
    "openclaw-raspberry-pi",
    "openclaw-slack-integration",
    "what-is-openclaw",
    "openclaw-docker-install",
    "openclaw-skills-plugins",
    "openclaw-security-privacy",
  ];

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date("2025-01-31"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/install`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
