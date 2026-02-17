import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  let filePath;
  let contentType;

  if (req.url === "/") {
    filePath = path.join(__dirname, "public", "index.html");
    contentType = "text/html";
  } else if (req.url === "/style.css") {
    filePath = path.join(__dirname, "public", "style.css");
    contentType = "text/css";
  } else {
    res.writeHead(404);
    res.end("404 Not Found");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
