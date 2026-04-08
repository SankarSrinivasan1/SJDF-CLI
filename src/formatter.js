const { parseSJDF } = require("./parser");
const { stringifySJDF } = require("./stringifier");

function formatSJDF(input) {
  try {
    const parsed = parseSJDF(input);
    return stringifySJDF(parsed);
  } catch (err) {
    throw new Error(`Format failed: ${err.message}`);
  }
}

module.exports = { formatSJDF };
