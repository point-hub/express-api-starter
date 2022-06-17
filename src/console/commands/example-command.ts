import { BaseCommand, IArgument, IOption } from "@point-hub/express-cli";

export class ExampleCommand extends BaseCommand {
  cmdName(): string {
    return "example";
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
        description: "Example Arguments",
      },
    ];
  }
  cmdOptions(): IOption[] {
    return [
      {
        flags: "-g, --greet <value>",
        description: "Example Option",
        default: "Hello",
      },
    ];
  }
  async handle(name: string, options: object): Promise<void> {
    console.log("arguments", name);
    console.log("options", options);
  }
}
