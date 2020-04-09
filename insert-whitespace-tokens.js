function insertWhitespaceTokens(source, tokens) {
  let lastPosition = 0;
  let lastLoc = { line: 1, column: 0 };
  const outputTokens = [];
  for (let token of tokens) {
    if (token.start > lastPosition) {
      const missingStart = lastPosition;
      const missingEnd = token.start;
      const whitespace = source.slice(missingStart, missingEnd);
      outputTokens.push({
        type: { label: "whitespace" },
        value: whitespace,
        loc: { start: lastLoc, end: { ...token.loc.start } },
      });
    }
    const len = token.end - token.start;
    if (!len) {
      throw new Error("Token of zero length");
    }
    outputTokens.push(token);
    lastPosition = token.end;
    lastLoc = token.loc.end;
  }

  return outputTokens;
}

module.exports = insertWhitespaceTokens;
