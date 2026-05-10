import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import constants from "../../data/constants.json";
import { TestData } from "../../data/test-data";
import fileHelper from "../helpers/file-helper";

test.describe("REST API Demo", () => {
  const apiUrl = process.env.REQ_RES_API_URL || 'https://reqres.in/api';

  test.beforeEach("Get the base url config", async ({ request }, testInfo) => {
    await log("info", "Starting a new test case...");
  });

  //const baseUrl = "https://reqres.in/api";

  //GET API Example
  test("Should get list of users", async ({ request }) => {
    // Make a GET call to the API endpoint
    await log("info", `Making a GET call using ${apiUrl}`);
    const response = await request.get(
      `${apiUrl}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`,
      {
        headers: {
          "x-api-key": process.env.REQ_RES_API_KEY!,
        },
      },
    );
    // assert the response status code
    expect(response.status()).toBe(200);

    await log(
      "info",
      `The GET call is successful with status code ${response.status()}`,
    );

    // get list of users from the response
    const usersData = await response.json();
    await log("info", `List of users: ${JSON.stringify(usersData)}`);

    fileHelper.writeFile(
      `${process.cwd()}/output/users-list-response.json`,
      JSON.stringify(usersData, null, 10),
    );
  });

  //POST API Example
  test("Should create users", async ({ request }) => {
    // Make a POST call to the API endpoint
    await log("info", `Making a POST call using ${apiUrl}`);

    const userData = TestData.apiUserCreation()[0];

    const response = await request.post(
      `${apiUrl}${constants.REQ_RES_ENDPOINTS.POST_USER}`,
      {
        headers: {
          "x-api-key": process.env.REQ_RES_API_KEY!,
          "Content-Type": "application/json",
        },
        data: userData,
      },
    );

    // assert the response status code
    expect(response.status()).toBe(201);

    await log(
      "info",
      `The POST call is successful with status code ${response.status()}`,
    );

    // get list of users from the response
    const resData = await response.json();
    await log(
      "info",
      `Response data from post call: ${JSON.stringify(resData)}`,
    );
  });
});