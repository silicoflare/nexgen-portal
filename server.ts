import { createServer } from "https";
import { parse } from "url";
import next from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const isDev = process.env.NODE_ENV !== "production";
const HOST = process.env.HOST || "127.0.0.1"; // Set the IP to bind
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// SSL Certificate Paths
const keyPath = process.env.SSL_KEY || join(process.cwd(), ".certs", "key.pem");
const certPath =
  process.env.SSL_CERT || join(process.cwd(), ".certs", "cert.pem");

// Ensure SSL certificates exist
if (!existsSync(keyPath) || !existsSync(certPath)) {
  console.error(
    "❌ SSL certificates not found! Please provide valid key.pem and cert.pem."
  );
  process.exit(1);
}

// Load the SSL certificates
const httpsOptions = {
  key: readFileSync(keyPath),
  cert: readFileSync(certPath),
};

// Initialize Next.js
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, HOST, () => {
    console.log(
      `🚀 Server running at https://${HOST}:${PORT} (${
        isDev ? "Development" : "Production"
      })`
    );
  });
});
