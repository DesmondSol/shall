import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Handle HTML requests - catch all routes that aren't static assets
  // This must come after vite.middlewares so Vite can handle assets first
  app.use("*", async (req, res, next) => {
    // If Vite middleware already handled the request, skip
    if (res.headersSent || res.writableEnded) {
      return;
    }

    const url = req.originalUrl;

    // Skip API routes
    if (url.startsWith("/api")) {
      return next();
    }

    // Skip if this is a static asset (has file extension and not .html)
    const pathWithoutQuery = url.split("?")[0];
    const hasFileExtension = /\.\w+$/.test(pathWithoutQuery);
    if (hasFileExtension && !pathWithoutQuery.endsWith(".html")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const html = await vite.transformIndexHtml(url, template);
      
      // Ensure proper headers are set for HTML content - no Content-Disposition
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.removeHeader("Content-Disposition"); // Ensure no download header
      res.status(200).send(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
