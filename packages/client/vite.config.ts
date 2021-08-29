import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import mkcert from'vite-plugin-mkcert'

export default defineConfig({
    base: 'client/',  
    plugins: [solidPlugin(), mkcert()],
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
        outDir: '../../lib'
    },
    server: {
        https: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000/',
                changeOrigin: true
            }
        }
    }
});
