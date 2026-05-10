import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  console.log("[INFO]: Running global setup...");
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("[INFO]: Detecting local runs");
    //Delete allure results
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>> Deleting allure results in ${resultsDir}`);
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log("[INFO]: Allure results deleted for local run");
    } else {
      console.log("[INFO]: No allure results found to delete");
    }
  }
  console.log("[INFO]: Global setup completed...");

  //All other one off setup tasks can be added here

  //Set the login cookie global variable
  process.env.LOGIN_COOKIES = undefined;
}
