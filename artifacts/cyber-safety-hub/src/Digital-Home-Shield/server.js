const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve frontend build
app.use(express.static(path.join(__dirname, "artifacts/cyber-safety-hub/dist")));

// Example API
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// React routing fix
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "artifacts/cyber-safety-hub/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});