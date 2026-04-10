## SJDF Architecture (Simple but solid)

We split responsibilities cleanly:

### 1. CLI Layer (```bin/sjdf.js```)
- Parses arguments
- Routes commands (```parse, stringify```, etc.)
- Handles flags (```--pretty, --watch```)
- Outputs results (with colors)

### 2. Core Engine (```src/```)
- parser.js → Converts SJDF → JS object
- stringifier.js → Converts JS → SJDF
- validator.js → Detects structural errors early
- formatter.js → Fixes indentation + spacing
- watcher.js → File watching logic

### 3. Utilities
- Indentation handling
- Token parsing
- Type detection

## Design Philosophy
- No heavy dependencies (just Node core)
- Line-by-line parsing (predictable, debuggable)
- Indentation-driven state machine
- Fail fast on invalid structure
- Output clean, deterministic SJDF

