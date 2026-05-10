import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

console.log("----- RUNNING TESTS IN TEST ENVIRONMENT -----");

export default defineConfig<EnvConfig>({
  ...baseConfig, //loads all the base config values...
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use, //Loading the existing use object
    envName: "test",
    appUrl: "https://katalon-demo-cura.herokuapp.com/",
    nopcommerceUrl: "https://admin-demo.nopcommerce.com",
    apiUrl: "https://reqres.in/api",
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
