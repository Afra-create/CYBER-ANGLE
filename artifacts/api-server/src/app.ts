import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import router from "./routes";
import { logger } from "./lib/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup API routing
app.use("/api", router);


if (process.env.NODE_ENV !== "production") {
  // In development, proxy requests to the Vite development servers

  // Proxy /video to cyber-surakshit-video Vite server
  app.use("/video", createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: (path, req) => "/video" + path,
    ws: true,
  }));

  // Proxy all other non-API requests to cyber-safety-hub Vite server
  app.use("/", createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    ws: true,
  }));

} else {
  // In production, serve the built static assets

  // Serve static files for cyber-surakshit-video
  const videoPath = path.resolve(__dirname, "../../cyber-surakshit-video/dist/public");
  app.use("/video", express.static(videoPath));

  // Serve static files for cyber-safety-hub (frontend)
  const frontendPath = path.resolve(__dirname, "../../cyber-safety-hub/dist/public");
  app.use("/", express.static(frontendPath));

  // Fallback for SPA routing (frontend)
  app.get(/^(?!\/api|\/video).*$/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

export default app;
