import { BaseCommand, IAttribute } from "@point-hub/express-cli";

export class ExampleCommand extends BaseCommand {
  attribute(): IAttribute {
    return {
      name: "example",
      description: "description",
      summary: "summary",
      arguments: [
        {
          name: "<name>",
          description: "Example Argument",
        },
      ],
      options: [
        {
          flags: "-g, --greet <value>",
          description: "Example Option",
          default: "Hello",
        },
      ],
    };
  }

  async handle(name: string, options: object): Promise<void> {
    console.log("arguments", name);
    console.log("options", options);
  }
}
