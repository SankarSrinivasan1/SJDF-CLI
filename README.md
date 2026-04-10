# SJDF-CLI
A simple, human-readable alternative to JSON. Convert between SJDF and JSON, validate structure, format files, and improve readability. Built for developers who want less noise, fewer errors, and cleaner data workflows.

## SJDF — Simple Just Data Format

### JSON is for machines. SJDF is for humans.

---

### 😩 The Problem

If you've ever stared at JSON like this:

```json
{
  "user": {
    "name": "Sankar",
    "skills": ["stocks", "options"]
  }
}
```

You know the pain:

- Too many braces
- Too many commas
- Hard to scan
- Easy to break

---

### ✨ The Solution: SJDF

```sjdf
user:
  name: Sankar
  skills:
    - stocks
    - options
```

That’s it.

No commas.
No brackets everywhere.
Just structure.

---

## Install

```bash
npm install -g sjdf-cli
```
---

## Usage
### Parse SJDF → JSON

```sjdf
sjdf parse data.sjdf --pretty
```

---

### Convert JSON → SJDF

```sjdf
sjdf stringify data.json
```

---

### Validate

```sjdf
sjdf validate data.sjdf
```

Output:

```bash
✔ Valid SJDF
```

Or:

```bash
Error: Invalid indentation at line 4
```

---

### Format

```sjdf
sjdf format messy.sjdf
```

---

### Watch Mode (🔥 dev favorite)

```sjdf
sjdf parse data.sjdf --watch
```
or
```bash
sjdf parse data.sjdf --pretty --watch
```
---

**Why Developers Love SJDF**

- Reads like YAML (without YAML madness)
- Simpler than JSON
- Safer for manual editing
- Perfect for configs, scripts, AI prompts

---

**Real Use Cases**

- Config files
- AI prompt templates
- CLI tools
- Lightweight data exchange
- Human-edited datasets

---

**Philosophy**

SJDF is not trying to replace JSON.

It exists because:

**Humans deserve a format they don’t hate.**

---

### Roadmap

- [ ] Schema validation
- [ ] VSCode extension
- [ ] Web converter tool

---

### If This Helped You

Star the repo. It helps more than you think.
