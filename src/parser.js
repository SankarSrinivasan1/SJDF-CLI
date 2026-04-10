// Core Engine — Parser (SJDF → JS)
// This is the heart. Keep it predictable.

function parseSJDF(input) {
  const lines = input.split("\n");

  const root = {};
  const stack = [{ indent: -1, obj: root }];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (!line.trim()) continue;

    const indent = line.match(/^ */)[0].length;
    const trimmed = line.trim();

    // Adjust stack based on indentation
    while (stack.length && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    // Array item (- value)
    if (trimmed.startsWith("- ")) {
      if (!Array.isArray(parent._array)) {
        parent._array = [];
      }

      const value = parseValue(trimmed.slice(2));
      parent._array.push(value);
      continue;
    }

    const [key, ...rest] = trimmed.split(":");
    const valueRaw = rest.join(":").trim();

    if (!key) {
      throw new Error(`Invalid line ${i + 1}`);
    }

    if (valueRaw === "") {
      parent[key] = {};
      stack.push({ indent, obj: parent[key] });
    } else {
      parent[key] = parseValue(valueRaw);
    }
  }

  return cleanupArrays(root);
}

function parseValue(value) {
  if (!isNaN(value)) return Number(value);
  if (value === "true") return true;
  if (value === "false") return false;

  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((v) => v.trim());
  }

  return value.replace(/^"|"$/g, "");
}

function cleanupArrays(obj) {
  if (obj._array) return obj._array;

  for (const key in obj) {
    obj[key] = cleanupArrays(obj[key]);
  }

  return obj;
}

module.exports = { parseSJDF };
