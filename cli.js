#!/usr/bin/env node

import { createRequire } from "module";
import { ExpressCli } from "@point-hub/express-cli";
import { commands } from "./build/console/index.js";

const require = createRequire(import.meta.url);
const { version } = require("./package.json");

// Initiate CLI
const expressCli = new ExpressCli("cli", version);
// Register commands
commands(expressCli);
// Build CLI
expressCli.build();
