import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "s1qa15",    // ← Verplaats projectId naar hier (root of global config)

  e2e: {
    // baseUrl, spec patterns, etc kun je hier ook zetten
    setupNodeEvents(on, config) {
      // implement node event listeners hier
      return config;
    },
  },
});
