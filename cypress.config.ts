import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      module.exports = {
        projectId: "s1qa15",
        // ...rest of the Cypress project config
      }
    },
  },
});
