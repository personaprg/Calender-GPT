const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      // 루트 경로의 요청일 때, home.html 파일을 제공
      serveFile('home.html', 'text/html', res);
    } else if (req.url === '/style.css') {
      // style.css 파일을 제공
      serveFile('html-module/style.css', 'text/css', res);
    } else if (req.url === '/script.js') {
      // script.js 파일을 제공
      serveFile('html-module/script.js', 'application/javascript', res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});

function serveFile(filename, contentType, response) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일 읽기 오류:', err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data);
    }
  });
}
