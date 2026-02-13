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
}));
