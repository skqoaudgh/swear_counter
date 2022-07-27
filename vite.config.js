import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

export default defineConfig({
    plugins: [
        react(),
        ViteFaviconsPlugin({
            logo: 'frontend/public/favicon.svg',
            favicons: {
                appName: '욕 하지마',
                appDescription: '욕 하지마',
                developerName: '배명호',
                developerURL: null,
                background: '#242424',
                theme_color: '#242424',
                path: 'assets/',
            },
        }),
    ],
    root: 'frontend',
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
});