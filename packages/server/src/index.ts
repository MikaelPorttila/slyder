#!/usr/bin/env node

import { 
  readdirSync,
  statSync,
  createReadStream,
  existsSync,
  readFileSync,
  watch
} from 'fs';
import handler from 'serve-handler';
import { createServer } from 'http';
import path from 'path';
import open from 'open';
import { CommandArgs } from './command-args';
import arg from "arg";
import { lookup } from 'mime-types';
import { Server } from 'socket.io';

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

/* TODO: (Mikael) 
  Handle args:
  - ignore files or dir
  - skip
  - order
  - theme? (light/dark mode)
  - browser?
  - timer?
  - control panel
*/
const argValues = arg({
  // Arguments
  '--port': Number,
  [CommandArgs.Skip]: Number,
  [CommandArgs.Order]: String,
  [CommandArgs.Ignore]: String,
  // Aliases
  "-p": CommandArgs.Port,
  "-i": CommandArgs.Ignore,
  "-s": CommandArgs.Skip,
  "-o": CommandArgs.Order
});

const port = argValues[CommandArgs.Port] || 4000;
const server = createServer((request, response) => {
  if (request.url === '/') {
    let filePath = path.join(__dirname, '/index.html');
      if (!existsSync(filePath)) {
        filePath = path.join(__dirname, '/client/index.html'); 
      }

      if (existsSync(filePath)) {
        const fileInfo = statSync(filePath);
        response.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': fileInfo.size
        });

        createReadStream(filePath).pipe(response);
      }
      else {
        response.writeHead(200);
        response.end("Missing index.html");
      }
  }
  else if(request.url?.startsWith('/client/')) {
    const sectionLength = '/client/'.length;
    let fileName = request.url.substring(sectionLength);
    const filePath = path.join(__dirname, fileName);

    if (existsSync(filePath)) {
      const fileInfo = statSync(filePath);
      response.writeHead(200, {
        'Content-Type': lookup(path.basename(filePath)) || 'application/octet-stream',
        'Content-Length': fileInfo.size
      });

      createReadStream(filePath).pipe(response);
    } else {
      console.log('Missing client file', fileName, 'on path', filePath);
    }
  }
  else if(request.url === '/api/data') {
    const targetDir = process.cwd();
      const files = readdirSync(targetDir)
      .map(fileName => ({
        fileName,
        stat: statSync(path.join(targetDir, fileName)),
        path: path.join(targetDir, fileName)
      }))
      .filter(x => x.stat.isFile)
      .map(file => {
        let type = 'application/octet-stream';
        try {
          type = lookup(file.fileName) || 'application/octet-stream';
        }
        catch {
          console.error('Failed to resolve mime for file', file.fileName);
        }

        let data;
        try {
          const supportsDataLoad = [
            'text/markdown'
          ].some((supportedFileType) => supportedFileType === type);
          
          if (supportsDataLoad) {
            data = readFileSync(file.path, 'utf8');
          }
        } catch {
          console.error('Failed to load data from file', file.fileName);
        }

        return { fileName: file.fileName, type, data };
      });

      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      });
      response.end(JSON.stringify(files));
      console.log(`Served ${files?.length || 0} files`);
  }
  else {
    // Serve current working forlder
    return handler(request, response);
  }
});

const io = new Server(server, {});

watch(process.cwd(), (eventType, fileName,) => {
  // Refresh
  io.emit('data', { reload: true });
});

server.listen(port, () => { 
  console.log(`Presenting at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});