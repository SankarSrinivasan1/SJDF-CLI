// Stringifier (JS → SJDF)
// Key idea:
// Recursively walk object
// Use indentation (2 spaces)
// Handle arrays in 2 formats:
// Inline → [a, b]
// Block → - item

function stringifySJDF(obj, indent = 0) {
  const spaces = " ".repeat(indent);
  let output = "";

  for (const key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      output += `${spaces}${key}:\n`;

      for (const item of value) {
        if (typeof item === "object") {
          output += `${spaces}  -\n`;
          output += stringifySJDF(item, indent + 4);
        } else {
          output += `${spaces}  - ${formatValue(item)}\n`;
        }
      }
    } else if (typeof value === "object" && value !== null) {
      output += `${spaces}${key}:\n`;
      output += stringifySJDF(value, indent + 2);
    } else {
      output += `${spaces}${key}: ${formatValue(value)}\n`;
    }
  }

  return output;
}

function formatValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

module.exports = { stringifySJDF };
