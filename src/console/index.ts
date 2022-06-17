import { ExpressCli } from "@point-hub/express-cli";
import { ExampleCommand } from "./commands/example-command.js";

/**
 * Register the commands for the application.
 *
 * @example
 * command.register(ExampleCommand);
 */
export function commands(command: ExpressCli): void {
  command.register(ExampleCommand);
}
