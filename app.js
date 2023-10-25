const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/home.html') {
    const filePath = path.join(__dirname, 'home.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // home.html을 읽은 후, style.css와 Calendar-Script.js도 읽어옵니다.
        const styleFilePath = path.join(__dirname, 'style.css');
        const scriptFilePath = path.join(__dirname, 'Calendar-Script.js');

        fs.readFile(styleFilePath, 'utf8', (styleErr, styleData) => {
          if (styleErr) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            fs.readFile(scriptFilePath, 'utf8', (scriptErr, scriptData) => {
              if (scriptErr) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
              } else {
                // 모든 파일을 성공적으로 읽었을 때, 응답으로 모든 파일을 함께 보냅니다.
                res.writeHead(200, { 'Content-Type': 'text/html' });
                // home.html 내부에 style.css와 Calendar-Script.js를 포함합니다.
                data = data.replace('<!-- insert-css-here -->', `<style>${styleData}</style>`);
                data = data.replace('<!-- insert-js-here -->', `<script>${scriptData}</script>`);
                res.end(data);
              }
            });
          }
        });
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
