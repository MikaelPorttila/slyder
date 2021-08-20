import { readdirSync } from "fs";

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


const targetDir = process.cwd();
const files = readdirSync(targetDir);

files.forEach((file) => {
    console.log(file);
});