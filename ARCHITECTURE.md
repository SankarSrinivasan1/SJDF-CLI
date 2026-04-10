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

## Error Handling Strategy

Handled at 3 levels:

1. CLI Level
Missing file
Invalid command

2. Parser Level
Invalid indentation
Missing key
Malformed arrays

3. Runtime Safety
Wrapped in try/catch
Clear error messages with line numbers
---
