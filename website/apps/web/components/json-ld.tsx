// Renders a schema.org JSON-LD <script>. Server component — safe to use in
// layouts and pages. Accepts one object or an array of objects.

// JSON.stringify does not escape characters that are special to the HTML
// parser, and inside a <script> body the parser wins over JSON syntax: a CMS
// string containing "</script>" would close the tag and let whatever follows
// execute. U+2028/U+2029 are separately hazardous — they are JS line
// terminators. Rewriting all four as \uXXXX sequences keeps the JSON identical
// in meaning while making tag-breakout and line-terminator tricks impossible.
//
// The pattern is built via RegExp from escape text rather than a literal so no
// invisible (and, for a regex literal, parse-breaking) characters live in this
// source file.
const UNSAFE_IN_SCRIPT = new RegExp("[<>\\u2028\\u2029]", "g");

function safeJsonForScript(value: object): string {
  return JSON.stringify(value).replace(
    UNSAFE_IN_SCRIPT,
    (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonForScript(item) }}
        />
      ))}
    </>
  );
}
