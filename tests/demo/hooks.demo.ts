import { test, expect } from "@playwright/test";

test.beforeAll("Beforeall hook", () => {
  console.log(">> This runs before all tests");
});

test.beforeEach("Beforeeach hook", () => {
  console.log(">> This runs before each test");
});

test.describe("Demo hooks", () => {
  test.beforeEach("Beforeeach hook in describe block", () => {
    console.log(">> This runs before each test in describe block");
  });

  test("Test case 1", () => {
    console.log(">> This is test case 1");
  });

  test("Test case 2", () => {
    console.log(">> This is test case 2");
  });
});

test.afterEach("Aftereach hook", () => {
  console.log(">> This runs after each test");
});

test.afterAll("Afterall hook", () => {
  console.log(">> This runs after all tests");
});
