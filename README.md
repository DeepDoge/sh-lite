# sh-lite

A lightweight shell command runner for Deno.

```ts
import { sh } from "jsr:@nomadshiba/sh-lite";

const result = sh`fastfetch`;
// Log with colors and other ansi codes.
console.log(result.raw);

const prefix = `CPU: `;
const start = result.indexOf(prefix) + prefix.length;
console.log("CPU: ", result.slice(start, result.indexOf("\n", start)).trim());
```

## Docs

[jsr.io/@nomadshiba/sh-lite/doc](https://jsr.io/@nomadshiba/sh-lite/doc)
