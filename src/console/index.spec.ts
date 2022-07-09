import { ExpressCli } from "@point-hub/express-cli";
import { ConsoleKernel } from "./index.js";

it("express app to be defined", async () => {
  const cli = new ExpressCli("cli", "1.0.0");

  const kernel = new ConsoleKernel(cli);
  await kernel.register();

  expect(cli).toBeDefined();
  expect(cli).toBeInstanceOf(ExpressCli);
});
