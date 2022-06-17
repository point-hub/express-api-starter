import { ExpressCli } from "@point-hub/express-cli";
import { commands } from "./index.js";

it("express app to be defined", async () => {
  const expressCli = new ExpressCli("cli", "1.0.0");
  commands(expressCli);
  expect(expressCli).toBeDefined();
  expect(expressCli).toBeInstanceOf(ExpressCli);
});
