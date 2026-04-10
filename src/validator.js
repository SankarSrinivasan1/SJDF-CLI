// Validator (Fail Fast, Clear Errors)
// Don’t overcomplicate — we reuse parsing logic
// but enforce stricter checks.

function validateSJDF(input) {
  const lines = input.split("\n");
  const indentStack = [-1];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) continue;

    const indent = line.match(/^ */)[0].length;
    const trimmed = line.trim();

    // Check indentation consistency (2 spaces rule)
    if (indent % 2 !== 0) {
      throw new Error(`Invalid indentation at line ${i + 1}`);
    }

    // Stack handling
    while (indent <= indentStack[indentStack.length - 1]) {
      indentStack.pop();
    }

    indentStack.push(indent);

    // Validate key-value or array syntax
    if (trimmed.startsWith("- ")) {
      if (trimmed.length <= 2) {
        throw new Error(`Empty array item at line ${i + 1}`);
      }
    } else {
      if (!trimmed.includes(":")) {
        throw new Error(`Missing ':' at line ${i + 1}`);
      }
    }
  }

  return true;
}

module.exports = { validateSJDF };
