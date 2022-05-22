import server from "@src/index.js";

it("stop server without error", async () => {
  expect(server).toBeDefined();
  server.stop();
});
