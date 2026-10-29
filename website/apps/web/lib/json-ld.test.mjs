// Self-check for the JSON-LD script escaping in components/json-ld.tsx.
// Run: node lib/json-ld.test.mjs   (exits non-zero on failure)
//
// Kept as a plain assert script because no test framework is wired up in this
// repo yet. It mirrors safeJsonForScript() rather than importing the .tsx, so
// if you change the escaping there, change it here too — the point is that a
// regression is caught loudly instead of silently reopening an XSS sink.

import assert from "node:assert/strict";

const UNSAFE_IN_SCRIPT = new RegExp("[<>\\u2028\\u2029]", "g");
const safeJsonForScript = (value) =>
  JSON.stringify(value).replace(
    UNSAFE_IN_SCRIPT,
    (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
  );

// A hostile CMS value must not be able to close the <script> tag.
const attack = { name: "</script><script>alert(1)</script>" };
const out = safeJsonForScript(attack);
assert.ok(!out.includes("</script>"), "must not emit a literal </script>");
assert.ok(!out.includes("<"), "must not emit a raw <");
assert.ok(!out.includes(">"), "must not emit a raw >");

// JS line terminators must be escaped (they break out of a script body).
const lineSep = safeJsonForScript({ a: "x y z" });
assert.ok(!lineSep.includes(" "), "must escape U+2028");
assert.ok(!lineSep.includes(" "), "must escape U+2029");

// Escaping must preserve meaning: parsing the output yields the input back.
assert.deepEqual(JSON.parse(out), attack, "escaped JSON must round-trip");
assert.deepEqual(
  JSON.parse(lineSep),
  { a: "x y z" },
  "escaped JSON must round-trip"
);

// Ordinary content is untouched apart from the four characters above.
assert.equal(
  safeJsonForScript({ name: "Stand Up Pouch" }),
  '{"name":"Stand Up Pouch"}'
);

console.log("json-ld escaping: all checks passed");
