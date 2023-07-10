import {defineConfig} from "vite";
import laravel from 'laravel-vite-plugin';
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/index.tsx'
            ],
            refresh: true
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // define the chunks for the vendor packages
                        const packages = [
                            'react',
                            'react-dom',
                            '@ant-design/charts',
                            '@reduxjs/toolkit',
                            '@types/react',
                            "@types/react-dom",
                            "@types/react-router",
                            "@types/react-router-dom",
                            "@vitejs/plugin-react",
                            "moment",
                            "react-icons",
                            "react-redux",
                            "react-router-dom"
                        ];
                        const packageName = id.match(/node_modules\/([^/]+)/)[1];
                        if (packages.includes(packageName)) {
                            return `vendor-${packageName}`;
                        }
                    }
                },
            },
        },
    },
});
