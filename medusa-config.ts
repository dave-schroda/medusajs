// medusa-config.ts
import { defineConfig } from "@medusajs/framework";

export default defineConfig({
  projectConfig: {
    // Let envs drive prod/runtime behavior
    workerMode: (process.env.MEDUSA_WORKER_MODE as "shared" | "server" | "worker") ?? "server",
    redisUrl: process.env.REDIS_URL, // ok if undefined while testing
    http: {
      cors: {
        // allowlist your origins; empty arrays are fine during first boot
        store: (process.env.STORE_CORS ?? "").split(",").filter(Boolean),
        admin: (process.env.ADMIN_CORS ?? "").split(",").filter(Boolean),
        auth: (process.env.AUTH_CORS ?? "").split(",").filter(Boolean),
      },
    },
  },

  // Built-in Admin UI (served at <BACKEND_URL>/app when not disabled)
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL, // set to https://<your-railway-domain>
  },
});
