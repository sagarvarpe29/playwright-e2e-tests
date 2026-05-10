import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  appUrl: string;
  dbConfig: {};
  nopcommerceUrl: string;
  apiUrl: string;
};

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  envName: ["test", { option: true }],
  appUrl: ["<provideURL>", { option: true }],
  apiUrl: ["<provideURL>", { option: true }],
  dbConfig: [{}, { option: true }],
  nopcommerceUrl: ["<provideURL>", { option: true }],
});
