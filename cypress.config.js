const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w7ksp1',
  env: {
    apiUrl: "http://localhost:8081"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080/",

  },
});
