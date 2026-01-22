import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element to mount the app");
}

const root = createRoot(rootElement);

if (!googleClientId) {
  root.render(
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffdddd', border: '1px solid #ff0000' }}>
      <h1>Configuration Error</h1>
      <p>VITE_GOOGLE_CLIENT_ID is not defined. Please create a .env file and add your Google Client ID.</p>
    </div>
  );
} else {
  root.render(
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  );
}
