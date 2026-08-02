import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import fs from "fs";
import path from "path";

function transformMockupCode(html) {
  const regex =
    /<pre class="astro-code github-dark" style="background-color:#24292e;color:#e1e4e8; overflow-x: auto;" tabindex="0" data-language="([^"]*)"><code>([\s\S]*?)<\/code><\/pre>/g;

  return html.replace(regex, (match, lang, codeContent) => {
    const lines = codeContent
      .split("\n")
      .filter((line) => line.trim() || line.includes('class="line"'))
      .map((line) => line.replace(/<\/?span[^>]*>/g, ""))
      .filter(Boolean);

    const preElements = lines
      .map((line, i) => {
        const prefix = i === 0 ? "$" : ">";
        const cls =
          i === lines.length - 1 && lines.length > 1
            ? ' class="text-success"'
            : i > 0
              ? ' class="text-warning"'
              : "";
        return `<pre data-prefix="${prefix}"${cls}><code>${line}</code></pre>`;
      })
      .join("\n");

    return `<div class="mockup-code w-full">\n${preElements}\n</div>`;
  });
}

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "mockup-code-dev",
        enforce: "post",
        transformIndexHtml(html) {
          return transformMockupCode(html);
        },
      },
    ],
  },
  integrations: [
    mdx(),
    pagefind(),
    {
      name: "mockup-code-build",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          function processHtmlFiles(dir) {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                processHtmlFiles(fullPath);
              } else if (entry.name.endsWith(".html")) {
                let html = fs.readFileSync(fullPath, "utf8");
                const newHtml = transformMockupCode(html);
                if (newHtml !== html) {
                  fs.writeFileSync(fullPath, newHtml);
                }
              }
            }
          }

          processHtmlFiles(new URL(dir).pathname);
        },
      },
    },
  ],
});
