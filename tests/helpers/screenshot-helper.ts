import { Page } from "@playwright/test";
import fs from "fs";
import path from "path";
import { log } from "./logger";

const SCREENSHOTS_DIR = "screenshots";

/**
 * Ensure screenshots directory exists
 */
function ensureScreenshotsDir(): void {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
}

/**
 * Take a screenshot and save it with a timestamp
 * @param page - Playwright page object
 * @param name - Optional name for the screenshot
 * @returns Path to the saved screenshot
 */
export async function takeScreenshot(
  page: Page,
  name?: string
): Promise<string> {
  ensureScreenshotsDir();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = name ? `${name}-${timestamp}.png` : `screenshot-${timestamp}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);

  await page.screenshot({ path: filepath, fullPage: true });
  await log("info", `Screenshot saved: ${filepath}`);

  return filepath;
}

/**
 * Take a screenshot on test failure (useful in afterEach hooks)
 * @param page - Playwright page object
 * @param testName - Name of the test
 */
export async function takeScreenshotOnFailure(
  page: Page,
  testName: string
): Promise<void> {
  await takeScreenshot(page, `failure-${testName}`);
}

export default { takeScreenshot, takeScreenshotOnFailure };
