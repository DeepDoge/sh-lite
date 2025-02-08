/**
 * @module shCommand
 * @description A utility module for executing shell commands synchronously in Deno.
 */

/**
 * A string output type that includes the raw, unprocessed output.
 * @typedef {string & { raw: string }} ShOutput
 */

/**
 * Executes a shell command synchronously using Deno.
 *
 * @param {...Parameters<typeof String.raw>} params - The template literal input representing the shell command.
 * @returns {ShOutput} The cleaned command output, with ANSI escape sequences removed.
 * @throws {Error} If the command fails, an error is thrown with the stderr output.
 */
export function sh(...params) {
  const arg = String.raw(...params).trim();
  const command = new Deno.Command("/usr/bin/script", {
    args: ["-q", "/dev/null", "-c", arg],
  });
  const output = command.outputSync();

  if (!output.success) {
    throw new Error(
      `Command failed: ${arg}\n${new TextDecoder()
        .decode(output.stderr)
        .trim()}`
    );
  }

  const raw = new TextDecoder().decode(output.stdout).trim();
  const clean = raw.replace(ansiRegex, "").replaceAll("\r\n", "\n");
  return Object.assign(clean, { raw });
}

/**
 * Regular expression pattern to match ANSI escape sequences.
 * Used to remove color codes and other terminal formatting from output.
 * @constant {RegExp}
 */
const ansiRegex = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g"
);
