import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    base: 'client/',
    plugins: [solidPlugin()],
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
        outDir: '../../lib'
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000/',
                changeOrigin: true
            }
        }
    }
});
