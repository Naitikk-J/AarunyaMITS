import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import "./index.css";
import Lenis from "lenis";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Could not find root element to mount the app");
}

const root = createRoot(rootElement);

// Show loading screen first
root.render(<LoadingScreen />);

// After a short delay, render the actual app
setTimeout(() => {
    root.render(
        <App />
    );

    // Initialize lenis for smooth scrolling
    const lenis = new Lenis({
        autoRaf: true,
    });
}, 2000); // 2 second loading screen
