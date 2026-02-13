import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 8040,
        allowedHosts: [
            "aarunya.in",
        ],
        hmr: {
            overlay: false,
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    assetsInclude: ["**/*.glb", "**/*.gltf"],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
                    'vendor-utils': ['framer-motion', 'lucide-react', 'date-fns', 'clsx', 'tailwind-merge'],
                    'vendor-supabase': ['@supabase/supabase-js'],
                },
            },
        },
    },
}));
