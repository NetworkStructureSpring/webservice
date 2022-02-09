import assert from "assert";
import * as healthService from '../app/services/Health.js';
describe("Test1",() => {
  it("Is returning 200 response", async () => {
    const response = await healthService.getServiceHealth();
      assert.equal(response , 500);
    });
  });
