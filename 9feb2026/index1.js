const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "index.html" : req.url;
    let ext = path.extname(filePath);

    let contentType = "text/plain";
    if (ext === ".html") contentType = "text/html";
    else if (ext === ".css") contentType = "text/css";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("File not found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
