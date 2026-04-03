const http = require('http');
const fs = require('fs');
const path = require('path');

const PASSWORD = 'PlutusDraft2026';

const server = http.createServer((req, res) => {
  // Basic auth check
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Plutus Financial Review"', 'Content-Type': 'text/html' });
    res.end('<h2>Authorization required</h2>');
    return;
  }
  const decoded = Buffer.from(auth.split(' ')[1], 'base64').toString();
  const [user, pass] = decoded.split(':');
  if (pass !== PASSWORD) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Plutus Financial Review"', 'Content-Type': 'text/html' });
    res.end('<h2>Invalid credentials</h2>');
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/html' });
    res.end(data);
  });
});

server.listen(8889, () => console.log('Plutus preview running on :8889'));
