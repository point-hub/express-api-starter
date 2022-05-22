import { port } from "@src/config/server.js";

it("should have properties", async () => {
  expect(port).not.toBeNull();
});
