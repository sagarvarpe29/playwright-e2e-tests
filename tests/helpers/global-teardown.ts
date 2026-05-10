import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import { error } from "console";
import { exec } from "child_process";

export default async function globalTeardown(config: FullConfig) {
  // Expected to run after all tests have finished, regardless of the test outcomes
  console.log("[INFO]: Running global teardown...");

  // Generate allure report for local runs
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("[INFO]: Local run detected, generating allure report...");

    // Generate allure report using allure commandline tool
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
      console.log("Local run detected, generating allure report...");
      exec("allure serve", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error generating allure report: ${error}`);
        } else {
          console.log("Allure report generated successfully.");
        }
      });
    }
  }
}
