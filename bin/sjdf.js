// Make this executable (chmod +x later).

#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { parseSJDF } = require("../src/parser");
const { stringifySJDF } = require("../src/stringifier");
const { validateSJDF } = require("../src/validator");
const { formatSJDF } = require("../src/formatter");
const { watchFile } = require("../src/watcher");

// Simple color helpers (no deps)
const color = {
  red: (t) => `\x1b[31m${t}\x1b[0m`,
  green: (t) => `\x1b[32m${t}\x1b[0m`,
  yellow: (t) => `\x1b[33m${t}\x1b[0m`,
};

const args = process.argv.slice(2);
const command = args[0];
const file = args[1];

const flags = {
  pretty: args.includes("--pretty"),
  watch: args.includes("--watch"),
};

if (!command || !file) {
  console.log("Usage: sjdf <command> <file> [--pretty] [--watch]");
  process.exit(1);
}

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(color.red(`File not found: ${filePath}`));
    process.exit(1);
  }
  return fs.readFileSync(filePath, "utf-8");
}

function run() {
  try {
    const content = readFile(file);

    switch (command) {
      case "parse": {
        const result = parseSJDF(content);
        console.log(
          flags.pretty
            ? JSON.stringify(result, null, 2)
            : JSON.stringify(result)
        );
        break;
      }

      case "stringify": {
        const json = JSON.parse(content);
        const result = stringifySJDF(json);
        console.log(result);
        break;
      }

      case "validate": {
        validateSJDF(content);
        console.log(color.green("✔ Valid SJDF"));
        break;
      }

      case "format": {
        const result = formatSJDF(content);
        console.log(result);
        break;
      }

      default:
        console.error(color.red(`Unknown command: ${command}`));
        process.exit(1);
    }
  } catch (err) {
    console.error(color.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

// Watch mode
if (flags.watch) {
  console.log(color.yellow(`Watching ${file}...`));
  watchFile(file, run);
} else {
  run();
    }
