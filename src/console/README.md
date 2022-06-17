# Express CLI

Built your own Command Line Interface (CLI) for Express project.

## Usage

1. Build custom command

```ts
import { BaseCommand, IArgument, IOption } from "@point-hub/express-cli";

export class ExampleCommand extends BaseCommand {
  cmdName(): string {
    return "name";
  }
  cmdDescription(): string {
    return "description";
  }
  cmdSummary(): string {
    return "summary";
  }
  cmdArguments(): IArgument[] {
    return [
      {
        name: "<name>",
        description: "Argument Description",
      },
    ];
  }
  cmdOptions(): IOption[] {
    return [
      {
        flags: "-o, --opt <value>",
        description: "Option Description",
        default: "value",
      },
    ];
  }
  async handle(arg1: string, arg2: string, options: object): Promise<void> {
    // handle your command here
  }
}
```

2. Register your command

```ts
// Import your command class
import { ExampleCommand } from "./commands/example-command.js";

export function commands(command: ExpressCli) {
  // Register your commands
  command.register(ExampleCommand);
}
```

3. Run `npm run build` to build your commands.

4. Use your command `node cli <command-name>`