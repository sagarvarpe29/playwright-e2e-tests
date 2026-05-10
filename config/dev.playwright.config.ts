import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

console.log("----- RUNNING TESTS IN DEV ENVIRONMENT -----");

export default defineConfig<EnvConfig>({
  ...baseConfig, //loads all the base config values...
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use, //Loading the existing use object
    envName: "dev",
    appUrl: "https://google.com/",
    dbConfig: {
      server: "localhost",
      databaseName: "testdb",
      user: "testuser",
      password: "testpassword",
      connectionString:
        "Server=localhost;Database=testdb;User Id=testuser;Password=testpassword;",
    },
  },
});
