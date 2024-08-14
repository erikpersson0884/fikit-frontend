import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://fikit.chalmers.it',
                changeOrigin: true,
                secure: false,  // Set to true if the target is HTTPS with a valid certificate
            },
            '/auth': {
                target: 'https://fikit.chalmers.it',
                changeOrigin: true,
                secure: false,  // Set to true if the target is HTTPS with a valid certificate
                rewrite: (path) => path.replace(/^\/auth/, '')  // Remove /api prefix when proxying

            },
        }
    },
    plugins: [react()],
    base: "/fikit-frontend/",
});
