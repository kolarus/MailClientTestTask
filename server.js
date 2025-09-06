import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3001;

// In-memory data that resets on server restart
let emails = [];
let folders = [];

// Load initial data from JSON files
async function loadInitialData() {
  try {
    const emailsData = await readFile(
      join(__dirname, "src/data/mock-emails.json"),
      "utf8",
    );
    const foldersData = await readFile(
      join(__dirname, "src/data/mock-folders.json"),
      "utf8",
    );

    emails = JSON.parse(emailsData);
    folders = JSON.parse(foldersData);

    console.log(
      `✅ Loaded ${emails.length} emails and ${folders.length} folders`,
    );
  } catch (error) {
    console.error("❌ Error loading initial data:", error.message);
    process.exit(1);
  }
}

// CORS headers
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Send JSON response with timeout
function sendJson(res, data, status = 200) {
  setTimeout(() => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }, 1500);
}

// Route handler
async function handleRequest(req, res) {
  setCorsHeaders(res);

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);

  try {
    if (method === "GET" && path === "/api/folders") {
      sendJson(res, folders);
      return;
    }

    // GET /api/emails - Get all emails (with 1.5s delay)
    if (method === "GET" && path === "/api/emails") {
      sendJson(res, emails);

      return;
    }

    // 404 - Route not found
    sendJson(res, { error: "Route not found" }, 404);
  } catch (error) {
    console.error("❌ Request error:", error.message);
    sendJson(res, { error: "Internal server error" }, 500);
  }
}

// Start server
async function startServer() {
  await loadInitialData();

  const server = createServer(handleRequest);

  server.listen(PORT, () => {
    console.log(
      `🚀 Simple Mock Email Server running at http://localhost:${PORT}`,
    );
    console.log("📧 Available endpoints:");
    console.log("  GET  /api/folders         - Get all folders");
    console.log("  GET  /api/emails          - Get all emails");
    console.log("");
    console.log(
      "💡 Read-only server - data loads fresh from JSON files on restart!",
    );
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("\n👋 Shutting down server...");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("\n👋 Shutting down server...");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error.message);
  process.exit(1);
});
