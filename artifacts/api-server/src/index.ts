import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files for cyber-safety-hub (frontend)
const frontendPath = path.resolve(__dirname, "../../cyber-safety-hub/dist/public");
app.use(express.static(frontendPath));

// Serve static files for cyber-surakshit-video
const videoPath = path.resolve(__dirname, "../../cyber-surakshit-video/dist/public");
app.use("/cyber-surakshit-video", express.static(videoPath));

// Fallback for SPA routing (frontend)
app.get(/^(?!\/api|\/cyber-surakshit-video).*$/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
