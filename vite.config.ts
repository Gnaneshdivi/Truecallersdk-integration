import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access
    port: 5173,
    allowedHosts: [
      "localhost",
      "9621-2406-7400-94-f846-d88b-ca88-87c3-71f4.ngrok-free.app" // Add your Ngrok URL here
    ]
  }
});
