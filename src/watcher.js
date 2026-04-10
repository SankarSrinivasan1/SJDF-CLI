// Watch Mode (Dev Experience Boost)
// Zero dependency. Just Node.

const fs = require("fs");

function watchFile(file, callback) {
  let timeout;

  fs.watch(file, () => {
    clearTimeout(timeout);

    // debounce (important in real usage)
    timeout = setTimeout(() => {
      console.clear();
      callback();
    }, 200);
  });
}

module.exports = { watchFile };
