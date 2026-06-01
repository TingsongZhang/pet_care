const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file;

    if (url === "/" || url === "/index.html") {
      file = path.join(root, "index.html");
    } else if (url.startsWith("/assets/")) {
      file = path.join(root, "public", url);
    } else {
      file = path.join(root, url);
    }

    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream"
      });
      res.end(data);
    });
  })
  .listen(3000, "127.0.0.1", () => {
    console.log("Preview server listening on http://localhost:3000");
  });
