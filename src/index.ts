#!/usr/bin/env node

import { readdirSync, statSync, createReadStream } from 'fs';
import handler from 'serve-handler';
import { createServer } from 'http';
import path from 'path';
import open from 'open';

console.log(
    "\x1b[32m",
    `
    .d8888b.  888               888                  
    d88P  Y88b 888               888                  
    Y88b.      888               888                  
     "Y888b.   888 888  888  .d88888  .d88b.  888d888 
        "Y88b. 888 888  888 d88" 888 d8P  Y8b 888P"   
          "888 888 888  888 888  888 88888888 888     
    Y88b  d88P 888 Y88b 888 Y88b 888 Y8b.     888     
     "Y8888P"  888  "Y88888  "Y88888  "Y8888  888     
                        888                           
                   Y8b d88P                           
                    "Y88P"                            
  `,
);

const port = 4000;

createServer((request, response) => {
  switch (request.url) {
    case '/':
      const filePath = path.join(__dirname, '/client/index.html');
      const fileInfo = statSync(filePath);

      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': fileInfo.size
      });

      createReadStream(filePath).pipe(response);
    break;
    case '/data':
      const targetDir = process.cwd();
      const files = readdirSync(targetDir);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(files));
    break;
    default:
      return handler(request, response);
  }  
})
.listen(port, () => { 
  console.log(`Presenting at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});