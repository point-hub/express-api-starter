import { ExpressCli } from "@point-hub/express-cli";
import { ExampleCommand } from "./example-command.js";

it("custom command has attributes", async () => {
  const expressCli = new ExpressCli("cli", "1.0.0");
  const exampleCommand = new ExampleCommand(expressCli.program);
  exampleCommand.handle("Test", { greet: "Hello" });
  expect(exampleCommand.cmdName()).toStrictEqual("example");
  expect(exampleCommand.cmdDescription()).toStrictEqual("description");
  expect(exampleCommand.cmdSummary()).toStrictEqual("summary");
  expect(exampleCommand.cmdArguments()).toStrictEqual([{ name: "<name>", description: "Example Arguments" }]);
  expect(exampleCommand.cmdOptions()).toStrictEqual([
    { flags: "-g, --greet <value>", description: "Example Option", default: "Hello" },
  ]);
});
